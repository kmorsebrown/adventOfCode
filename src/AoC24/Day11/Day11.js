import { getData, Queue } from '../../Utils/globalFunctions.js';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2024/day/11

// DAY=11 npm run 2024
export async function formatData(filepath) {
  const data = await getData(filepath);
  const array = data.split(' ');
  const stones = new Map();
  for (let i = 0; i < array.length; i++) {
    stones.set(array[i], 1);
  }
  return stones;
}

// Part One

export function transformStone(stone) {
  if (stone === '0') {
    // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
    return ['1'];
  } else if (stone.length % 2 === 0) {
    // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.

    // The left half of the digits are engraved on the new left stone
    const leftHalf = stone.slice(0, stone.length / 2);

    // The right half of the digits are engraved on the new right stone.
    const rightHalf = stone.slice(stone.length / 2, stone.length);

    // The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
    return [`${parseInt(leftHalf, 10)}`, `${parseInt(rightHalf, 10)}`];
  } else {
    // If none of the other rules apply, the stone is replaced by a new stone
    // the old stone's number multiplied by 2024 is engraved on the new stone.
    return [`${parseInt(stone, 10) * 2024}`];
  }
}
export function transformStones(stones = new Map()) {
  const transformedStones = new Map();

  for (const [stone, numStones] of stones) {
    let newStones = transformStone(stone);
    newStones.forEach((newStone) => {
      if (transformedStones.has(newStone)) {
        transformedStones.set(
          newStone,
          transformedStones.get(newStone) + numStones
        );
      } else {
        transformedStones.set(newStone, numStones);
      }
    });
  }

  return transformedStones;
}

export function blink(input, blinks) {
  const queue = new Queue();
  let blinkNum = 0;
  let result;

  queue.enqueue(input);

  while (!queue.isEmpty()) {
    blinkNum += 1;
    const stones = queue.front();
    const transformedStones = transformStones(stones);
    if (blinkNum < blinks) {
      queue.enqueue(transformedStones);
    } else {
      result = transformedStones;
    }
    queue.dequeue();
  }
  return result;
}

export async function partOne(input, blinks) {
  const transformedStones = blink(input, blinks);
  return sum(Array.from(transformedStones.values()));
}

// Part Two

export async function partTwo(input, blinks) {
  const result = await partOne(input, blinks);
  return result;
}

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day11Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData, 25),
      await partTwo(formattedData, 75),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

