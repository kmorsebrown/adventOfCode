import { getData, Queue } from '../../Utils/globalFunctions.js';

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
}

// Part One

// https://www.geeksforgeeks.org/dsa/count-possible-paths-two-vertices/
// Approach 1 (Using Depth-First Search)

const partOne = async (input) => {
  let numPaths = 0;

  let visited = new Set();

  const dfs = (node) => {
    // If destination is reached,
    // increment count
    if (node === 'out') {
      numPaths++;
      return;
    }

    // Mark current node as visited
    visited.add(node);

    // Explore all unvisited neighbors
    for (let neighbor of input.get(node)) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    // Backtrack: delete the node
    // before returning so other paths can use it
    visited.delete(node);
  };

  dfs('you');

  return numPaths;
}

// Part Two

// https://www.geeksforgeeks.org/dsa/count-possible-paths-two-vertices/
// Approach 2 (Using Topological Sort)

const getNumPaths = async (
  source,
  sourceWays,
  initQueue,
  baseIndegree,
  baseWays,
  adj,
  destination
) => {
  const ways = new Map([...baseWays]);
  const indegree = new Map([...baseIndegree]);

  // Perform topological sort using Kahn's algorithm

  let queue = new Queue();

  for (const node of initQueue) {
    queue.enqueue(node);
  }

  ways.set(source, sourceWays); // base case: # ways to be at the source

  while (!queue.isEmpty()) {
    let node = queue.front();
    queue.dequeue();
    const neighbors = adj.get(node) || [];

    for (const neighbor of neighbors) {
      ways.set(neighbor, ways.get(neighbor) + ways.get(node));

      indegree.set(neighbor, indegree.get(neighbor) - 1);
      if (indegree.get(neighbor) === 0) {
        queue.enqueue(neighbor);
      }
    }
  }

  return ways.get(destination) || 0;
}

const partTwo = async (adj) => {
  const baseIndegree = new Map();
  const baseWays = new Map();
  const nodes = new Set();

  // Create adjacency list (1-based indexing)
  for (const [device, outputs] of adj) {
    nodes.add(device);
    for (const output of outputs) {
      nodes.add(output);
      baseIndegree.set(output, (baseIndegree.get(output) || 0) + 1);
    }
    if (!baseIndegree.has(device)) baseIndegree.set(device, 0);
  }

  // Perform topological sort using Kahn's algorithm

  let initQueue = [];

  for (const node of nodes) {
    // Map to store the number of ways to reach each node
    // (initialized with 0)
    baseWays.set(node, 0);
    if ((baseIndegree.get(node) || 0) === 0) {
      initQueue.push(node);
    }
  }

  try {
    const [numPathsFromSvrToDac, numPathsFromSvrToFft] = await Promise.all([
      getNumPaths('svr', 1, initQueue, baseIndegree, baseWays, adj, 'dac'),
      getNumPaths('svr', 1, initQueue, baseIndegree, baseWays, adj, 'fft'),
    ]);

    const [numPathsFromDacToFft, numPathsFromFftToDac] = await Promise.all([
      getNumPaths(
        'dac',
        numPathsFromSvrToDac,
        initQueue,
        baseIndegree,
        baseWays,
        adj,
        'fft'
      ),
      getNumPaths(
        'fft',
        numPathsFromSvrToFft,
        initQueue,
        baseIndegree,
        baseWays,
        adj,
        'dac'
      ),
    ]);

    const [numPathsFromFftToOut, numPathsFromDacToOut] = await Promise.all([
      getNumPaths(
        'fft',
        numPathsFromDacToFft,
        initQueue,
        baseIndegree,
        baseWays,
        adj,
        'out'
      ),
      getNumPaths(
        'dac',
        numPathsFromFftToDac,
        initQueue,
        baseIndegree,
        baseWays,
        adj,
        'out'
      ),
    ]);

    return numPathsFromFftToOut + numPathsFromDacToOut;
  } catch (error) {
    // If ANY function fails, the whole thing rejects immediately
    console.error('One of the functions failed', error);
  }
}

const solve = async () => {
  const dataPath = new URL('../../puzzleInputs/Day11Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 11');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();

module.exports = {
  solve,
  formatData,
  partOne,
  getNumPaths,
  partTwo,
}
