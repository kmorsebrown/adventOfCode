const fs = require('fs');
const path = require('path');
const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2021/day/7

async function formatData(filepath) {
  const data = await getData(filepath);
  return data;
}

// Part One

async function partOne(input) {
  return input;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay07() {
  const dataPath = require.resolve(
    '../../../src/AoC21/puzzleInputs/Day07Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  partOne,
  partTwo,
  runDay07,
};
