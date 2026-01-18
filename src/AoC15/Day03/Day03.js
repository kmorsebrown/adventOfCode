import { getData } from '../../Utils/globalFunctions.js';
import { createSolver } from '../../Utils/createSolver.js';
import { isEven } from '../../Utils/maths.js';

// https://adventofcode.com/2015/day/03

// DAY=3 npm run 2015
const formatData = async (filepath) => {
  const data = await getData(filepath);
  return data;
};

// Part One

const partOne = async (input) => {
  const houses = new Map();
  let x = 0;
  let y = 0;
  // gift to starting location
  houses.set('0,0', 1);

  for (const dir of input) {
    switch (dir) {
      case '^':
        y += 1;
        break;
      case 'v':
        y -= 1;
        break;
      case '>':
        x += 1;
        break;
      case '<':
        x -= 1;
        break;
    }
    const houseKey = `${x},${y}`;
    const currentGiftsDelivered = houses.get(houseKey);
    if (currentGiftsDelivered) {
      houses.set(houseKey, currentGiftsDelivered + 1);
    } else {
      houses.set(houseKey, 1);
    }
  }

  return houses.size;
};

// Part Two

const getHouse = (x, y, dir) => {
  switch (dir) {
    case '^':
      y += 1;
      break;
    case 'v':
      y -= 1;
      break;
    case '>':
      x += 1;
      break;
    case '<':
      x -= 1;
      break;
  }
  return { x: x, y: y };
};
const partTwo = async (input) => {
  const houses = new Set();
  let rx = 0;
  let ry = 0;
  let sx = 0;
  let sy = 0;
  // gift to starting location
  houses.add('0,0');

  let i = 1;

  for (const dir of input) {
    if (isEven(i)) {
      const { x, y } = getHouse(rx, ry, dir);
      rx = x;
      ry = y;
      houses.add(`${rx},${ry}`);
    } else {
      const { x, y } = getHouse(sx, sy, dir);
      sx = x;
      sy = y;
      houses.add(`${sx},${sy}`);
    }
    i++;
  }
  return houses.size;
};

const solve = createSolver(formatData, partOne, partTwo, '03', import.meta.url);

export { solve, formatData, partOne, partTwo };
