import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2024/day/03

// DAY=3 npm run 2024

/*
  Corrupted computer program - all instructions have been jumpled
  Goal of program is just to multiply
  mul(X,Y) where X and Y are 1-3 digit numbers
  Invalid characters should be ignored,
  even if they look like they're part of a mul instruction
*/
export async function formatData(filepath) {
  const data = await getData(filepath);
  return data;
}

// Part One

export const partOneRegex = /mul\(\d{1,3},\d{1,3}\)/g;
export const partTwoRegex = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g;

export function extractMatches(regex, string) {
  const matches = string.matchAll(regex);
  const instructions = [];
  for (const match of matches) {
    instructions.push(match[0]);
  }
  return instructions;
}

export function extractMultipliers(array, checkConditionals = false) {
  const convertInstructions = (string) => {
    string = string.replace(/(mul\()/g, '');
    string = string.replace(/\)/g, '');
    const numbers = string.split(',');
    return [Number(numbers[0]), Number(numbers[1])];
  };

  // part one
  if (!checkConditionals) {
    return array.map((string) => convertInstructions(string));
  }

  // part two
  if (checkConditionals) {
    let progEnabled = true;
    let multipliers = [];
    const ENABLE = /do\(\)/;
    const DISABLE = /don't\(\)/;
    const INSTRUCTION = /mul\(.*?\)/;

    array.forEach((string) => {
      if (DISABLE.test(string)) {
        // disable program when a disable conditional statement is reached
        progEnabled = false;
      } else if (ENABLE.test(string)) {
        // enable program when an enable conditional statement is reached
        progEnabled = true;
      } else if (INSTRUCTION.test(string) && progEnabled) {
        // convert multipliers if the program is enabled
        multipliers.push(convertInstructions(string));
      }
    });

    return multipliers;
  }
}

export async function partOne(input) {
  const instructions = extractMatches(partOneRegex, input);
  const multipliers = extractMultipliers(instructions);

  let result = 0;

  multipliers.forEach((pair) => {
    result += pair[0] * pair[1];
  });
  return result;
}

// Part Two
export async function partTwo(input) {
  const instructions = extractMatches(partTwoRegex, input);

  const multipliers = extractMultipliers(instructions, true);

  let result = 0;

  multipliers.forEach((pair) => {
    result += pair[0] * pair[1];
  });

  return result;
}

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day03Input.txt', import.meta.url).pathname;

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

