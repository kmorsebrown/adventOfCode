const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

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

async function runDay12() {
  const dataPath = path.join(__dirname, 'Day12Input.txt');

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
  runDay12,
};
