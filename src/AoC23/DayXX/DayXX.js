const path = require('path');
const { getData } = require('../../globalFunctions.js');

// https://adventofcode.com/2023/day/X
export async function formatData(filepath) {
  const data = await getData(filepath);
  return data;
}

// Part One

export async function partOne(input) {
  return input;
}

// Part Two
export async function partTwo(input) {
  return input;
}

export async function solve() {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/DayXXInput.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();

module.exports = {
  formatData,
  partOne,
  partTwo,
  solve,
};
