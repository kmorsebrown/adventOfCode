import * as path from 'path';
import { getData } from '../../globalFunctions.js';

export async function formatData(filepath: string): Promise<string[]> {
  const data = await getData(filepath);
  return data.split('\n').filter(String);
}

// Part One

export function extractNumbers(line: string): string {
  let extractedNumbers = line.match(/\d+/g);
  if (extractedNumbers) {
    return extractedNumbers.join('');
  }
  return '';
}

export function getCalibrationValues(str: string): number {
  if (str.length === 0) {
    return 0;
  } else if (str.length === 1) {
    return Number(str + str);
  } else if (str.length === 2) {
    return Number(str);
  } else {
    return Number(str.slice(0, 1) + str.slice(-1));
  }
}

export async function partOne(input: string[]) {
  const extractedNumbers: string[] = input.map((line) => extractNumbers(line));
  const calibrationValues: number[] = extractedNumbers.map((x) =>
    getCalibrationValues(x)
  );
  return calibrationValues.reduce((a, b) => a + b);
}

// Part Two
export async function partTwo(input) {
  return input;
}

export async function solve() {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day01Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      //await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
