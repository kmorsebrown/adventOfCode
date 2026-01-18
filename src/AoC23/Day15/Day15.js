import { getData } from '../../Utils/globalFunctions.js';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2023/day/15
export async function formatData(filepath) {
  const data = await getData(filepath);
  return data.split(',');
};

// Part One

export function runHASH(string) {
  let currentValue = 0;
  for (let i = 0; i < string.length; i++) {
    currentValue += string.charCodeAt(i);
    currentValue = currentValue * 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
};

export async function partOne(input) {
  let results = [];
  input.forEach((step) => results.push(runHASH(step)));
  return sum(results);
};

// Part Two

export function runHASHMAP(map, str) {
  const label = str.replace(/[^A-Z]+/gi, '');
  const operator = str.replace(/[^=-]+/gi, '');
  const focalLength = Number(str.replace(/[^0-9]+/gi, ''));
  const box = runHASH(label);

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
export async function partTwo(input) {
  let map = new Map();

  input.forEach((str) => runHASHMAP(map, str));

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

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day15Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

