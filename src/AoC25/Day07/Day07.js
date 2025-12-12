const { getData, Queue } = require('../../Utils/globalFunctions.js');
const {
  arrayifyGrid,
  getCoordinatesForMatch,
  getAdjacentCoords,
} = require('../../Utils/grids.js');

// https://adventofcode.com/2025/day/7

// DAY=7 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return arrayifyGrid(data.split('\n'), '');
};

// Part One

exports.moveBeam = (grid, current) => {
  const height = grid.length;
  const width = grid[0].length;
  const row = current.row;
  const col = current.col;

  const southCoord = getAdjacentCoords({ height, width, row, col, dir: 'S' });

  if (southCoord) {
    if (grid[southCoord.row][southCoord.col] === '^') {
      const newBeams = [
        getAdjacentCoords({
          height,
          width,
          row: southCoord.row,
          col: southCoord.col,
          dir: 'W',
        }),
        getAdjacentCoords({
          height,
          width,
          row: southCoord.row,
          col: southCoord.col,
          dir: 'E',
        }),
      ];
      return newBeams;
    } else {
      return [southCoord];
    }
  }
};

exports.partOne = async (input) => {
  let queue = new Queue();
  let queuedBeams = new Set();

  let numSplits = 0;

  for (const [i, row] of input.entries()) {
    let match = getCoordinatesForMatch(row, i, 'S');
    if (match) {
      queuedBeams.add(`${match.row}-${match.col}`);
      queue.enqueue(match[0]);
      break;
    }
  }

  while (!queue.isEmpty()) {
    let current = queue.front();

    let nextBeams = exports.moveBeam(input, current);
    if (nextBeams) {
      if (nextBeams.length > 1) {
        numSplits += 1;
      }
      nextBeams.filter(Boolean).forEach((beam) => {
        if (!queuedBeams.has(`${beam.row}-${beam.col}`)) {
          queue.enqueue(beam);
          queuedBeams.add(`${beam.row}-${beam.col}`);
        }
      });
    }
    queue.dequeue();
  }
  return numSplits;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day07Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      //await exports.partTwo(formattedData),
    ]);
    log('\n' + 'Day 07');
    log(results);
    return results;
  } catch (err) {
    log(err);
  }
};

exports.solve();
