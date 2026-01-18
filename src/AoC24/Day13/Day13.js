import { getData } from '../../Utils/globalFunctions.js';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2024/day/13

// DAY=13 npm run 2024
export async function formatData(filepath) {
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
}

const A_TOKENS = 3;
const B_TOKENS = 1;

// Part One

export function solveAandB(machine, maxButtonPress) {
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
}

export async function partOne(input) {
  let results = [];
  input.forEach((machine) => {
    const tokens = solveAandB(machine, 100);
    if (tokens) {
      results.push(tokens.A * A_TOKENS + tokens.B * B_TOKENS);
    }
  });
  return sum(results);
}

// Part Two

export function solveAandBpt2(machine) {
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
}

export async function partTwo(input) {
  let results = [];
  input.forEach((machine) => {
    machine.P.x += 10000000000000;
    machine.P.y += 10000000000000;

    const tokens = solveAandBpt2(machine);
    if (tokens) {
      results.push(tokens.A * A_TOKENS + tokens.B * B_TOKENS);
    }
  });
  return sum(results);
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day13Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
