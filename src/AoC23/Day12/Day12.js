const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2023/day/12
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n');
};

// Part One

exports.getNumPossibleArrangementsForRow = (row) => {};

exports.partOne = async (input) => {
  return input;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day12Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      // await exports.partOne(formattedData),
      // await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
