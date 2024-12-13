const { getData, Queue } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2024/day/11

// DAY=11 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split(' ');
};

// Part One

/**
 *
 * @param {string[]} stones
 */
exports.transformStones = (stones) => {
  const queue = new Queue();
  const transformedStones = [];
  for (let i = 0; i < stones.length; i++) {
    queue.enqueue(stones[i]);
  }

  while (!queue.isEmpty()) {
    const stone = queue.front();
    let transformedStone = [];

    if (stone === '0') {
      // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
      transformedStone.push('1');
    } else if (stone.length % 2 === 0) {
      // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.

      // The left half of the digits are engraved on the new left stone
      const leftHalf = stone.slice(0, stone.length / 2);

      // The right half of the digits are engraved on the new right stone.
      const rightHalf = stone.slice(stone.length / 2, stone.length);

      // The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
      transformedStone.push(`${parseInt(leftHalf, 10)}`);
      transformedStone.push(`${parseInt(rightHalf, 10)}`);
    } else {
      // If none of the other rules apply, the stone is replaced by a new stone
      // the old stone's number multiplied by 2024 is engraved on the new stone.
      transformedStone.push(`${parseInt(stone, 10) * 2024}`);
    }

    transformedStones.push(...transformedStone);
    queue.dequeue();
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
    console.log(`blink ${blink}`);
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
  return transformedStones.length;
};

// Part Two

exports.partTwo = async (input, blinks) => {
  let numStones = 0;
  for (let i = 0; i < input.length; i++) {
    console.log(`Stone ${i}`);
    numStones += exports.blink([input[i]], blinks).length;
    console.log(`After stone ${i} > ${numStones} stones`);
  }
  return numStones;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day11Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      // await exports.partOne(formattedData, 25),
      await exports.partTwo(formattedData, 75),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
