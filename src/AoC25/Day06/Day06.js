const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { transpose, transposeRagged } = require('../../Utils/grids.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/6

// DAY=6 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n');
};

// Part One

exports.formatDataPt1 = async (splitData) => {
  const splitDataCopy = JSON.parse(JSON.stringify(splitData));
  const operations = splitDataCopy.pop().trim().replace(/\s+/g, ' ').split(' ');
  const integers = splitDataCopy.map((str) => parseStringOfInts(str, ' '));
  return transpose([...integers, operations]);
};

exports.evaluateEquation = (arr, operator) => {
  return arr.reduce((a, b) => eval(`${a}${operator}${b}`));
};

exports.partOne = async (input) => {
  const problems = await exports.formatDataPt1(input);
  return sum(
    problems.map((problem) => {
      const operator = problem.pop();
      return exports.evaluateEquation(problem, operator);
    })
  );
};

// Part Two

exports.formatDataPt2 = async (splitData) => {
  const splitDataCopy = JSON.parse(JSON.stringify(splitData));
  const operations = splitDataCopy.pop().trim().replace(/\s+/g, ' ').split(' ');
  const transposed = transpose(splitDataCopy.map((str) => str.split(''))).map(
    (arr) => arr.join('')
  );

  let result = [];
  let temp = [];

  transposed.forEach((item) => {
    if (item.trim() === '') {
      result.push([...temp.reverse(), operations.shift()]);
      temp = [];
    } else {
      temp.push(parseInt(item.trim()));
    }
  });
  if (temp.length) result.push([...temp.reverse(), operations.shift()]);

  return result.reverse();
};

exports.partTwo = async (input) => {
  const problems = await exports.formatDataPt2(input);
  return sum(
    problems.map((problem) => {
      const operator = problem.pop();
      return exports.evaluateEquation(problem, operator);
    })
  );
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
