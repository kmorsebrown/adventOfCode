const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2025/day/12

// DAY=12 npm run 2025
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

const solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day12Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 12');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

solve();

module.exports = {
  solve,
  formatData,
  partOne,
  partTwo,
};
