import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts, mergeOverlap } from '../../Utils/parse.js';
import { sortAscending, sum } from '../../Utils/maths.js';

// https://adventofcode.com/2025/day/5

// DAY=05 npm run 2025
export async function formatData(filepath) {
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

export async function partOne(input) {
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

export async function partTwo(input) {
  const { freshIds, availableIds } = input;
  const mergedRanges = mergeOverlap(freshIds);

  return sum(mergedRanges.map((range) => getNumIdsInRange(range)));
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day05Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 05');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

// Only run solve() when this file is executed directly
if (import.meta.url.endsWith(process.argv[1])) {
  solve();
}
