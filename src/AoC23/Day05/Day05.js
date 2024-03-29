const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');

// https://adventofcode.com/2023/day/5

exports.formatData = async (filepath) => {
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
};

exports.getMappedNum = (srcNum, numArr, index) => {
  const { destRngStrt, srcRngStrt, rngLngth } = numArr[index];
  if (srcNum >= srcRngStrt && srcNum < srcRngStrt + rngLngth) {
    return destRngStrt + (srcNum - srcRngStrt);
  } else if (index < numArr.length - 1) {
    return exports.getMappedNum(srcNum, numArr, index + 1);
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
};

// Part One
exports.partOne = async (input) => {
  let i = 0;
  let mappedNums = [];

  for (let [key, value] of input) {
    if (key === 'seeds') {
      mappedNums.push(value);
    } else {
      mappedNums.push(
        mappedNums[i].map((num) => exports.getMappedNum(num, value, 0))
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
};

// Part Two

exports.getSeedRanges = (array) => {
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
};

exports.getLocationNum = (startNum, input) => {
  let currentNum = startNum;
  for (let [key, value] of input) {
    if (key !== 'seeds') {
      currentNum = exports.getMappedNum(currentNum, value, 0);
    }
  }
  return currentNum;
};

exports.getLowestLocationNumberInRange = (range, input) => {
  let [seedId, length] = range;

  let lowestLocationNum;
  let currentSeed = seedId;

  do {
    const locationNum = exports.getLocationNum(currentSeed, input);
    if (
      typeof lowestLocationNum === 'undefined' ||
      locationNum < lowestLocationNum
    ) {
      lowestLocationNum = locationNum;
    }
    currentSeed++;
  } while (currentSeed < seedId + length);

  return lowestLocationNum;
};

exports.partTwo = async (input) => {
  const seedRanges = exports.getSeedRanges(input.get('seeds'));

  let lowestLocationNum;
  seedRanges.forEach((range) => {
    let lowestLocationNumInRange = exports.getLowestLocationNumberInRange(
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
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day05Input.txt'
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

// revisit Eli's solution later & see what I can learn from it
// https://github.com/dispatchrabbi/advent-of-code/blob/main/puzzles/2023/5/puzzle.js
