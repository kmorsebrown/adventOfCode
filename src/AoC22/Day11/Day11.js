const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data
    .split('\n')
    .filter(String)
    .map((element) => element.trim());
  const monkeyMap = new Map();
  const monkeyArr = splitData
    .filter((element) => element.startsWith('Monkey'))
    .map(
      (element) =>
        'monkey' +
        element.slice(element.indexOf(' '), element.indexOf(':')).trim()
    );
  const startingItemsArr = splitData
    .filter((element) => element.startsWith('Starting'))
    .map((element) =>
      element.slice(element.indexOf(':') + 1, element.length).trim()
    );

  const operationArr = splitData
    .filter((element) => element.startsWith('Operation'))
    .map((element) =>
      element.slice(element.indexOf('d') + 1, element.length).trim()
    );

  const testArr = splitData
    .filter((element) => element.startsWith('Test'))
    .map((element) =>
      element.slice(element.indexOf('by') + 2, element.length).trim()
    );

  const trueArr = splitData
    .filter((element) => element.startsWith('If true'))
    .map((element) =>
      element.slice(element.indexOf('ey') + 2, element.length).trim()
    );

  const falseArr = splitData
    .filter((element) => element.startsWith('If false'))
    .map((element) =>
      element.slice(element.indexOf('ey') + 2, element.length).trim()
    );

  monkeyArr.forEach((monkey, index) => {
    let monkeyObj = {
      startingItems: startingItemsArr[index]
        .split(', ')
        .map((num) => Number(num)),
      operation: operationArr[index].split(' '),
      test: Number(testArr[index]),
      true: 'monkey' + trueArr[index],
      false: 'monkey' + falseArr[index],
    };
    monkeyMap.set(monkey, monkeyObj);
  });
  return monkeyMap;
}

// Part One

async function partOne(input) {
  return input;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay11() {
  const dataPath = path.join(__dirname, 'Day11Input.txt');

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
  runDay11,
};
