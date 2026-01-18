import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts } from '../../Utils/parse.js';
import {
  getDistance,
  sortDescending,
  sortAscending,
} from '../../Utils/maths.js';
// https://adventofcode.com/2025/day/8

// DAY=8 npm run 2025
export async function formatData(filepath) {
  const data = await getData(filepath);
  return data.split('\n').map((str) => parseStringOfInts(str, ','));
}

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
}

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
}

// Part Two
/*
The Elves were right; they definitely don't have enough extension cables. You'll need to keep connecting junction boxes together until they're all in one large circuit.

Continuing the above example, the first connection which causes all of the junction boxes to form a single circuit is between the junction boxes at 216,146,977 and 117,168,530. The Elves need to know how far those junction boxes are from the wall so they can pick the right extension cable; multiplying the X coordinates of those two junction boxes (216 and 117) produces 25272.

Continue connecting the closest unconnected pairs of junction boxes together until they're all in the same circuit. What do you get if you multiply together the X coordinates of the last two junction boxes you need to connect?
*/
const partTwo = async (input) => {
  const distanceData = [...getAllDistances(input)].slice(0);

  let circuits = new Map();

  for (const [index, box] of input.entries()) {
    circuits.set(index, [JSON.stringify(box)]);
  }

  const boxesInCircuit = new Set();

  let finalConnection;

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
      boxesInCircuit.add(JSON.stringify(p));
      boxesInCircuit.add(JSON.stringify(q));
    }

    if (boxesInCircuit.size === input.length) {
      finalConnection = [p, q];
      break;
    }
  }

  return finalConnection[0][0] * finalConnection[1][0];
}

const solve = async () => {
  const dataPath = new URL('../puzzleInputs/Day08Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData, 1000),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}


export {
  solve,
  getAllDistances,
  partOne,
  partTwo,
};
