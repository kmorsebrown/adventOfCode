const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n');
  return splitData;
}

function getAddxNum(command) {
  const tempArr = command.split(' ');
  return Number(tempArr[1]);
}

// Part One

async function getCycleMap(input) {
  let cycle = 1;
  let X = 1;
  let xMap = new Map();

  for (let i = 0; i < input.length; i++) {
    if (input[i] === 'noop') {
      // cycle start
      xMap.set(cycle, X);
      // cycle end
      cycle++;
    } else {
      // cycle start
      xMap.set(cycle, X);
      // cycle end
      cycle++;
      // cycle start
      xMap.set(cycle, X);
      let addx = getAddxNum(input[i]);
      // cycle end
      cycle++;
      X = X + addx;
    }
  }

  return xMap;
}

async function partOne(input) {
  let xMap = await getCycleMap(input);
  const lastCycle = [...xMap.keys()].pop();
  let cycle = 20;
  let signalStrengthArr = [];
  while (cycle <= lastCycle) {
    let signalStrength = cycle * xMap.get(cycle);
    signalStrengthArr.push(signalStrength);
    cycle = cycle + 40;
  }
  return signalStrengthArr.reduce((a, b) => a + b, 0);
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay10() {
  const dataPath = path.join(__dirname, 'Day10Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      //await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getAddxNum,
  getCycleMap,
  partOne,
  partTwo,
  runDay10,
};
