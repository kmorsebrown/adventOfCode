const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { getDistance, sortDescending } = require('../../Utils/maths.js');
// https://adventofcode.com/2025/day/8

// DAY=8 npm run 2025
const formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n').map((str) => parseStringOfInts(str, ','));
};

// Part One
const getAllDistances = (points) => {
  const checkedPairs = new Set();
  let distances = [];

  for (const point1 of points) {
    for (const point2 of points) {
      // skip to next comparison if both points are the same
      if (point1 === point2) {
        continue;
      }

      // skip to next comparison if distance between points has already been measured
      if (
        checkedPairs.has(
          `${JSON.stringify(point1)}-${JSON.stringify(point2)}`
        ) ||
        checkedPairs.has(`${JSON.stringify(point2)}-${JSON.stringify(point1)}`)
      ) {
        continue;
      }

      distances.push({
        pq: [point1, point2],
        dist: getDistance(point1, point2),
      });
      checkedPairs.add(`${JSON.stringify(point1)}-${JSON.stringify(point2)}`);
    }
  }
  return distances.sort((a, b) => {
    if (a.dist < b.dist) {
      return -1;
    }
    if (a.dist > b.dist) {
      return 1;
    }
    return 0;
  });
};

const partOne = async (input, numConnections) => {
  const distanceData = [...getAllDistances(input)].slice(0, numConnections);

  let circuits = new Map();

  for (const [index, point] of input.entries()) {
    circuits.set(index, [JSON.stringify(point)]);
  }

  for (const distance of distanceData) {
    let p = distance.pq[0];
    let q = distance.pq[1];

    let circuitsArray = Array.from(circuits.entries());

    // check if either p or q is already in a circuit
    const circuitContainingP = circuitsArray.find(([_key, value]) =>
      value.includes(JSON.stringify(p))
    )?.[0];
    const circuitContainingQ = circuitsArray.find(([_key, value]) =>
      value.includes(JSON.stringify(q))
    )?.[0];

    if (circuitContainingP === circuitContainingQ) {
      // if in the same circuit, continue without doing anything
      continue;
    } else {
      // if in different circuits, combine the circuits
      let newCircuit = [
        ...circuits.get(circuitContainingP),
        ...circuits.get(circuitContainingQ),
      ];
      circuits.set(circuitContainingP, newCircuit);
      circuits.delete(circuitContainingQ);
    }
  }

  const topThreeCircuits = sortDescending(
    [...circuits.values()].map((circuit) => circuit.length)
  ).slice(0, 3);

  return topThreeCircuits.reduce((a, b) => a * b);
};

// Part Two
const partTwo = async (input) => {
  return input;
};

const solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day08Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData, 1000),
      // await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 08');
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
  getAllDistances,
  partOne,
  partTwo,
};
