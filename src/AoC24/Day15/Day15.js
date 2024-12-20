const { getData } = require('../../Utils/globalFunctions.js');
const { Readable } = require('stream');
const {
  getCoordinatesForAllMatches,
  getAdjacentCoords,
  getValueFromCoords,
  replaceCharInString,
} = require('../../Utils/grids.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/15

// DAY=15 npm run 2024

const ROBOT = '@';
const WALL = '#';
const BOX = 'O';
const FREE = '.';

const DIRS = {
  '^': 'N',
  v: 'S',
  '>': 'E',
  '<': 'W',
};

exports.getMap = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n\n')[0];
  return splitData.split('\n');
};

exports.getMoves = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n\n')[1];
  return splitData;
};

// Part One
function createCharacterStream(string) {
  let index = 0;

  return new Readable({
    read() {
      if (index < string.length) {
        this.push(string[index++]);
      } else {
        this.push(null); // Signal end of stream
      }
    },
  });
}

exports.processMoves = (directions, map) => {
  const stringStream = createCharacterStream(directions);
  let newMap = [...map];

  return new Promise((resolve, reject) => {
    stringStream.on('data', (chunk) => {
      const char = chunk.toString();
      if (char !== '\n') {
        exports.moveRobot(char, newMap);
      }
    });

    stringStream.on('end', () => {
      resolve(newMap); // Resolve the final string
    });

    stringStream.on('error', (err) => {
      reject(err); // Reject the promise on error
    });
  });
};

exports.moveRobot = (move, map) => {
  const robot = getCoordinatesForAllMatches(map, ROBOT)[0];

  const robotMove = getAdjacentCoords({
    height: map.length,
    width: map[0].length,
    row: robot.row,
    col: robot.col,
    dir: DIRS[move],
  });

  let nextSpace = getValueFromCoords(map, robotMove);

  // check if box can be pushed
  let boxMove = robotMove;
  let newBoxCoords = [];

  // iterate through moves until boxes can be pushed into a free space, or a wall is hit
  if (nextSpace === BOX) {
    while (nextSpace === BOX) {
      boxMove = getAdjacentCoords({
        height: map.length,
        width: map[0].length,
        row: boxMove.row,
        col: boxMove.col,
        dir: DIRS[move],
      });

      nextSpace = getValueFromCoords(map, boxMove);
      newBoxCoords.push(boxMove);
    }
  }

  // do nothing if the moves would end up  hitting a wall
  if (nextSpace === WALL) {
    return;
  }

  // move robot into free space
  if (nextSpace === FREE) {
    map[robot.row] = replaceCharInString(map[robot.row], robot.col, FREE);
    map[robotMove.row] = replaceCharInString(
      map[robotMove.row],
      robotMove.col,
      ROBOT
    );

    if (newBoxCoords.length > 0) {
      for (let i = 0; i < newBoxCoords.length; i++) {
        map[newBoxCoords[i].row] = replaceCharInString(
          map[newBoxCoords[i].row],
          newBoxCoords[i].col,
          BOX
        );
      }
    }

    return map;
  }
};

exports.getGPSCoords = (map) => {
  const boxes = getCoordinatesForAllMatches(map, BOX);
  const gpsCoords = [];
  boxes.forEach((box) => {
    gpsCoords.push(100 * box.row + box.col);
  });
  return gpsCoords;
};

exports.partOne = async (map, moves) => {
  const updatedMap = await exports.processMoves(moves, map);
  const gpsCoords = exports.getGPSCoords(updatedMap);
  return sum(gpsCoords);
};

// Part Two
exports.partTwo = async (map, moves) => {
  return;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day15Input.txt'
  );

  try {
    const map = await exports.getMap(dataPath);
    const moves = await exports.getMoves(dataPath);
    const results = await Promise.all([
      await exports.partOne(map, moves),
      // await exports.partTwo(map, moves),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
