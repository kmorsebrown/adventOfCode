const { getData } = require('../../Utils/globalFunctions.js');
const { arrayifyGrid } = require('../../Utils/grids.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { BitwiseShape, BitwiseField } = require('../../Utils/bitwise.js');

// https://adventofcode.com/2025/day/12

// DAY=12 npm run 2025
const formatData = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n\n');
  const regions = splitData.pop().split('\n');
  let formattedShapes = splitData.map((row) =>
    row.replace(/\d:\n/g, '').split('\n')
  );

  let formattedRegions = [];

  for (const region of regions) {
    const regex = /\d*x\d*:/g;
    const dimensions = parseStringOfInts(
      region.match(regex)[0].replace(':', ''),
      'x'
    );
    const gifts = parseStringOfInts(region.replace(regex, ''), ' ');
    formattedRegions.push({
      dimensions,
      gifts,
    });
  }

  return {
    shapes: formattedShapes,
    regions: formattedRegions,
  };
};

// Part One

/*
  presents come in a few standard but weird shapes

  shapes and the regions in which they need to fit are all measured in standard units

  presents need to be placed into the regions in a way that follows a standard 2d unit grid

  cannot stack presents

  presents can be rotated and flipped as necessary to. make them fit

  must be placed perfectly on the grid => no overlaps
*/

// how many of the regions can fit all of the presents listed?
const partOne = async (input) => {
  return input;
};

// Part Two
const partTwo = async (input) => {
  return input;
};

const solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day12Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 12');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

// solve();

const rectShape = new BitwiseShape(4, 2, [0b0111, 0b1100]);
const shape = new BitwiseShape(2, 4, [0b10, 0b10, 0b11n, 0b01]);

const field = new BitwiseField(4, 4);
console.log(field.toString());

module.exports = {
  solve,
  formatData,
  partOne,
  partTwo,
};
