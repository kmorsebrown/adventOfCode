const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

// https://adventofcode.com/2022/day/05

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

async function moveCrates(crates, moves, cratemover) {
  //create deep copy of crates map so the two parts don't override each other

  const cratesAfter = new Map(JSON.parse(JSON.stringify(Array.from(crates))));

  // Part One
  if (cratemover === 9000) {
    moves.forEach((element) => {
      const fromStack = cratesAfter.get(element.from);
      const toStack = cratesAfter.get(element.to);
      const numCrates = element.move;

      for (let i = 1; i <= numCrates; i++) {
        toStack.unshift(fromStack.shift());
        cratesAfter.set(element.from, fromStack);
        cratesAfter.set(element.to, toStack);
      }
    });

    return cratesAfter;
  }

  // Part Two
  if (cratemover === 9001) {
    moves.forEach((element) => {
      const fromStack = cratesAfter.get(element.from);
      const toStack = cratesAfter.get(element.to);
      const numCrates = element.move;

      const cratesToMove = [];

      for (let i = 0; i < numCrates; i++) {
        cratesToMove.push(fromStack.shift());
      }

      cratesAfter.set(element.from, fromStack);
      cratesAfter.set(element.to, cratesToMove.concat(toStack));
    });

    return cratesAfter;
  }
}

async function getTopCrates(input) {
  const topBoxes = [];
  input.forEach((value) => topBoxes.push(value[0]));
  return topBoxes.join('');
}

async function runDay05() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day05Input.txt'
  );
  try {
    const cratesArr = await formatCratesData(dataPath);
    const movesArr = await formatMovesData(dataPath);
    const movedCrates9000 = await moveCrates(cratesArr, movesArr, 9000);
    const movedCrates9001 = await moveCrates(cratesArr, movesArr, 9001);
    const results = [
      await getTopCrates(movedCrates9000),
      await getTopCrates(movedCrates9001),
    ];
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatCratesData,
  formatMovesData,
  moveCrates,
  getTopCrates,
  runDay05,
};
