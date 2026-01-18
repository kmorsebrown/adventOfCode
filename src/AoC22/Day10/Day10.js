import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2022/day/10

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n');
  return splitData;
}

function getAddxNum(command) {
  const tempArr = command.split(' ');
  return Number(tempArr[1]);
}

// Part One

async function getCycleMap(input) {
  let cycle = 1;
  let X = 1;
  let xMap = new Map();

  for (let i = 0; i < input.length; i++) {
    if (input[i] === 'noop') {
      // cycle start
      xMap.set(cycle, X);
      // cycle end
      cycle++;
    } else {
      // cycle start
      xMap.set(cycle, X);
      // cycle end
      cycle++;
      // cycle start
      xMap.set(cycle, X);
      let addx = getAddxNum(input[i]);
      // cycle end
      cycle++;
      X = X + addx;
    }
  }

  return xMap;
}

async function partOne(input) {
  let xMap = await getCycleMap(input);
  const lastCycle = [...xMap.keys()].pop();
  let cycle = 20;
  let signalStrengthArr = [];

  while (cycle <= lastCycle) {
    let signalStrength = cycle * xMap.get(cycle);
    signalStrengthArr.push(signalStrength);
    cycle = cycle + 40;
  }
  return signalStrengthArr.reduce((a, b) => a + b, 0);
}

// Part Two
const ROW_END_CYCLE_NUMS = [40, 80, 120, 160, 200];
async function partTwo(input) {
  let xMap = await getCycleMap(input);
  const lastCycle = [...xMap.keys()].pop();
  let cycle = 1;
  let pixel = 0;
  let render = '\n';
  while (cycle <= lastCycle) {
    let X = xMap.get(cycle);
    let spriteArr = [X - 1, X, X + 1];

    if (spriteArr.includes(pixel)) {
      render = render + '#';
    } else {
      render = render + '.';
    }

    if (ROW_END_CYCLE_NUMS.includes(cycle)) {
      render = render + '\n';
      pixel = 0;
    } else {
      pixel++;
    }
    cycle++;
  }
  return render;
}

async function solve() {
  const dataPath = new URL(
    '../puzzleInputs/Day10Input.txt',
    import.meta.url
  ).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export { formatData, getAddxNum, getCycleMap, partOne, partTwo, solve };
