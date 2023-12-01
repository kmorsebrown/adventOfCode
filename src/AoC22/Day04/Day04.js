const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

// https://adventofcode.com/2022/day/04

async function formatData(filepath) {
  const data = await getData(filepath);
  const arrayOfStrings = data.split('\n').filter(String);
  const arrayOfarray = arrayOfStrings.map((x) => {
    return x.split(/[\W/]+/);
  });
  return arrayOfarray;
}

// Part One

async function getCountOfFullyContainedOverlaps(input) {
  let fullyContainsCount = 0;

  input.forEach((pair) => {
    const elf1Start = Number(pair[0]);
    const elf1End = Number(pair[1]);
    const elf2Start = Number(pair[2]);
    const elf2End = Number(pair[3]);

    if (elf1Start >= elf2Start && elf1End <= elf2End) {
      fullyContainsCount++;
    } else if (elf2Start >= elf1Start && elf2End <= elf1End) {
      fullyContainsCount++;
    }
  });
  return fullyContainsCount;
}

// Part Two
async function getNumOverlaps(input) {
  let overlapsCount = 0;

  input.forEach((pair) => {
    const elf1Start = Number(pair[0]);
    const elf1End = Number(pair[1]);
    const elf2Start = Number(pair[2]);
    const elf2End = Number(pair[3]);

    if (elf1Start >= elf2Start && elf1Start <= elf2End) {
      overlapsCount++;
    } else if (elf1End <= elf2End && elf1End >= elf2Start) {
      overlapsCount++;
    } else if (elf2Start >= elf1Start && elf2Start <= elf1End) {
      overlapsCount++;
    } else if (elf2End <= elf1End && elf2End >= elf1Start) {
      overlapsCount++;
    }
  });
  return overlapsCount;
}

async function runDay04() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day04Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await getCountOfFullyContainedOverlaps(formattedData),
      await getNumOverlaps(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getCountOfFullyContainedOverlaps,
  getNumOverlaps,
  runDay04,
};
