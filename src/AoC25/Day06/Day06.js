import { getData } from '../../Utils/globalFunctions.js';
import { createSolver } from '../../Utils/createSolver.js';
import { parseStringOfInts } from '../../Utils/parse.js';
import { transpose, transposeRagged } from '../../Utils/grids.js';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2025/day/6

// DAY=6 npm run 2025
async function formatData(filepath) {
  const data = await getData(filepath);
  return data.split('\n');
}

// Part One

async function formatDataPt1(splitData) {
  const splitDataCopy = JSON.parse(JSON.stringify(splitData));
  const operations = splitDataCopy.pop().trim().replace(/\s+/g, ' ').split(' ');
  const integers = splitDataCopy.map((str) => parseStringOfInts(str, ' '));
  return transpose([...integers, operations]);
}

function evaluateEquation(arr, operator) {
  return arr.reduce((a, b) => eval(`${a}${operator}${b}`));
}

async function partOne(input) {
  const problems = await formatDataPt1(input);
  return sum(
    problems.map((problem) => {
      const operator = problem.pop();
      return evaluateEquation(problem, operator);
    })
  );
}

// Part Two

async function formatDataPt2(splitData) {
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

async function partTwo(input) {
  const problems = await formatDataPt2(input);
  return sum(
    problems.map((problem) => {
      const operator = problem.pop();
      return evaluateEquation(problem, operator);
    })
  );
}

const solve = createSolver(formatData, partOne, partTwo, '06', import.meta.url);

export {
  formatData,
  formatDataPt1,
  evaluateEquation,
  partOne,
  formatDataPt2,
  partTwo,
  solve,
};

