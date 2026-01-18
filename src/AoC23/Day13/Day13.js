import { getData } from '../../Utils/globalFunctions.js';
import { transposeArrStr } from '../../Utils/grids.js';
import _ from 'lodash';

// https://adventofcode.com/2023/day/13
export async function formatData(filepath) {
  let data = await getData(filepath);
  data = data.split('\n\n');
  data = data.map((grid) => grid.split('\n'));
  return data;
};

// Part One

export function checkForReflection(grid, idx) {
  if (grid[idx] === grid[idx - 1]) {
    const maxReflectionSize = Math.min(idx, grid.length - idx);

    let topHalf = grid.slice(0, idx).reverse().slice(0, maxReflectionSize);
    let bottomHalf = grid.slice(idx).slice(0, maxReflectionSize);

    return _.isEqual(topHalf, bottomHalf);
  }
  return false;
};
export function getReflectionData(grid) {
  const transposedGrid = transposeArrStr(grid);

  // check for horizontal reflection
  for (let i = 1; i < grid.length; i++) {
    if (checkForReflection(grid, i)) {
      return {
        reflectionAxis: 'horiz',
        reflectionIdx: [i - 1, i],
      };
    }
  }

  // check for vertical reflection (using transposed grid)
  for (let i = 1; i < transposedGrid.length; i++) {
    if (checkForReflection(transposedGrid, i)) {
      return {
        reflectionAxis: 'vert',
        reflectionIdx: [i - 1, i],
      };
    }
  }
};

export async function partOne(input) {
  const reflections = input.map((grid) => getReflectionData(grid));
  let result = 0;

  reflections.forEach((grid) => {
    let { reflectionAxis, reflectionIdx } = grid;
    if (reflectionAxis === 'vert') {
      // add up the number of columns to the left of each vertical line of reflection
      result += reflectionIdx[1];
    } else if (reflectionAxis === 'horiz') {
      //add 100 multiplied by the number of rows above each horizontal line of reflection
      result += reflectionIdx[1] * 100;
    }
  });

  return result;
};

// Part Two

export function findNumCharDiffs(stringA, stringB) {
  let numDiffs = 0;
  for (let i = 0; i < stringA.length; i++) {
    if (stringA[i] !== stringB[i]) {
      numDiffs++;
    }
  }
  console.log(numDiffs);
  return numDiffs;
};

export function getReflectionIdxWithSmudge(grid) {
  console.log('input:\n', grid);

  for (let i = 0; i < grid.length; i++) {
    const maxReflectionSize = Math.min(i, grid.length - i);

    let topHalf = grid
      .slice(0, i)
      .reverse()
      .slice(0, maxReflectionSize)
      .join('');
    let bottomHalf = grid.slice(i).slice(0, maxReflectionSize).join('');

    if (findNumCharDiffs(topHalf, bottomHalf) === 1) {
      return i;
    }
  }
};

export function getReflectionDataWithSmudges(grid) {
  const transposedGrid = transposeArrStr(grid);

  // check for horizontal reflection w/smudges
  const horizSmudgeIdx = getReflectionIdxWithSmudge(grid);
  if (horizSmudgeIdx >= 0) {
    return {
      reflectionAxis: 'horiz',
      reflectionIdx: [horizSmudgeIdx - 1, horizSmudgeIdx],
    };
  }

  // check for vertical reflection w/smudges (using transposed grid)
  const vertSmudgeIdx = getReflectionIdxWithSmudge(transposedGrid);
  if (vertSmudgeIdx >= 0) {
    return {
      reflectionAxis: 'vert',
      reflectionIdx: [vertSmudgeIdx - 1, vertSmudgeIdx],
    };
  }
};

export async function partTwo(input) {
  const reflections = input.map((grid) =>
    getReflectionDataWithSmudges(grid)
  );
  let result = 0;

  reflections.forEach((grid) => {
    let { reflectionAxis, reflectionIdx } = grid;
    if (reflectionAxis === 'vert') {
      // add up the number of columns to the left of each vertical line of reflection
      result += reflectionIdx[1];
    } else if (reflectionAxis === 'horiz') {
      //add 100 multiplied by the number of rows above each horizontal line of reflection
      result += reflectionIdx[1] * 100;
    }
  });

  return result;
};

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day13Input.txt', import.meta.url).pathname;

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
};

solve();
