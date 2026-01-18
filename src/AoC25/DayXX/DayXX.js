import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2025/day/XX

// DAY=X npm run 2025
export async function formatData(filepath) {
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
  const dataPath = new URL('../puzzleInputs/DayXXInput.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day XX');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

