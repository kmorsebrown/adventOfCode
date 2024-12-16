const { getData } = require('../../Utils/globalFunctions.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/13

// DAY=13 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const machines = data.split('\n\n');

  const X_regex = /X\+\d+/g;
  const Y_regex = /Y\+\d+/g;

  return machines.map((machine) => {
    const arrayMachine = machine.split('\n');
    const A_arr = [...arrayMachine[0].matchAll(/\d+/g)];
    const B_arr = [...arrayMachine[1].matchAll(/\d+/g)];
    const P_arr = [...arrayMachine[2].matchAll(/\d+/g)];

    return {
      A: { x: parseInt(A_arr[0][0]), y: parseInt(A_arr[1][0]) },
      B: { x: parseInt(B_arr[0][0]), y: parseInt(B_arr[1][0]) },
      P: { x: parseInt(P_arr[0][0]), y: parseInt(P_arr[1][0]) },
    };
  });
};

const A_TOKENS = 3;
const B_TOKENS = 1;

// Part One

exports.solveAandB = (machine, maxButtonPress) => {
  const AX = machine.A.x,
    BX = machine.B.x,
    PX = machine.P.x;

  const AY = machine.A.y,
    BY = machine.B.y,
    PY = machine.P.y;

  for (let A = 0; A <= maxButtonPress; A++) {
    let B = (PX - AX * A) / BX;
    if (Number.isInteger(B) && B >= 0 && B <= maxButtonPress) {
      if (AY * A + BY * B === PY) {
        return { A: A, B: B };
      }
    }
  }

  return undefined;
};

exports.partOne = async (input) => {
  let results = [];
  input.forEach((machine) => {
    const tokens = exports.solveAandB(machine, 100);
    if (tokens) {
      results.push(tokens.A * A_TOKENS + tokens.B * B_TOKENS);
    }
  });
  return sum(results);
};

// Part Two

exports.solveAandBpt2 = (machine) => {
  const AX = machine.A.x,
    BX = machine.B.x,
    PX = machine.P.x;

  const AY = machine.A.y,
    BY = machine.B.y,
    PY = machine.P.y;

  let A = (PY * BX - BY * PX) / (AY * BX - BY * AX);
  let B = (PX - AX * A) / BX;

  if (Number.isInteger(A) && A >= 0 && Number.isInteger(B) && B >= 0) {
    return { A: A, B: B };
  }

  return undefined;
};

exports.partTwo = async (input) => {
  let results = [];
  input.forEach((machine) => {
    machine.P.x += 10000000000000;
    machine.P.y += 10000000000000;

    const tokens = exports.solveAandBpt2(machine);
    if (tokens) {
      results.push(tokens.A * A_TOKENS + tokens.B * B_TOKENS);
    }
  });
  return sum(results);
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day13Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
