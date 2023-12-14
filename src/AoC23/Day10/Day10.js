const { getData } = require('../../Utils/globalFunctions.js');
const { isFirst, isLast } = require('../../Utils/grids.js');
const _ = require('lodash');

// https://adventofcode.com/2023/day/10
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n');
};

const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const EAST = 'EAST';
const WEST = 'WEST';
const GROUND = '.';
const START = 'S';

const PIPES = {
  '|': [NORTH, SOUTH], // a vertical pipe connecting north and south
  '-': [EAST, WEST], // a horizontal pipe connecting east and west
  L: [NORTH, EAST], // a 90-degree bend connecting north and east
  J: [NORTH, WEST], // a 90-degree bend connecting north and west
  7: [SOUTH, WEST], // a 90-degree bend connecting south and west
  F: [SOUTH, EAST], // a 90-degree bend connecting south and east
  [GROUND]: GROUND, // ground; there is no pipe in this tile
  [START]: START, // the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has
};

const CONNECTIONS = {
  [NORTH]: ['|', 'L', 'J'], // pipes that connect to north
  [SOUTH]: ['|', '7', 'F'], // pipes that connect to south
  [EAST]: ['-', 'L', 'F'], // pipes that connect to east
  [WEST]: ['-', 'J', '7'], // pipes that connect to west
};

const RECIPROCAL_CONNECTIONS = {
  [NORTH]: SOUTH, // to connect north, northern pipe must connects south
  [SOUTH]: NORTH, // to connect south, southern pipe must connect north
  [EAST]: WEST, // to connect east, eastern pipe must connect west
  [WEST]: EAST, // to connect west, western pipe must connect east
};

// Part One

/* 
  The pipe that contains the animal is one large, continous loop
  Example square loop of pipe
  
  .....
  .F-7.
  .|.|.
  .L-J.
  .....

  Every pipe in the main loop connects to its two neighbors
  including S, which will have exactly two pipes connecting to it, 
  and which is assumed to connect back to those two pipes
*/

exports.getStartCoordinates = (input) => {
  let x = 0;
  let y = 0;
  const animalStartPos = START;

  for (let ix = 0; ix < input.length; ix++) {
    if (input[ix].includes(animalStartPos)) {
      y = ix;
      x = input[ix].indexOf(animalStartPos);
    }
  }

  return { xIdx: x, yIdx: y };
};

exports.getPipeFromDir = (data, coordinates, directionFromCurrent) => {
  const { xIdx, yIdx } = coordinates;
  const isFirstRow = isFirst(yIdx);
  const isLastRow = isLast(yIdx, data);
  const isFirstCol = isFirst(xIdx);
  const isLastCol = isLast(xIdx, data[yIdx]);

  let new_xIdx;
  let new_yIdx;

  switch (directionFromCurrent) {
    case NORTH:
      if (!isFirstRow) {
        new_xIdx = xIdx;
        new_yIdx = yIdx - 1;
      }
      break;
    case SOUTH:
      if (!isLastRow) {
        new_xIdx = xIdx;
        new_yIdx = yIdx + 1;
      }
      break;
    case EAST:
      if (!isLastCol) {
        new_xIdx = xIdx + 1;
        new_yIdx = yIdx;
      }
      break;
    case WEST:
      if (!isFirstCol) {
        new_xIdx = xIdx - 1;
        new_yIdx = yIdx;
      }
      break;
    default:
      break;
  }

  if (typeof new_xIdx === 'undefined' || typeof new_yIdx === 'undefined') {
    return;
  }

  return {
    type: data[new_yIdx][new_xIdx],
    coords: {
      xIdx: new_xIdx,
      yIdx: new_yIdx,
    },
  };
};

exports.checkConnection = (pipe, directionFromCurrent) => {
  const reciprocalConnection = RECIPROCAL_CONNECTIONS[directionFromCurrent];
  const possibleConnections = CONNECTIONS[reciprocalConnection];

  return possibleConnections.includes(pipe);
};

exports.getStartingPipe = (data) => {
  const coordinates = exports.getStartCoordinates(data);

  const pipeToNorth = exports.getPipeFromDir(data, coordinates, NORTH);
  const pipeToSouth = exports.getPipeFromDir(data, coordinates, SOUTH);
  const pipeToEast = exports.getPipeFromDir(data, coordinates, EAST);
  const pipeToWest = exports.getPipeFromDir(data, coordinates, WEST);

  let validConnections = [];

  if (pipeToNorth && exports.checkConnection(pipeToNorth.type, NORTH)) {
    validConnections.push(NORTH);
  }
  if (pipeToSouth && exports.checkConnection(pipeToSouth.type, SOUTH)) {
    validConnections.push(SOUTH);
  }
  if (pipeToEast && exports.checkConnection(pipeToEast.type, EAST)) {
    validConnections.push(EAST);
  }
  if (pipeToWest && exports.checkConnection(pipeToWest.type, WEST)) {
    validConnections.push(WEST);
  }

  // should only ever have 2 possible connections in data set
  const potentialPipesA = CONNECTIONS[validConnections[0]];
  const potentialPipesB = CONNECTIONS[validConnections[1]];

  const startPipe = _.intersection(potentialPipesA, potentialPipesB).toString();

  return {
    type: startPipe,
    coords: coordinates,
  };
};
exports.getNextStep = (data, currentStep) => {
  const { direction, pipe } = currentStep;

  const nextPipe = exports.getPipeFromDir(data, pipe.coords, direction);
  const nextDirection = PIPES[nextPipe.type]
    .filter((d) => d !== RECIPROCAL_CONNECTIONS[direction])
    .toString();

  return {
    direction: nextDirection,
    pipe: nextPipe,
  };
};
exports.partOne = async (input) => {
  let steps = 0;
  let startingPipe = exports.getStartingPipe(input);
  let startingDirections = PIPES[startingPipe.type];
  let currentStep = {
    branchA: {
      direction: startingDirections[0], // SOUTH
      pipe: startingPipe, // { type: 'F', coords: { xIdx: 1, yIdx: 1 } }
    },
    branchB: {
      direction: startingDirections[1], // EAST
      pipe: startingPipe, // { type: 'F', coords: { xIdx: 1, yIdx: 1 } }
    },
  };
  let prevStep = {
    branchA: {},
    branchB: {},
  };

  // count steps until both branches are on the same coordiantes again
  do {
    let nextStep = {
      branchA: exports.getNextStep(input, currentStep.branchA),
      branchB: exports.getNextStep(input, currentStep.branchB),
    };
    prevStep.branchA = currentStep.branchA;
    prevStep.branchB = currentStep.branchB;
    currentStep = nextStep;
    steps++;
  } while (
    !_.isEqual(currentStep.branchA.pipe, currentStep.branchB.pipe) &&
    !_.isEqual(startingPipe, currentStep.branchA.pipe)
  );

  // count steps until coordinates for both branches are equal
  return steps;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day10Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      // await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();

// const mockDataA = ['-L|F7', '7S-7|', 'L|7||', '-L-J|', 'L|-JF'];
// this.partOne(mockDataA);
