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
  return 'x';
};

const solve = createSolver(formatData, partOne, partTwo, '01', import.meta.url);

export { solve, formatData, partOne, partTwo };
