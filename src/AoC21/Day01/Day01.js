import fs from 'fs';
import path from 'path';
import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2021/day/1

async function formatData(filepath) {
  const data = await getData(filepath);
  const numberArray = data.split('\n').map(Number);
  return numberArray;
}

// Part One

async function getNumIncreases(input) {
  let numIncreases = 0;

  for (var index = 0; index < input.length; index++) {
    let current = index;
    let prev = index - 1;

    if (current > 0 && input[current] > input[prev]) {
      numIncreases += 1;
    }
  }

  return numIncreases;
}

// Part Two
async function getSumIncreases(input) {
  let numSumIncreases = 0;

  for (var index = 0; index < input.length - 3; index++) {
    let groupOne = input[index] + input[index + 1] + input[index + 2];
    let groupTwo = input[index + 1] + input[index + 2] + input[index + 3];

    if (groupTwo > groupOne) {
      numSumIncreases += 1;
    }
  }
  return numSumIncreases;
}

async function runDay01() {
  const dataPath = new URL(
    '../../puzzleInputs/Day01Input.txt',
    import.meta.url
  ).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await getNumIncreases(formattedData),
      await getSumIncreases(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export { formatData, getNumIncreases, getSumIncreases, runDay01 };
