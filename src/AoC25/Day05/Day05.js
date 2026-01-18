import { getData } from '../../Utils/globalFunctions.js';
import { createSolver } from '../../Utils/createSolver.js';
import { parseStringOfInts, mergeOverlap } from '../../Utils/parse.js';
import { sortAscending, sum } from '../../Utils/maths.js';

// https://adventofcode.com/2025/day/5

// DAY=05 npm run 2025
async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n\n');
  const availableIds = splitData[1].split('\n').map((id) => parseInt(id));
  return {
    freshIds: splitData[0]
      .split('\n')
      .map((range) => parseStringOfInts(range, '-')),
    availableIds: availableIds,
  };
}

// Part One

const checkIfFresh = (range, id) => {
  return id >= range[0] && id <= range[1];
};

async function partOne(input) {
  const { freshIds, availableIds } = input;
  const mergedRanges = mergeOverlap(freshIds);
  const sortedIds = sortAscending(availableIds);

  const freshAvailableIds = new Set();

  mergedRanges.forEach((range) => {
    sortedIds
      .filter((id) => checkIfFresh(range, id))
      .forEach((id) => {
        freshAvailableIds.add(id);
      });
  });

  return freshAvailableIds.size;
}

// Part Two
const getNumIdsInRange = (range) => {
  return range[1] - range[0] + 1;
};

async function partTwo(input) {
  const { freshIds, availableIds } = input;
  const mergedRanges = mergeOverlap(freshIds);

  return sum(mergedRanges.map((range) => getNumIdsInRange(range)));
}

const solve = createSolver(formatData, partOne, partTwo, '05', import.meta.url);

export { formatData, partOne, partTwo, solve };

