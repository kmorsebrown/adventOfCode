const { getData } = require('../../Utils/globalFunctions.js');
const { transposeArrStr } = require('../../Utils/grids.js');
const _ = require('lodash');

// https://adventofcode.com/2023/day/13
exports.formatData = async (filepath) => {
  let data = await getData(filepath);
  data = data.split('\n\n');
  data = data.map((grid) => grid.split('\n'));
  return data;
};

// Part One

exports.checkForReflection = (grid, idx) => {
  if (grid[idx] === grid[idx - 1]) {
    const maxReflectionSize = Math.min(idx, grid.length - idx);

    let topHalf = grid.slice(0, idx).reverse().slice(0, maxReflectionSize);
    let bottomHalf = grid.slice(idx).slice(0, maxReflectionSize);

    return _.isEqual(topHalf, bottomHalf);
  }
  return false;
};
exports.getReflectionData = (grid) => {
  const transposedGrid = transposeArrStr(grid);

  // check for horizontal reflection
  for (let i = 1; i < grid.length; i++) {
    if (exports.checkForReflection(grid, i)) {
      return {
        reflectionAxis: 'horiz',
        reflectionIdx: [i - 1, i],
      };
    }
  }

  // check for vertical reflection (using transposed grid)
  for (let i = 1; i < transposedGrid.length; i++) {
    if (exports.checkForReflection(transposedGrid, i)) {
      return {
        reflectionAxis: 'vert',
        reflectionIdx: [i - 1, i],
      };
    }
  }
};

exports.partOne = async (input) => {
  const reflections = input.map((grid) => exports.getReflectionData(grid));
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

exports.findNumCharDiffs = (stringA, stringB) => {
  let numDiffs = 0;
  for (let i = 0; i < stringA.length; i++) {
    if (stringA[i] !== stringB[i]) {
      numDiffs++;
    }
  }
  console.log(numDiffs);
  return numDiffs;
};

exports.getReflectionIdxWithSmudge = (grid) => {
  console.log('input:\n', grid);

  for (let i = 0; i < grid.length; i++) {
    const maxReflectionSize = Math.min(i, grid.length - i);

    let topHalf = grid
      .slice(0, i)
      .reverse()
      .slice(0, maxReflectionSize)
      .join('');
    let bottomHalf = grid.slice(i).slice(0, maxReflectionSize).join('');

    if (exports.findNumCharDiffs(topHalf, bottomHalf) === 1) {
      return i;
    }
  }
};

exports.getReflectionDataWithSmudges = (grid) => {
  const transposedGrid = transposeArrStr(grid);

  // check for horizontal reflection w/smudges
  const horizSmudgeIdx = exports.getReflectionIdxWithSmudge(grid);
  if (horizSmudgeIdx >= 0) {
    return {
      reflectionAxis: 'horiz',
      reflectionIdx: [horizSmudgeIdx - 1, horizSmudgeIdx],
    };
  }

  // check for vertical reflection w/smudges (using transposed grid)
  const vertSmudgeIdx = exports.getReflectionIdxWithSmudge(transposedGrid);
  if (vertSmudgeIdx >= 0) {
    return {
      reflectionAxis: 'vert',
      reflectionIdx: [vertSmudgeIdx - 1, vertSmudgeIdx],
    };
  }
};

exports.partTwo = async (input) => {
  const reflections = input.map((grid) =>
    exports.getReflectionDataWithSmudges(grid)
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

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day13Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
