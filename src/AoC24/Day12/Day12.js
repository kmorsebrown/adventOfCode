const { getData, Queue } = require('../../Utils/globalFunctions.js');
const { getAllAdjacentCoords } = require('../../Utils/grids.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/12

// DAY=12 npm run 2024
exports.formatData = async (fileregion) => {
  const data = await getData(fileregion);
  return data.split('\n');
};

// garden plot: single type of plant > a single letter on your map. each plot is a square & has 4 sides
// region: multiple touching (horizontally or vertically) plots of the same type
// area of a region: number of plots in a region
// perimeter of a region: the number of sides of garden plots in the region that do not touch another garden plot in the same region
// Plants of the same type can appear in multiple separate regions
// Regions can appear within other regions
// Price of a fence is area * perimeter

// Part One

exports.generateRegions = (grid) => {
  let queue = new Queue();
  let regions = new Map();
  let addedToRegion = new Set();
  let queued = new Set();
  let regionKey = 0;

  queue.enqueue(JSON.stringify({ row: 0, col: 0 }));
  queued.add(JSON.stringify({ row: 0, col: 0 }));

  while (!queue.isEmpty()) {
    let startCoordsKey = queue.front();
    let startCoords = JSON.parse(queue.front());

    // if queue item has already been added to a region, dequeue and skip to next iteration
    if (addedToRegion.has(startCoordsKey)) {
      queue.dequeue();
      continue;
    }

    let region = new Set();
    let regionType = grid[startCoords.row][startCoords.col];

    let area = 0;
    let perimeter = 0;

    // DFS
    const stack = [startCoordsKey];

    while (stack.length > 0) {
      const plotKey = stack.pop();
      const plot = JSON.parse(plotKey);
      const plotType = grid[plot.row][plot.col];

      // if type doesn't belong in current region
      // and plot hasn't already been added to a region
      // add to queue for future region checks

      // Get plots adjacent to current plot
      let numAdjacentPlots = 0;
      const adjacentPlots = getAllAdjacentCoords(grid, plot.row, plot.col);

      if (adjacentPlots.length > 0) {
        for (let i = 0; i < adjacentPlots.length; i++) {
          let ap = adjacentPlots[i];
          let ap_key = JSON.stringify(ap);
          let ap_type = grid[ap.row][ap.col];

          if (ap_type === regionType) {
            numAdjacentPlots += 1;
            if (!region.has(ap_key) && !stack.includes(ap_key)) {
              // add adj plot to stack if it's in the region & hasn't been counted yet
              stack.push(ap_key);
            }
          } else if (!addedToRegion.has(ap_key) && !queued.has(ap_key)) {
            // add adj plot to queue if not in region & hasn't been added to one yet
            queue.enqueue(ap_key);
            queued.add(ap_key);
          }
        }
      }

      // Process the current plot if it isn't already in the region
      region.add(plotKey);
      addedToRegion.add(plotKey);
      area += 1;
      perimeter += 4 - numAdjacentPlots;
    }
    // store the current region's data
    regions.set(regionKey, area * perimeter);
    regionKey += 1;
    queue.dequeue();
  }
  return regions;
};

exports.partOne = async (input) => {
  const regions = exports.generateRegions(input);
  const prices = Array.from(regions.values());
  return sum(prices);
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataregion = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day12Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataregion);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      // await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
