import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2023/day/8
export async function getDirections(filepath) {
  const data = await getData(filepath);
  return data.split('\n\n').shift();
};
1;
export async function formatData(filepath) {
  let data = await getData(filepath);
  data = data.split('\n\n').pop();
  data = data.replace(/[()]+/g, '').split('\n');

  let formattedData = {};
  data.forEach((e) => {
    let [key, value] = e.split('=');
    let [L, R] = value.split(',');
    formattedData[key.trim()] = { L: L.trim(), R: R.trim() };
  });
  return formattedData;
};

// Part One

export async function partOne(instrux, nodes) {
  let currentNode = 'AAA';
  let steps = 0;
  let i = 0;

  while (currentNode != 'ZZZ') {
    // if you run out of left/right instructions, repeat whole sequence as necessary
    if (i === instrux.length) {
      i = 0;
    }

    currentNode = nodes[currentNode][instrux[i]];
    i++;
    steps++;
  }

  return steps;
};

// Part Two

export function calculateLcmForAll(arr) {
  /*
  The Euclidean algorithm is a way to find the greatest common divisor of two positive integers.
  GCD of two numbers is the largest number that divides both of them.
  If we subtract a smaller number from a larger one (we reduce a larger number), GCD doesn't change.
  So if we keep subtracting repeatedly the larger of two, we end up with GCD.
  Now instead of subtraction, if we divide the smaller number, the algorithm stops when we find the remainder 0.
  - https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/
*/

  // Recursive function to return gcd of a and b by aashish1995 from geeksforgeeks.org
  const gcd = (a, b) => {
    // Find Minimum of a and b
    let result = Math.min(a, b);
    while (result > 0) {
      if (a % result == 0 && b % result == 0) {
        break;
      }
      result--;
    }

    // Return gcd of a and b
    return result;
  };
  /*
   LCM (least common multiple) of two number is the smallest number which can be divided by both numbers.
   A simple solution is to find all prime factors of both numbers, 
   then find union of all factors present in both numbers. 
   Finally, return the product of elements in union.
   https://www.geeksforgeeks.org/program-to-find-lcm-of-two-numbers/
  */

  // Function to return LCM of two numbers by Mayank Tyagi from geeksforgeeks.org
  const lcm = (a, b) => {
    return (a / gcd(a, b)) * b;
  };

  // Function to return LCM for more than 2 numbers by AmitDiwan from tutorialspoint.com
  let n = 1;
  for (let i = 0; i < arr.length; i++) {
    n = lcm(arr[i], n);
  }
  return n;
};

export async function partTwo(instrux, nodes) {
  let currentNodes = Object.keys(nodes).filter((node) => node[2] === 'A');
  let steps = 0;
  let i = 0;

  let totalSteps = [];

  currentNodes.forEach((node) => {
    let currentNode = node;
    let steps = 0;
    let i = 0;
    while (currentNode[2] != 'Z') {
      // if you run out of left/right instructions, repeat whole sequence as necessary
      if (i === instrux.length) {
        i = 0;
      }

      currentNode = nodes[currentNode][instrux[i]];
      i++;
      steps++;
    }
    totalSteps.push(steps);
  });

  return calculateLcmForAll(totalSteps);
};

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day08Input.txt', import.meta.url).pathname;

  try {
    const directions = await getDirections(dataPath);
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(directions, formattedData),
      await partTwo(directions, formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

