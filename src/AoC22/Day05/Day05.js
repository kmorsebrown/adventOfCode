const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function formatCratesData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n\n').filter(String);

  const tempArr = splitData[0].split('\n');
  const stacksArr = tempArr.pop().trim().split(/\s+/);

  const cratesArr = tempArr.map((element) => {
    const tempArr = [];
    for (let i = 0; i <= element.length - 3; i += 4) {
      tempArr.push(element.slice(i, i + 3));
    }
    return tempArr;
  });

  const cratesMap = new Map();

  for (let stack = 1; stack <= stacksArr.length; stack++) {
    const tempArr = [];
    cratesArr.forEach((row) => {
      if (row[stack - 1] !== '   ') {
        tempArr.push(row[stack - 1][1]);
      }
    });

    cratesMap.set(stack, tempArr);
  }
  return cratesMap;
}

async function formatMovesData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n\n').filter(String);

  const newArr = splitData[1].split('\n').map((element) => {
    return element.split(/\s+/);
  });
  const objArr = newArr.map((element) => {
    return {
      [element[0]]: Number(element[1]),
      [element[2]]: Number(element[3]),
      [element[4]]: Number(element[5]),
    };
  });
  return objArr;
}

// Part One
async function moveCrates(crates, moves) {
  moves.forEach((element) => {
    const fromStack = crates.get(element.from);
    const toStack = crates.get(element.to);
    const numCrates = element.move;

    for (let i = 1; i <= numCrates; i++) {
      toStack.unshift(fromStack.shift());
      crates.set(element.from, fromStack);
      crates.set(element.to, toStack);
    }
  });

  return crates;
}

async function partOne(input) {
  const topBoxes = [];
  input.forEach((value) => topBoxes.push(value[0]));
  return topBoxes.join('');
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay05() {
  const dataPath = path.join(__dirname, 'Day05Input.txt');

  try {
    const cratesArr = await formatCratesData(dataPath);
    const movesArr = await formatMovesData(dataPath);
    const cratesArrAfterMove = await moveCrates(cratesArr, movesArr);
    const results = await Promise.all([
      await partOne(cratesArrAfterMove),
      //await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatCratesData,
  formatMovesData,
  moveCrates,
  partOne,
  partTwo,
  runDay05,
};
