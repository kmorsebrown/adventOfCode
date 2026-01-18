import { getData, Queue } from '../../Utils/globalFunctions.js';
import {
  arrayifyGrid,
  getCoordinatesForAllMatches,
  getAdjacentMatches,
} from '../../Utils/grids.js';

// https://adventofcode.com/2025/day/04

// DAY=04 npm run 2025
export async function formatData(filepath) {
  const data = await getData(filepath);
  let parsedData = data.split('\n');
  return arrayifyGrid(parsedData, '');
}

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

export async function findAccessiblePaper(grid) {
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
}

export async function partOne(input) {
  const accessibleRolls = await findAccessiblePaper(input);
  return accessibleRolls.size;
}

// Part Two

export async function removeRolls(grid, accessibleRolls) {
  let newGrid = grid;
  accessibleRolls.forEach((currentRoll) => {
    const { row, col } = currentRoll;

    grid[row][col] = '.';
  });

  return newGrid;
}

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

export async function partTwo(input) {
  const accessibleRolls = await findAccessiblePaper(input);
  const numRollsRemoved = await findAndRemoveAccessibleRolls(
    input,
    accessibleRolls,
    0
  );
  return numRollsRemoved;
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day04Input.txt', import.meta.url).pathname;

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
}

// Only run solve() when this file is executed directly
if (import.meta.url.endsWith(process.argv[1])) {
  solve();
}
