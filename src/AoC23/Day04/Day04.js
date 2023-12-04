const path = require('path');
const { getData } = require('../../globalFunctions.js');

// https://adventofcode.com/2023/day/4

async function formatData(filepath) {
  let data = await getData(filepath);
  return data
    .split('\n')
    .map((card) => card.replaceAll('  ', ' ').split(/[:|]/))
    .map((card) => {
      card.shift();
      return card.map((stringOfNumbers) => stringOfNumbers.trim().split(' '));
    });
}

// Part One

function getPoints(number, length) {
  if (length === 0) {
    return 0;
  } else if (length === 1) {
    return number;
  } else {
    const newNumber = number * 2;
    const newLength = length - 1;
    if (newLength > 0) {
      return getPoints(newNumber, newLength);
    } else {
      return newNumber;
    }
  }
}

function getMatchingNumbers(card) {
  let matchingNums = [];
  card[0].forEach((num) => {
    if (card[1].includes(num)) {
      matchingNums.push(Number(num));
    }
  });
  return matchingNums;
}

async function partOne(input) {
  const matchingNumbers = input.map((card) => getMatchingNumbers(card));
  const points = matchingNumbers.map((card) => getPoints(1, card.length));
  return points.reduce((a, b) => a + b);
}

// Part Two
async function partTwo(input) {
  return input;
}

async function solve() {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day04Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      //await partTwo(formattedData),
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
  getPoints,
  getMatchingNumbers,
  partOne,
  partTwo,
  solve,
};
