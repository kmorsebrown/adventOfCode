import { getData } from '../../Utils/globalFunctions.js';
import { sum } from '../../Utils/maths.js';
import { splitLines, parseStringOfInts } from '../../Utils/parse.js';
import { createSolver } from '../../Utils/createSolver.js';

// https://adventofcode.com/2015/day/02

// DAY=2 npm run 2015
const formatData = async (filepath) => {
  const data = await getData(filepath);
  const splitData = splitLines(data).map((str) => parseStringOfInts(str, 'x'));
  return splitData;
};

// Part One

/**
 *
 * @param {number[]} dimensions
 */
const getSurfaceArea = (dimensions) => {
  const l = dimensions[0];
  const w = dimensions[1];
  const h = dimensions[2];

  const sides = [l * w, w * h, h * l];
  const slack = Math.min(...sides);

  return 2 * sum(sides) + slack;
};

const partOne = async (input) => {
  let total = 0;
  for (const gift of input) {
    total += getSurfaceArea(gift);
  }
  return total;
};

// Part Two
const partTwo = async (input) => {
  return 'x';
};

const solve = createSolver(formatData, partOne, partTwo, '02', import.meta.url);

export { solve, formatData, getSurfaceArea, partOne, partTwo };
