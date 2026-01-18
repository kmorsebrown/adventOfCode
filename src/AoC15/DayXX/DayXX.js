import { getData } from '../../Utils/globalFunctions.js';
import { createSolver } from '../../Utils/createSolver.js';

// https://adventofcode.com/2015/day/XX

// DAY=X npm run 2015
const formatData = async (filepath) => {
  const data = await getData(filepath);
  return data;
};

// Part One

const partOne = async (input) => {
  return input;
};

// Part Two
const partTwo = async (input) => {
  return input;
};

const solve = createSolver(formatData, partOne, partTwo, '11', import.meta.url);

export { solve, formatData, partOne, partTwo };
