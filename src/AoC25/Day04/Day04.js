import { getData, Queue } from '../../Utils/globalFunctions.js';
import {
  arrayifyGrid,
  getCoordinatesForAllMatches,
  getAdjacentMatches,
} from '../../Utils/grids.js';

// https://adventofcode.com/2025/day/04

// DAY=04 npm run 2025
const formatData = async (filepath) => {
  const data = await getData(filepath);
  let parsedData = data.split('\n');
  return arrayifyGrid(parsedData, '');
};

/*
  rolls of paper (@) arranged in a grid
  can only access roll of paper if there are fewer than 4 rolls of paper in the 8 adjacent positions
  figure out which rolls of paper the forklifts can access

  input map           paper forklift can access marked with "x"

  ..@@.@@@@.          ..xx.xx@x.
  @@@.@.@.@@          x@@.@.@.@@
  @@@@@.@.@@          @@@@@.x.@@
  @.@@@@..@.          @.@@@@..@.
  @@.@@@@.@@          x@.@@@@.@x
  .@@@@@@@.@          .@@@@@@@.@
  .@.@.@.@@@          .@.@.@.@@@
  @.@@@.@@@@          x.@@@.@@@@
  .@@@@@@@@.          .@@@@@@@@.
  @.@.@@@.@.          x.x.@@@.x.
*/

// Part One

const findAccessiblePaper = async (grid) => {
  let queue = new Queue();
  const paperRollsCoords = getCoordinatesForAllMatches(grid, '@');

  let accessibleRolls = new Set();

  for (let i = 0; i < paperRollsCoords.length; i++) {
    queue.enqueue(paperRollsCoords[i]);
  }

  while (!queue.isEmpty()) {
    let currentRoll = queue.front();
    const { row, col } = currentRoll;

    const isPaperRoll = (el) => el === '@';

    const adjacentMatches = getAdjacentMatches(grid, row, col, isPaperRoll, {
      allowDiagonals: true,
    });

    if (adjacentMatches.length < 4) {
      accessibleRolls.add(currentRoll);
    }
    queue.dequeue();
  }

  return accessibleRolls;
};

const partOne = async (input) => {
  const accessibleRolls = await findAccessiblePaper(input);
  return accessibleRolls.size;
};

// Part Two

const removeRolls = async (grid, accessibleRolls) => {
  let newGrid = grid;
  accessibleRolls.forEach((currentRoll) => {
    const { row, col } = currentRoll;

    grid[row][col] = '.';
  });

  return newGrid;
};

const findAndRemoveAccessibleRolls = async (
  grid,
  accessibleRolls,
  numRollsRemoved
) => {
  let newGrid = await removeRolls(grid, accessibleRolls);
  let newNumRollsRemoved = numRollsRemoved + accessibleRolls.size;

  let newAccessibleRolls = await findAccessiblePaper(grid);

  if (newAccessibleRolls.size === 0) {
    return newNumRollsRemoved;
  }

  return await findAndRemoveAccessibleRolls(
    newGrid,
    newAccessibleRolls,
    newNumRollsRemoved
  );
};

const partTwo = async (input) => {
  const accessibleRolls = await findAccessiblePaper(input);
  const numRollsRemoved = await findAndRemoveAccessibleRolls(
    input,
    accessibleRolls,
    0
  );
  return numRollsRemoved;
};

const solve = async () => {
  const dataPath = new URL('../../puzzleInputs/Day04Input.txt', import.meta.url)
    .pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 04');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

// Only run solve() when this file is executed directly
if (import.meta.url.endsWith(process.argv[1])) {
  solve();
}

export {
  formatData,
  findAccessiblePaper,
  partOne,
  removeRolls,
  findAndRemoveAccessibleRolls,
  partTwo,
  solve,
};
