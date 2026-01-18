import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2023/day/1
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

export function extractWordAndDigitNumbers(str) {
  const stringToNumbers = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };
  let newStr = '';
  do {
    if (str.slice(0, 1).match('^[0-9].*$')) {
      newStr += str.slice(0, 1);
    } else {
      Object.entries(stringToNumbers).forEach((entry) => {
        let string = entry[0];
        let number = entry[1];
        if (str.startsWith(string)) {
          newStr += number;
        }
      });
    }
    str = str.slice(1);
  } while (str.length > 0);
  return newStr;
}
export async function partTwo(input: string[]) {
  const extractedNumbers: string[] = input.map((line) =>
    extractWordAndDigitNumbers(line)
  );
  const calibrationValues: number[] = extractedNumbers.map((x) =>
    getCalibrationValues(x)
  );
  return calibrationValues.reduce((a, b) => a + b);
}

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day01Input.txt', import.meta.url).pathname;

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

