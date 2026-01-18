import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts } from '../../Utils/parse.js';

// https://adventofcode.com/2023/day/5

export async function formatData(filepath) {
  const data = await getData(filepath);

  let dataMap = new Map();

  data.split('\n\n').forEach((e, idx) => {
    let [key, value] = e.split(':');

    if (idx === 0) {
      value = parseStringOfInts(value, ' ');
    } else {
      key = key.replace(' map', '');
      value = value
        .split('\n')
        .filter((i) => {
          return i !== '';
        })
        .map((str) => parseStringOfInts(str, ' '));

      value = value.map((e) => {
        let [destRngStrt, srcRngStrt, rngLngth] = e;
        return {
          destRngStrt: destRngStrt,
          srcRngStrt: srcRngStrt,
          rngLngth: rngLngth,
        };
      });

      /* Code from Eli's solve for future reference
        In addition to above code:

        value = value.map(m => m.sort((a, b) => a.srcRngStrt - b.srcRngStrt));

      */
    }
    dataMap.set(key, value);
  });

  return dataMap;
}

export function getMappedNum(srcNum, numArr, index) {
  const { destRngStrt, srcRngStrt, rngLngth } = numArr[index];
  if (srcNum >= srcRngStrt && srcNum < srcRngStrt + rngLngth) {
    return destRngStrt + (srcNum - srcRngStrt);
  } else if (index < numArr.length - 1) {
    return getMappedNum(srcNum, numArr, index + 1);
  } else {
    return srcNum;
  }

  /* From Eli's solve for future reference, no longer needs index arg

  for (let range of numArr) {
    if (srcNum >= range.srcRngStrt && srcNum < range.srcRngStrt + range.rngLngth) {
      return range.destRngStrt + (srcNum - range.srcRngStrt);
    }
  }

  return srcNum
  */
}

// Part One
export async function partOne(input) {
  let i = 0;
  let mappedNums = [];

  for (let [key, value] of input) {
    if (key === 'seeds') {
      mappedNums.push(value);
    } else {
      mappedNums.push(
        mappedNums[i].map((num) => getMappedNum(num, value, 0))
      );
      i += 1;
      /* Alt code from Eli's solve for future reference
        Get rid of let i=0 up top and replace contents of this else block with below code

        mappedNums = mappedNums.map(n8m => exports.getMappedNum(num, value))
      */
    }
  }
  return Math.min(...mappedNums.pop());

  /* Alt code from Eli's solve for future reference

    return mappedNums.sort((a, b) {
      if(a < b) { return -1; }
      if(a > b) { return  1; }
      return 0;
    })

  */
}

// Part Two

export function getSeedRanges(array) {
  const seedRanges = [];

  for (let i = 0; i < array.length; i += 2) {
    seedRanges.push([array[i], array[i + 1]]);
  }

  // function* range(start, length) {
  //   const end = start + (length - 1);
  //   yield start;
  //   if (start === end) return;
  //   yield* range(start + 1, length - 1);
  // }

  return seedRanges;
  //.map((pair) => [...range(pair[0], pair[1])]).flat();
}

export function getLocationNum(startNum, input) {
  let currentNum = startNum;
  for (let [key, value] of input) {
    if (key !== 'seeds') {
      currentNum = getMappedNum(currentNum, value, 0);
    }
  }
  return currentNum;
}

export function getLowestLocationNumberInRange(range, input) {
  let [seedId, length] = range;

  let lowestLocationNum;
  let currentSeed = seedId;

  do {
    const locationNum = getLocationNum(currentSeed, input);
    if (
      typeof lowestLocationNum === 'undefined' ||
      locationNum < lowestLocationNum
    ) {
      lowestLocationNum = locationNum;
    }
    currentSeed++;
  } while (currentSeed < seedId + length);

  return lowestLocationNum;
}

export async function partTwo(input) {
  const seedRanges = getSeedRanges(input.get('seeds'));

  let lowestLocationNum;
  seedRanges.forEach((range) => {
    let lowestLocationNumInRange = getLowestLocationNumberInRange(
      range,
      input
    );
    if (
      typeof lowestLocationNum === 'undefined' ||
      lowestLocationNumInRange < lowestLocationNum
    ) {
      lowestLocationNum = lowestLocationNumInRange;
    }
  });
  return lowestLocationNum;
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day05Input.txt', import.meta.url).pathname;

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

// revisit Eli's solution later & see what I can learn from it
// https://github.com/dispatchrabbi/advent-of-code/blob/main/puzzles/2023/5/puzzle.js
