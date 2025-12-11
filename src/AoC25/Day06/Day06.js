const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { transpose } = require('../../Utils/grids.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/6

// DAY=6 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n');
  const operations = splitData.pop().trim().replace(/\s+/g, ' ').split(' ');
  const integers = splitData.map((str) => parseStringOfInts(str, ' '));
  return transpose([...integers, operations]);
};

// Part One

exports.evaluateEquation = (arr, operator) => {
  return arr.reduce((a, b) => eval(`${a}${operator}${b}`));
};

exports.partOne = async (input) => {
  return sum(
    input.map((problem) => {
      const operator = problem.pop();
      return exports.evaluateEquation(problem, operator);
    })
  );
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day06Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 06');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
