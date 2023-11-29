import * as path from 'path';

const { getData } = require('../../globalFunctions.js');

async function formatData(filepath: string) {
  const data = await getData(filepath);
  return data;
}

// Part One

async function partOne(input: string) {
  return input;
}

// Part Two
async function partTwo(input: string) {
  return input;
}

async function runDayXX() {
  const dataPath = path.join(__dirname, 'DayXXInput.txt');

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
  runDayXX,
};
