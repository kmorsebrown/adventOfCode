const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

console.log(
  path.join(path.dirname(path.dirname(__dirname)), 'globalFunctions.js')
);

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

async function runDay01(input) {
  try {
    const filepath = input;
    const formattedData = await formatData(filepath);
    const calloriesSumArray = await sumCalories(formattedData);
    const highestTotalCalories = await getHighestTotal(calloriesSumArray);
    await fs.promises.writeFile(
      path.join(__dirname, 'Day01Result.txt'),
      JSON.stringify(highestTotalCalories)
    );
    return highestTotalCalories;
  } catch (err) {
    console.log(err);
  }
}

runDay01(path.join(__dirname, 'Day01Input.txt'));

module.exports = {
  getHighestTotal,
  formatData,
  sumCalories,
};
