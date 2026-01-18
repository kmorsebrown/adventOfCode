import { getData, Queue } from '../../Utils/globalFunctions.js';
import { createSolver } from '../../Utils/createSolver.js';

// https://adventofcode.com/2025/day/1

// DAY=1 npm run 2025
async function formatData(filepath) {
  const data = await getData(filepath);
  let dataArr = data.split('\n').filter(String);
  return dataArr;
}

// Part One
/*
  count the number of times the dial is left pointing at 0
  after any rotation in the sequence
*/
function rotateDial(start, rotation) {
  const direction = rotation.slice(0, 1);
  const distanceValue = parseInt(rotation.slice(1, rotation.length), 10);

  // Numbers around dial: 0 - 99 in order

  // if direction L, towards lower numbers
  // left from 0 by 1 click = 99
  if (direction === 'L') {
    return validateLeftTurn(start - distanceValue);
  }

  // if direction R, towards higher numbers
  // right from 99 by 1 click = 0

  if (direction === 'R') {
    return validateRightTurn(start + distanceValue);
  }
}

function validateLeftTurn(num) {
  if (num >= 0) {
    return num;
  }
  return validateLeftTurn(100 + num);
}

function validateRightTurn(num) {
  if (num <= 99) {
    return num;
  }
  return validateRightTurn(num - 100);
}

async function partOne(input) {
  let numZeroes = 0;
  let dialPointedAt = 50;

  let queue = new Queue();

  for (let i = 0; i < input.length; i++) {
    queue.enqueue(input[i]);
  }

  while (!queue.isEmpty()) {
    let rotation = queue.front();
    let result = rotateDial(dialPointedAt, rotation);

    if (result === 0) {
      numZeroes += 1;
    }

    dialPointedAt = result;
    queue.dequeue();
  }

  return numZeroes;
}

// Part Two

/*
  count the number of times any click causes the dial to point at 0,
  regardless of whether it happens during a rotation or at the end of one
*/

function validateLeftTurnPt2(startNum, num, zeroCount) {
  if (num > 0) {
    return { dialPointedAt: num, zeroCount: zeroCount };
  }
  if (num === 0) {
    return { dialPointedAt: num, zeroCount: zeroCount + 1 };
  }
  return validateLeftTurnPt2(
    100 + num,
    100 + num,
    startNum === 0 ? zeroCount : zeroCount + 1
  );
}

function validateRightTurnPt2(num, zeroCount) {
  if (num === 0) {
    return { dialPointedAt: num, zeroCount: zeroCount + 1 };
  }
  if (num <= 99) {
    return { dialPointedAt: num, zeroCount: zeroCount };
  }
  return validateRightTurnPt2(
    num - 100,
    num - 100 === 0 ? zeroCount : zeroCount + 1
  );
}

function rotateDialPt2(start, rotation, zeroCount) {
  const direction = rotation.slice(0, 1);
  const distanceValue = parseInt(rotation.slice(1, rotation.length), 10);

  // Numbers around dial: 0 - 99 in order

  // if direction L, towards lower numbers
  // left from 0 by 1 click = 99
  if (direction === 'L') {
    return validateLeftTurnPt2(start, start - distanceValue, zeroCount);
  }

  // if direction R, towards higher numbers
  // right from 99 by 1 click = 0

  if (direction === 'R') {
    return validateRightTurnPt2(start + distanceValue, zeroCount);
  }
}

async function partTwo(input) {
  let numZeroes = 0;
  let dialPointedAt = 50;

  let queue = new Queue();

  for (let i = 0; i < input.length; i++) {
    queue.enqueue(input[i]);
  }

  while (!queue.isEmpty()) {
    let rotation = queue.front();
    let result = rotateDialPt2(dialPointedAt, rotation, numZeroes);

    numZeroes = result.zeroCount;
    dialPointedAt = result.dialPointedAt;

    queue.dequeue();
  }

  return numZeroes;
}

const solve = createSolver(formatData, partOne, partTwo, '01', import.meta.url);

export {
  formatData,
  rotateDial,
  validateLeftTurn,
  validateRightTurn,
  partOne,
  validateLeftTurnPt2,
  validateRightTurnPt2,
  rotateDialPt2,
  partTwo,
  solve,
};

