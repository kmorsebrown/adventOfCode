const { getData } = require('../../Utils/globalFunctions.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2023/day/15
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split(',');
};

// Part One

exports.runHASH = (string) => {
  let currentValue = 0;
  for (let i = 0; i < string.length; i++) {
    currentValue += string.charCodeAt(i);
    currentValue = currentValue * 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
};

exports.partOne = async (input) => {
  let results = [];
  input.forEach((step) => results.push(exports.runHASH(step)));
  return sum(results);
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day15Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      // await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
