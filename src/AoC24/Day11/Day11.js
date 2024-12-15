const { getData, Queue } = require('../../Utils/globalFunctions.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/11

// DAY=11 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const array = data.split(' ');
  const stones = new Map();
  for (let i = 0; i < array.length; i++) {
    stones.set(array[i], 1);
  }
  return stones;
};

// Part One

exports.transformStone = (stone) => {
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
};
exports.transformStones = (stones = new Map()) => {
  const transformedStones = new Map();

  for (const [stone, numStones] of stones) {
    let newStones = exports.transformStone(stone);
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
};

exports.blink = (input, blinks) => {
  const queue = new Queue();
  let blink = 0;
  let result;

  queue.enqueue(input);

  while (!queue.isEmpty()) {
    blink += 1;
    const stones = queue.front();
    const transformedStones = exports.transformStones(stones);
    if (blink < blinks) {
      queue.enqueue(transformedStones);
    } else {
      result = transformedStones;
    }
    queue.dequeue();
  }
  return result;
};

exports.partOne = async (input, blinks) => {
  const transformedStones = exports.blink(input, blinks);
  return sum(Array.from(transformedStones.values()));
};

// Part Two

exports.partTwo = async (input, blinks) => {
  const result = await exports.partOne(input, blinks);
  return result;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day11Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData, 25),
      await exports.partTwo(formattedData, 75),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
