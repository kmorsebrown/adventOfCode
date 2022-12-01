const fs = require('fs');
const path = require('path');
const { getData, PART1_KEY, PART2_KEY } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

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
async function getHighestTotal(input) {
  return Math.max(...input);
}

async function runDay01part1(input) {
  try {
    const filepath = input;
    const formattedData = await formatData(filepath);
    const calloriesSumArray = await sumCalories(formattedData);
    const highestTotalCalories = await getHighestTotal(calloriesSumArray);
    return highestTotalCalories;
  } catch (err) {
    console.log(err);
  }
}

async function runDay01() {
  const part1dataPath = path.join(__dirname, 'Day01Input.txt');

  try {
    const results = await Promise.all([
      await runDay01part1(part1dataPath),
      'tbd',
    ]);
    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getHighestTotal,
  formatData,
  sumCalories,
  runDay01part1,
  runDay01,
};
