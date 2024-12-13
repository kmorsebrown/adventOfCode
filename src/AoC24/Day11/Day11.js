const { getData, Queue } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2024/day/11

// DAY=11 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split(' ');
};

// Part One

/**
 *
 * @param {string[]} input
 */
exports.transformStones = (input) => {};

exports.partOne = async (input) => {
  return input;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day11Input.txt'
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
