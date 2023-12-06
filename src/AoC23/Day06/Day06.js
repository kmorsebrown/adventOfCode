const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');

// https://adventofcode.com/2023/day/6

exports.formatData = async (filepath) => {
  let data = await getData(filepath);
  data = data.split('\n');

  const milliseconds = parseStringOfInts(data[0].replace('Time:', ''), ' ');
  const millimeters = parseStringOfInts(data[1].replace('Time:', ''), ' ');

  return milliseconds.map((time, index) => {
    return {
      time: time,
      recordDist: millimeters[index],
    };
  });
};

// Part One

// exports.getDistance = (maxRaceTime, milSecButtonHeld) => {
//   const remainingTime = maxRaceTime - milSecButtonHeld;
//   const distTravelled = milSecButtonHeld * remainingTime;
//   return distTravelled;
// };

exports.getButtonHeldFromDistance = (time, dist) => {
  // I had to look up quadratic equations for the first time since high school
  // how dare you Advent of Code

  const resultA = Math.abs(
    (-1 * time + Math.sqrt(Math.pow(time, 2) - 4 * dist)) / 2
  );
  const resultB = Math.abs(
    (-1 * time - Math.sqrt(Math.pow(time, 2) - 4 * dist)) / 2
  );
  return [resultA, resultB];
};

exports.getNumDiffWaysToWin = (raceObj) => {};

exports.partOne = async (input) => {
  return input;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day06Input.txt'
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
