import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2022/day/14

async function formatData(filepath) {
  const data = await getData(filepath);
  return data;
}

// Part One

async function partOne(input) {
  return input;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function solve() {
  const dataPath = new URL(
    '../puzzleInputs/Day14Input.txt',
    import.meta.url
  ).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export { formatData, partOne, partTwo, solve };
