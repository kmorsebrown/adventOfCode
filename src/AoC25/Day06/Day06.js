import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts } from '../../Utils/parse.js';
import { transpose, transposeRagged } from '../../Utils/grids.js';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2025/day/6

// DAY=6 npm run 2025
export async function formatData(filepath) {
  const data = await getData(filepath);
  return data.split('\n');
}

// Part One

export async function formatDataPt1(splitData) {
  const splitDataCopy = JSON.parse(JSON.stringify(splitData));
  const operations = splitDataCopy.pop().trim().replace(/\s+/g, ' ').split(' ');
  const integers = splitDataCopy.map((str) => parseStringOfInts(str, ' '));
  return transpose([...integers, operations]);
}

export function evaluateEquation(arr, operator) {
  return arr.reduce((a, b) => eval(`${a}${operator}${b}`));
}

export async function partOne(input) {
  const problems = await formatDataPt1(input);
  return sum(
    problems.map((problem) => {
      const operator = problem.pop();
      return evaluateEquation(problem, operator);
    })
  );
}

// Part Two

export async function formatDataPt2(splitData) {
  const splitDataCopy = JSON.parse(JSON.stringify(splitData));
  const operations = splitDataCopy.pop().trim().replace(/\s+/g, ' ').split(' ');
  const transposed = transpose(splitDataCopy.map((str) => str.split(''))).map(
    (arr) => arr.join('')
  );

  let result = [];
  let temp = [];

  transposed.forEach((item) => {
    if (item.trim() === '') {
      result.push([...temp.reverse(), operations.shift()]);
      temp = [];
    } else {
      temp.push(parseInt(item.trim()));
    }
  });
  if (temp.length) result.push([...temp.reverse(), operations.shift()]);

  return result.reverse();
}

export async function partTwo(input) {
  const problems = await formatDataPt2(input);
  return sum(
    problems.map((problem) => {
      const operator = problem.pop();
      return evaluateEquation(problem, operator);
    })
  );
}

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day06Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 06');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

