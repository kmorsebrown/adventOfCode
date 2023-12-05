const fs = require('fs');
const path = require('path');
const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2022/day/1

async function formatData(filepath) {
  const data = await getData(filepath);
  const arrayOfStrings = data.split('\n\n').filter(String);
  let formattedData = [];

  arrayOfStrings.forEach((element) => {
    const stringArray = element.split('\n');
    const numberArray = stringArray.map(Number);
    formattedData.push(numberArray);
  });

  return formattedData;
}
async function sumCalories(input) {
  let sumArray = [];
  input.forEach((element) => {
    sumArray.push(element.reduce((a, b) => a + b, 0));
  });

  return sumArray;
}

// Part One
async function getHighestTotal(input) {
  return Math.max(...input);
}

// Part Two
async function getSumTopThree(input) {
  const topThree = input.sort((a, b) => b - a).slice(0, 3);
  return topThree.reduce((a, b) => a + b, 0);
}

async function runDay01() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day01Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const calloriesSumArray = await sumCalories(formattedData);
    const results = await Promise.all([
      await getHighestTotal(calloriesSumArray),
      await getSumTopThree(calloriesSumArray),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getHighestTotal,
  formatData,
  sumCalories,
  getSumTopThree,
  runDay01,
};
