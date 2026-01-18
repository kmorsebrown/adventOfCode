import { getData } from '../../Utils/globalFunctions.js';
import { isFirst, isLast } from '../../Utils/grids.js';
import _ from 'lodash';

// https://adventofcode.com/2023/day/10
export async function formatData(filepath) {
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

export function getStartCoordinates(input) {
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

export function getPipeFromDir(data, coordinates, directionFromCurrent) {
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

export function checkConnection(pipe, directionFromCurrent) {
  const reciprocalConnection = RECIPROCAL_CONNECTIONS[directionFromCurrent];
  const possibleConnections = CONNECTIONS[reciprocalConnection];

  return possibleConnections.includes(pipe);
};

export function getStartingPipe(data) {
  const coordinates = getStartCoordinates(data);

  const pipeToNorth = getPipeFromDir(data, coordinates, NORTH);
  const pipeToSouth = getPipeFromDir(data, coordinates, SOUTH);
  const pipeToEast = getPipeFromDir(data, coordinates, EAST);
  const pipeToWest = getPipeFromDir(data, coordinates, WEST);

  let validConnections = [];

  if (pipeToNorth && checkConnection(pipeToNorth.type, NORTH)) {
    validConnections.push(NORTH);
  }
  if (pipeToSouth && checkConnection(pipeToSouth.type, SOUTH)) {
    validConnections.push(SOUTH);
  }
  if (pipeToEast && checkConnection(pipeToEast.type, EAST)) {
    validConnections.push(EAST);
  }
  if (pipeToWest && checkConnection(pipeToWest.type, WEST)) {
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
export function getNextStep(data, currentStep) {
  const { direction, pipe } = currentStep;

  const nextPipe = getPipeFromDir(data, pipe.coords, direction);
  const nextDirection = PIPES[nextPipe.type]
    .filter((d) => d !== RECIPROCAL_CONNECTIONS[direction])
    .toString();

  return {
    direction: nextDirection,
    pipe: nextPipe,
  };
};
export async function partOne(input) {
  let steps = 0;
  let startingPipe = getStartingPipe(input);
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
      branchA: getNextStep(input, currentStep.branchA),
      branchB: getNextStep(input, currentStep.branchB),
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
export async function partTwo(input) {
  return input;
};

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day10Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      // await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

solve();

// const mockDataA = ['-L|F7', '7S-7|', 'L|7||', '-L-J|', 'L|-JF'];
// this.partOne(mockDataA);
