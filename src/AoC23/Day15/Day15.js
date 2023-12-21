const { getData } = require('../../Utils/globalFunctions.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2023/day/15
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split(',');
};

// Part One

exports.runHASH = (string) => {
  let currentValue = 0;
  for (let i = 0; i < string.length; i++) {
    currentValue += string.charCodeAt(i);
    currentValue = currentValue * 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
};

exports.partOne = async (input) => {
  let results = [];
  input.forEach((step) => results.push(exports.runHASH(step)));
  return sum(results);
};

// Part Two

exports.runHASHMAP = (map, str) => {
  const label = str.replace(/[^A-Z]+/gi, '');
  const operator = str.replace(/[^=-]+/gi, '');
  const focalLength = Number(str.replace(/[^0-9]+/gi, ''));
  const box = exports.runHASH(label);

  let boxContents = [];
  let boxLenses = [];

  if (map.has(box)) {
    boxContents = map.get(box);
    boxLenses = boxContents.map((x) => x[0]);
  }

  if (operator === '=') {
    if (boxLenses.includes(label)) {
      const lensIdx = boxLenses.indexOf(label);
      boxContents[lensIdx][1] = focalLength;
    } else {
      boxContents.push([label, focalLength]);
    }
  }

  if (operator === '-' && boxLenses.includes(label)) {
    const lensIdx = boxLenses.indexOf(label);
    if (lensIdx > -1) {
      boxContents.splice(lensIdx, 1);
    }
  }
  map.set(box, boxContents);
};
exports.partTwo = async (input) => {
  let map = new Map();

  input.forEach((str) => exports.runHASHMAP(map, str));

  let focusingPower = 0;
  for (const [key, value] of map) {
    value.forEach((lens, idx) => {
      if (value.length > 0) {
        focusingPower += (key + 1) * (idx + 1) * lens[1];
      }
    });
  }
  return focusingPower;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day15Input.txt'
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
