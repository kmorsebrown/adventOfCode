const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

// https://adventofcode.com/2022/day/12

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n').map((row) => {
    let tempArr = [];
    row.split('').forEach((i) => {
      if (i === 'S') {
        tempArr.push(1);
      } else if (i === 'E') {
        tempArr.push(26);
      } else {
        tempArr.push(i.charCodeAt(0) - 96);
      }
    });
    return tempArr;
  });
  return splitData;
}

async function getCoords(filepath, char) {
  const data = await getData(filepath);
  const splitData = data.split('\n');
  let row;
  let col;
  splitData.forEach((str, index) => {
    if (str.includes(char)) {
      row = index;
      col = str.indexOf(char);
    }
  });

  return `x${col}y${row}`;
}

function checkMove(currentElevation, newElevation = 0) {
  return newElevation - currentElevation < 2 ? true : false;
}

function getPossibleMoves(currentposition, data) {
  const [x, y] = currentposition
    .split(/\D/g)
    .filter(String)
    .map((x) => Number(x));
  const currentElevation = data[y][x];
  let possibleMoves = [];

  // check left
  if (x > 0 && checkMove(currentElevation, data[y][x - 1])) {
    possibleMoves.push(`x${x - 1}y${y}`);
  }

  // check right
  if (x + 1 < data[y].length && checkMove(currentElevation, data[y][x + 1])) {
    possibleMoves.push(`x${x + 1}y${y}`);
  }

  // check up
  if (y > 0 && checkMove(currentElevation, data[y - 1][x])) {
    possibleMoves.push(`x${x}y${y - 1}`);
  }

  // check down
  if (y + 1 < data.length && checkMove(currentElevation, data[y + 1][x])) {
    possibleMoves.push(`x${x}y${y + 1}`);
  }
  return possibleMoves;
}

function generateGraph(input) {
  const graph = {};

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const position = `x${x}y${y}`;
      graph[position] = getPossibleMoves(position, input);
    }
  }
  return graph;
}

// Part One
// modified from https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-dijkstras-algorithm-8d16451eea34
// Incredibly slow

const shortestDistancePosition = (distances, visited) => {
  // create a default value for shortest
  let shortest = null;

  // for each position in the distances object
  for (let position in distances) {
    // if no position has been assigned to shortest yet

    // or if the current position's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[position] < distances[shortest];

    // and if the current position is in the unvisted set
    if (currentIsShortest && !visited.includes(position)) {
      // update shortest to be the current position
      shortest = position;
    }
  }
  return shortest;
};

const findShortestPath = (input, startPosition, endPosition) => {
  // generate graph

  const graph = generateGraph(input);

  // track distances from the start position using a hash object
  let distances = {};
  distances[endPosition] = 'Infinity';
  const startDistances = {};
  graph[startPosition].forEach((child) => (startDistances[child] = 1));
  distances = Object.assign(distances, startDistances);

  // track paths using a hash object
  let parents = { endPosition: null };
  for (const child in graph[startPosition]) {
    parents[child] = startPosition;
  }

  // collect visited positions
  let visited = [];

  // find the nearest position
  let position = shortestDistancePosition(distances, visited);

  // for that position:
  while (position) {
    // find its distance from the start position & its child positions
    let distance = distances[position];
    let children = graph[position];

    // for each of those child positions:
    children.forEach((child) => {
      // make sure each child position is not the start position
      if (String(child) != String(startPosition)) {
        // save the distance from the start position to the child position
        let newDistance = distance + 1;

        // if there's no recorded distance from the start position to the child position in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start position to the child position
        if (!distances[child] || distances[child] > newDistance) {
          // save the distance to the object
          distances[child] = newDistance;
          // record the path
          parents[child] = position;
        }
      }
    });
    // move the current position to the visited set
    visited.push(position);

    // move to the nearest neighbor position
    position = shortestDistancePosition(distances, visited);
  }

  // using the stored paths from start position to end position
  // record the shortest path
  let shortestPath = [endPosition];
  let parent = parents[endPosition];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();
  // return the shortest path from start position to end position & its distance
  let results = {
    distance: distances[endPosition],
    path: shortestPath,
  };
  return results.distance;
};

// Part Two
// DOES NOT WORK YET
async function getStartPoints(input) {
  const startArr = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 1) {
        startArr.push(`x${x}y${y}`);
      }
    }
  }
  return startArr;
}
async function partTwo(input, startArr, endPosition) {
  const results = await Promise.all(
    startArr.map(async (start) => {
      const result = await findShortestPath(input, start, endPosition);
      return result;
    })
  );
  return Math.min(...results);
}

async function runDay12() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day12Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const [start, end /*startArr*/] = await Promise.all([
      await getCoords(dataPath, 'S'),
      await getCoords(dataPath, 'E'),
      // await getStartPoints(formattedData),
    ]);
    const results = await Promise.all([
      await findShortestPath(formattedData, start, end),
      // await partTwo(formattedData, startArr, end),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

runDay12();

module.exports = {
  formatData,
  getCoords,
  getPossibleMoves,
  generateGraph,
  findShortestPath,
  getStartPoints,
  partTwo,
  runDay12,
};
