const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2025/day/8

// DAY=8 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data;
};

// Part One

exports.partOne = async (input) => {
  return input;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day08Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 08');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
