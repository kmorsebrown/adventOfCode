import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts } from '../../Utils/parse.js';

// https://adventofcode.com/2023/day/6

export async function formatData(filepath) {
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
}

export function getMinMaxHoldTimeToWin(race) {
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
}

export async function partOne(input) {
  // Determine the number of ways you can beat the record in each race
  let numWaysToWin = [];
  input.forEach((race) => {
    let [min, max] = getMinMaxHoldTimeToWin(race);
    numWaysToWin.push(max - min + 1);
  });
  // What do you get if you multiply these numbers together?
  return numWaysToWin.reduce((a, b) => a * b);
}

// Part Two
export async function formatDataPart2(filepath) {
  let data = await getData(filepath);
  data = data.split('\n');
  return {
    time: parseInt(data[0].replace(/\D/g, '')),
    recordDist: parseInt(data[1].replace(/\D/g, '')),
  };
}

export async function partTwo(input) {
  let [min, max] = getMinMaxHoldTimeToWin(input);
  return max - min + 1;
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day06Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const formattedDataPart2 = await formatDataPart2(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedDataPart2),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
