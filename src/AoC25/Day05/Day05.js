const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts, mergeOverlap } = require('../../Utils/parse.js');
const { sortAscending } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/5

// DAY=05 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n\n');
  const availableIds = splitData[1].split('\n').map((id) => parseInt(id));
  return {
    freshIds: splitData[0]
      .split('\n')
      .map((range) => parseStringOfInts(range, '-')),
    availableIds: availableIds,
  };
};

// Part One

const checkIfFresh = (range, id) => {
  return id >= range[0] && id <= range[1];
};

exports.partOne = async (input) => {
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
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day05Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
