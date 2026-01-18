import { getData, Queue } from '../../Utils/globalFunctions.js';
import { sum } from '../../Utils/maths.js';
import {
  arrayifyGrid,
  getCoordinatesForMatch,
  getAdjacentCoords,
} from '../../Utils/grids.js';
import { log } from 'console';

// https://adventofcode.com/2025/day/7

// DAY=7 npm run 2025
export async function formatData(filepath) {
  const data = await getData(filepath);
  return arrayifyGrid(data.split('\n'), '');
}

const getStartPosition = (grid) => {
  for (const [i, row] of grid.entries()) {
    let match = getCoordinatesForMatch(row, i, 'S');
    if (match) {
      return match[0];
    }
  }
}
// Part One

export function moveBeam(height, width, nextRow, current) {
  if (nextRow) {
    const row = current.row;
    const col = current.col;

    const southCoord = getAdjacentCoords({ height, width, row, col, dir: 'S' });

    if (nextRow[southCoord.col] === '^') {
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
}

export async function partOne(input) {
  let queue = new Queue();
  let queuedBeams = new Set();

  let numSplits = 0;

  const start = getStartPosition(input);

  queuedBeams.add(`${start.row}-${start.col}`);
  queue.enqueue(start);

  while (!queue.isEmpty()) {
    let current = queue.front();

    let nextBeams = moveBeam(
      input.length,
      input[0].length,
      input[current.row + 1],
      current
    );
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
}

// Part Two

export function getNextRow() {};
export async function partTwo(input) {
  const start = getStartPosition(input);

  // key: col, val: num incoming beams
  let currentRow = new Map();
  currentRow.set(start.col, 1);

  // increment by 2 b/c splitters only every other row
  // and beam always moves down
  // so splitter row & the row below it will always have the same
  // beam data
  for (let i = 1; i < input.length; i += 2) {
    let nextRow = new Map();
    currentRow.forEach((numBeams, col) => {
      let nextBeams = moveBeam(
        input.length,
        input[0].length,
        input[i + 1],
        {
          row: i,
          col: col,
        }
      );
      if (nextBeams) {
        nextBeams.filter(Boolean).forEach((beam) => {
          if (nextRow.has(beam.col)) {
            nextRow.set(beam.col, nextRow.get(beam.col) + numBeams);
          } else {
            nextRow.set(beam.col, numBeams);
          }
        });
      }
    });

    if (nextRow.size > 0) {
      currentRow.clear();
      currentRow = new Map(nextRow);
    }
  }
  const beams = [...currentRow.values()];
  return sum(beams);
}

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day07Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 07');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

