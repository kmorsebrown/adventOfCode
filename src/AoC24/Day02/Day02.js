const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');

// https://adventofcode.com/2024/day/02

// DAY=2 npm run 2024

exports.formatData = async (filepath) => {
  // Puzzle input consists of many reports: one report per line
  // Each report is a list of numbers, levels, separated by spaces
  const data = await getData(filepath);
  let reports = data
    .split('\n')
    .filter(String)
    .map((level) => parseStringOfInts(level, ' '));
  return reports;
};

// Part One

/*
  Figure out how many reports are safe
  A report is only safe if both of the following are true:
    - The levels are either all increasing or all decreasing.
    - Any two adjacent levels differ by at least one and at most three.
*/

exports.isSafe = (array) => {
  const checkDir = (a, b) => {
    return a - b > 0 ? 'inc' : 'dec';
  };

  const checkDiff = (a, b) => {
    const diff = Math.abs(a - b);
    return diff >= 1 && diff <= 3;
  };

  const dir = checkDir(array[0], array[1]);

  const badLevels = new Set();

  for (let i = 0; i < array.length - 1; i++) {
    const level_a = array[i];
    const level_b = array[i + 1];

    if (
      checkDir(level_a, level_b) != dir ||
      checkDiff(level_a, level_b) === false
    ) {
      badLevels.add(i);
      badLevels.add(i + 1);
    }
  }

  return {
    isSafe: badLevels.size === 0 ? true : false,
    badLevels: badLevels,
  };
};

exports.partOne = async (input) => {
  let numSafeReports = 0;

  input.forEach((report) => {
    if (exports.isSafe(report).isSafe) {
      numSafeReports += 1;
    }
  });

  return numSafeReports;
};

// Part Two

/*
  The reactor safety systems will tolerate one bad level.
  Figure out how many reports are safe.
  The same rules apply as before, 
  except if removing a single level from an unsafe report would make it safe, 
  the report instead counts as safe
*/

const checkDir = (a, b) => {
  return b - a > 0 ? 'inc' : 'dec';
};

const checkDiff = (a, b) => {
  const diff = Math.abs(a - b);
  return diff >= 1 && diff <= 3;
};

exports.isSafePtTwo = (array) => {
  const initialEval = exports.isSafe(array);

  // if report is safe without modification, return true
  if (initialEval.isSafe) {
    return true;
  } else {
    // if report is not safe, iterate through each level
    for (let i = 0; i < array.length; i++) {
      // remove the current level from the report
      const arrayWithoutOneLevel = array.slice(0, i).concat(array.slice(i + 1));

      // check if the report is now safe without the current level
      const newEval = exports.isSafe(arrayWithoutOneLevel);

      // if removing the current level makes the report safe, return true
      if (newEval.isSafe) {
        return true;
      }
    }

    // if report is still unsafe, return false
    return false;
  }
};

exports.partTwo = async (input) => {
  let numSafeReports = 0;

  input.forEach((report) => {
    if (exports.isSafePtTwo(report)) {
      numSafeReports += 1;
    }
  });

  return numSafeReports;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day02Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
