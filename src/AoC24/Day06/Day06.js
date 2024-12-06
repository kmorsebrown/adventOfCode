const { getData } = require('../../Utils/globalFunctions.js');
const {
  getCoordinatesForAllMatches,
  getValueFromCoords,
  getAdjacentCoords,
} = require('../../Utils/grids.js');

// https://adventofcode.com/2024/day/06

// DAY=6 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n').filter(String);
};

// indicates the direction the guard is currently facing from the perspective of the map

const CLOCKWISE_NEXT_DIR = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};
const OBSTRUCTION = '#';

// Part One

exports.move = (map, position, dir) => {
  const args = {
    height: map.length,
    width: map[0].length,
    ...position,
  };

  let nextCoords = getAdjacentCoords({ ...args, dir });

  if (typeof nextCoords === 'undefined') {
    return {
      dir: 'off map',
      position: {},
    };
  }

  if (getValueFromCoords(map, nextCoords) === OBSTRUCTION) {
    return {
      dir: CLOCKWISE_NEXT_DIR[dir],
      position: position,
    };
  } else {
    return {
      dir: dir,
      position: nextCoords,
    };
  }
};

exports.partOne = async (input) => {
  const startingPosition = getCoordinatesForAllMatches(input, '^')[0];
  const startingDir = 'N';

  let currentPosition = startingPosition;
  let currentDir = startingDir;

  const distinctPositions = new Set();

  while (currentDir !== 'off map') {
    distinctPositions.add(JSON.stringify(currentPosition));

    let nextMove = exports.move(input, currentPosition, currentDir);

    currentPosition = nextMove.position;
    currentDir = nextMove.dir;
  }

  return distinctPositions.size;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day06Input.txt'
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
