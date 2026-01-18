import { getData } from '../../Utils/globalFunctions.js';
import {
  getCoordinatesForAllMatches,
  getValueFromCoords,
  getAdjacentCoords,
} from '../../Utils/grids.js';

// https://adventofcode.com/2024/day/06

// DAY=6 npm run 2024
export async function formatData(filepath) {
  const data = await getData(filepath);
  return data.split('\n').filter(String);
}

// indicates the direction the guard is currently facing from the perspective of the map

const CLOCKWISE_NEXT_DIR = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};
const OBSTRUCTION = '#';

// Part One

export function move(map, position, dir) {
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
}

export async function partOne(input) {
  const startingPosition = getCoordinatesForAllMatches(input, '^')[0];
  const startingDir = 'N';

  let currentPosition = startingPosition;
  let currentDir = startingDir;

  const distinctPositions = new Set();

  while (currentDir !== 'off map') {
    distinctPositions.add(JSON.stringify(currentPosition));

    let nextMove = move(input, currentPosition, currentDir);

    currentPosition = nextMove.position;
    currentDir = nextMove.dir;
  }

  return distinctPositions.size;
}

// Part Two
export async function partTwo(input) {
  return input;
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day06Input.txt', import.meta.url).pathname;

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
}

solve();
