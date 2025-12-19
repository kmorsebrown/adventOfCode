const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { combinations } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/9

// DAY=9 npm run 2025
const formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n').map((str) => parseStringOfInts(str, ','));
};

const getArea = (t1, t2) => {
  const length = Math.abs(t1[1] - t2[1]) + 1;
  const width = Math.abs(t1[0] - t2[0]) + 1;
  return length * width;
};

// Part One

const partOne = async (input) => {
  const areas = new Map();
  let largestArea = 0;

  const totalCombinations = combinations(input.length, 2);

  for (const [i1, t1] of input.entries()) {
    if (areas.size === totalCombinations) {
      break;
    }
    for (const [i2, t2] of input.entries()) {
      if (areas.size === totalCombinations) {
        break;
      }

      if (i1 === i2) {
        continue;
      }

      if (areas.has(`${i1},${i2}`) || areas.has(`${i2},${i1}`)) {
        continue;
      }

      const area = getArea(t1, t2);
      areas.set(`${i1},${i2}`, area);

      if (area > largestArea) {
        largestArea = area;
      }
    }
  }

  return largestArea;
};

// Part Two
const partTwo = async (input) => {
  return input;
};

const solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day09Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      //await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 09');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

solve();

module.exports = {
  solve,
  formatData,
  partOne,
  partTwo,
  getArea,
};
