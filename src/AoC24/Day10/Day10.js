import { getData, Queue } from '../../Utils/globalFunctions.js';
import {
  arrayifyGrid,
  getCoordinatesForAllMatches,
  getAdjacentMatches,
} from '../../Utils/grids.js';
import { sum } from '../../Utils/maths.js';
// https://adventofcode.com/2024/day/10

// DAY=10 npm run 2024
export async function formatData(filepath) {
  const data = await getData(filepath);
  let parsedData = data.split('\n');
  return arrayifyGrid(parsedData, '');
}

const TRAILHEAD = 0;
const TRAILEND = 9;

// Part One

// A trailhead's score is the number of 9-height positions reachable from that trailhead via a hiking trail.
async function generateTrailheadScores(grid, increment) {
  let queue = new Queue();
  const trailheadcoords = getCoordinatesForAllMatches(grid, TRAILHEAD);
  let trailheadScores = [];

  for (let i = 0; i < trailheadcoords.length; i++) {
    queue.enqueue(trailheadcoords[i]);
  }

  while (!queue.isEmpty()) {
    let startCoords = queue.front();
    let score = 0;

    // DFS
    const numRows = grid.length;
    const numCols = grid[0].length;

    const stack = [startCoords];
    const visited = new Set();

    while (stack.length > 0) {
      const { row, col } = stack.pop();
      const height = grid[row][col];

      // Process the current cell
      visited.add(`${row}-${col}`);
      console.log(`Visited: (${row}-${col})`);

      // check if the cell is trail end
      if (height === TRAILEND) {
        score += 1;
        continue;
      }

      // push neighbors with the correct height increment to the stack
      const reachable = (adjacentHeight) => {
        return adjacentHeight === height + increment;
      };
      const adjacentMatches = getAdjacentMatches(grid, row, col, reachable);
      if (adjacentMatches.length > 0) {
        adjacentMatches.forEach((match) => {
          if (!visited.has(`${match.row}-${match.col}`)) {
            stack.push(match);
          }
        });
      }
    }

    // store the current trailhead's score
    trailheadScores.push(score);
    queue.dequeue();
  }
  return trailheadScores;
}

export async function partOne(input) {
  const trailheadScores = await generateTrailheadScores(input, 1);
  return sum(trailheadScores);
}

// Part Two

// A trailhead's rating is the number of distinct hiking trails which begin at that trailhead.
async function generateTrailheadRatings(grid, increment) {
  let queue = new Queue();
  const trailheadcoords = getCoordinatesForAllMatches(grid, TRAILHEAD);
  let trailheadRatings = [];

  for (let i = 0; i < trailheadcoords.length; i++) {
    queue.enqueue(trailheadcoords[i]);
  }

  while (!queue.isEmpty()) {
    let startCoords = queue.front();
    let rating = 0;

    // DFS
    const numRows = grid.length;
    const numCols = grid[0].length;

    const stack = [startCoords];
    let path = new Map();
    let paths = new Set();
    const visited = new Set();

    let startOfNewPath = false;

    while (stack.length > 0) {
      const { row, col } = stack.pop();
      const height = grid[row][col];

      path.set(height, `${row}-${col}`);

      // check if the cell is trail end
      if (height === TRAILEND && !paths.has(JSON.stringify(path))) {
        rating += 1;
        paths.add(JSON.stringify(Object.fromEntries(path)));
        continue;
      }

      // Process the current cell
      visited.add(`${row}-${col}`);
      console.log(`Visited: (${row}-${col})`);

      // push neighbors with the correct height increment to the stack
      const reachable = (adjacentHeight) => {
        return adjacentHeight === height + increment;
      };
      const adjacentMatches = getAdjacentMatches(grid, row, col, reachable);
      if (adjacentMatches.length > 0) {
        stack.push(...adjacentMatches);
        // adjacentMatches.forEach((match) => {
        //   if (!visited.includes(`${match.row}-${match.col}`)) {
        //     stack.push(match);
        //   }
        // });
      }
    }

    // store the current trailhead's rating
    trailheadRatings.push(rating);
    queue.dequeue();
  }
  return trailheadRatings;
}

export async function partTwo(input) {
  const trailheadRatings = await generateTrailheadRatings(input, 1);
  return sum(trailheadRatings);
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day10Input.txt', import.meta.url).pathname;

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

solve();
