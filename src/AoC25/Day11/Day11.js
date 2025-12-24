const { getData, Graph } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2025/day/11

// DAY=11 npm run 2025
const formatData = async (filepath) => {
  const data = await getData(filepath);

  let serverRack = new Map();

  const splitData = data.split('\n');

  for (const row of splitData) {
    let splitRow = row.split(':');
    serverRack.set(splitRow[0], splitRow[1].split(' ').filter(Boolean));
  }

  return serverRack;
};

// Part One

// https://www.geeksforgeeks.org/dsa/count-possible-paths-two-vertices/

const partOne = async (input) => {
  let numPaths = 0;

  let visited = new Map();

  const dfs = (node) => {
    // If destination is reached,
    // increment count
    if (node === 'out') {
      numPaths++;
      return;
    }

    // Mark current node as visited
    visited.set(node, true);

    // Explore all unvisited neighbors
    for (let neighbor of input.get(node)) {
      if (!visited.get(neighbor)) {
        dfs(neighbor);
      }
    }

    // Backtrack: unmark the node
    // before returning
    visited.set(node, false);
  };

  dfs('you');

  return numPaths;
};

// Part Two
const partTwo = async (input) => {
  return input;
};

const solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day11Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      //await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 11');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

solve();

module.exports = {
  solve,
  formatData,
  partOne,
  partTwo,
};
