const { getData, Queue } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2025/day/1

// DAY=1 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  let dataArr = data.split('\n').filter(String);
  return dataArr;
};

// Part One
/*
  count the number of times the dial is left pointing at 0
  after any rotation in the sequence
*/
exports.rotateDial = (start, rotation) => {
  const direction = rotation.slice(0, 1);
  const distanceValue = parseInt(rotation.slice(1, rotation.length), 10);

  // Numbers around dial: 0 - 99 in order

  // if direction L, towards lower numbers
  // left from 0 by 1 click = 99
  if (direction === 'L') {
    return exports.validateLeftTurn(start - distanceValue);
  }

  // if direction R, towards higher numbers
  // right from 99 by 1 click = 0

  if (direction === 'R') {
    return exports.validateRightTurn(start + distanceValue);
  }
};

exports.validateLeftTurn = (num) => {
  if (num >= 0) {
    return num;
  }
  return exports.validateLeftTurn(100 + num);
};

exports.validateRightTurn = (num) => {
  if (num <= 99) {
    return num;
  }
  return exports.validateRightTurn(num - 100);
};

exports.partOne = async (input) => {
  let numZeroes = 0;
  let dialPointedAt = 50;

  let queue = new Queue();

  for (let i = 0; i < input.length; i++) {
    queue.enqueue(input[i]);
  }

  while (!queue.isEmpty()) {
    let rotation = queue.front();
    let result = exports.rotateDial(dialPointedAt, rotation);

    if (result === 0) {
      numZeroes += 1;
    }

    dialPointedAt = result;
    queue.dequeue();
  }

  return numZeroes;
};

// Part Two

/*
  count the number of times any click causes the dial to point at 0,
  regardless of whether it happens during a rotation or at the end of one
*/

exports.validateLeftTurnPt2 = (startNum, num, zeroCount) => {
  if (num > 0) {
    return { dialPointedAt: num, zeroCount: zeroCount };
  }
  if (num === 0) {
    return { dialPointedAt: num, zeroCount: zeroCount + 1 };
  }
  return exports.validateLeftTurnPt2(
    100 + num,
    100 + num,
    startNum === 0 ? zeroCount : zeroCount + 1
  );
};

exports.validateRightTurnPt2 = (num, zeroCount) => {
  if (num === 0) {
    return { dialPointedAt: num, zeroCount: zeroCount + 1 };
  }
  if (num <= 99) {
    return { dialPointedAt: num, zeroCount: zeroCount };
  }
  return exports.validateRightTurnPt2(
    num - 100,
    num - 100 === 0 ? zeroCount : zeroCount + 1
  );
};

exports.rotateDialPt2 = (start, rotation, zeroCount) => {
  const direction = rotation.slice(0, 1);
  const distanceValue = parseInt(rotation.slice(1, rotation.length), 10);

  // Numbers around dial: 0 - 99 in order

  // if direction L, towards lower numbers
  // left from 0 by 1 click = 99
  if (direction === 'L') {
    return exports.validateLeftTurnPt2(start, start - distanceValue, zeroCount);
  }

  // if direction R, towards higher numbers
  // right from 99 by 1 click = 0

  if (direction === 'R') {
    return exports.validateRightTurnPt2(start + distanceValue, zeroCount);
  }
};

exports.partTwo = async (input) => {
  let numZeroes = 0;
  let dialPointedAt = 50;

  let queue = new Queue();

  for (let i = 0; i < input.length; i++) {
    queue.enqueue(input[i]);
  }

  while (!queue.isEmpty()) {
    let rotation = queue.front();
    let result = exports.rotateDialPt2(dialPointedAt, rotation, numZeroes);

    numZeroes = result.zeroCount;
    dialPointedAt = result.dialPointedAt;

    queue.dequeue();
  }

  return numZeroes;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day01Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 01');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
