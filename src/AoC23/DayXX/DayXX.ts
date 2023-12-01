import * as path from 'path';

import { getData } from '../../globalFunctions.js';

export async function formatData(filepath: string) {
  const data = await getData(filepath);
  return data;
}

// Part One

export async function partOne(input) {
  return input;
}

// Part Two
export async function partTwo(input) {
  return input;
}

export async function solve() {
  const dataPath = path.join(__dirname, 'DayXXInput.txt');

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
}

solve();
