const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');

// https://adventofcode.com/2023/day/6

exports.formatData = async (filepath) => {
  let data = await getData(filepath);
  data = data.split('\n');

  const milliseconds = parseStringOfInts(data[0], ' ');
  const millimeters = parseStringOfInts(data[1], ' ');

  return milliseconds.map((time, index) => {
    return {
      time: time,
      recordDist: millimeters[index],
    };
  });
};

exports.getMinMaxHoldTimeToWin = (race) => {
  const { time, recordDist } = race;

  // I had to look up quadratic equations for the first time since high school
  // how dare you Advent of Code

  return [
    // get the shorter button hold time for the record distance, round down, then add one
    Math.floor(
      Math.abs((-1 * time + Math.sqrt(Math.pow(time, 2) - 4 * recordDist)) / 2)
    ) + 1,
    // get the longer button hold time for the record distance, round up, then subtract one
    Math.ceil(
      Math.abs((-1 * time - Math.sqrt(Math.pow(time, 2) - 4 * recordDist)) / 2)
    ) - 1,
  ];
};

exports.partOne = async (input) => {
  // Determine the number of ways you can beat the record in each race
  let numWaysToWin = [];
  input.forEach((race) => {
    let [min, max] = exports.getMinMaxHoldTimeToWin(race);
    numWaysToWin.push(max - min + 1);
  });
  // What do you get if you multiply these numbers together?
  return numWaysToWin.reduce((a, b) => a * b);
};

// Part Two
exports.formatDataPart2 = async (filepath) => {
  let data = await getData(filepath);
  data = data.split('\n');
  return {
    time: parseInt(data[0].replace(/\D/g, '')),
    recordDist: parseInt(data[1].replace(/\D/g, '')),
  };
};

exports.partTwo = async (input) => {
  let [min, max] = exports.getMinMaxHoldTimeToWin(input);
  return max - min + 1;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day06Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const formattedDataPart2 = await exports.formatDataPart2(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedDataPart2),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
