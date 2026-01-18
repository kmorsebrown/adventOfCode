import { getData } from '../../Utils/globalFunctions.js';
import { createSolver } from '../../Utils/createSolver.js';

// https://adventofcode.com/2015/day/01

// DAY=1 npm run 2015
const formatData = async (filepath) => {
  const data = await getData(filepath);
  return data;
};

// Part One

const partOne = async (input) => {
  let floor = 0;
  for (const char of input) {
    if (char === '(') {
      floor += 1;
    }
    if (char === ')') {
      floor -= 1;
    }
  }
  return floor;
};

// Part Two
const partTwo = async (input) => {
  let floor = 0;
  let position = 0;
  for (const char of input) {
    position += 1;

    if (char === '(') {
      floor += 1;
    }
    if (char === ')') {
      floor -= 1;
    }

    if (floor === -1) {
      break;
    }
  }
  return position;
};

const solve = createSolver(formatData, partOne, partTwo, '01', import.meta.url);

export { solve, formatData, partOne, partTwo };
