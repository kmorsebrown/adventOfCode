const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

// https://adventofcode.com/2021/day/3

async function formatData(filepath) {
  const data = await getData(filepath);
  const formattedData = data.split(/\r?\n/);
  return formattedData;
}

// Part One

async function getPowerConsumption(input) {
  let binaryGammaRate;
  let binaryEpsilonRate;

  for (var d = 1; d <= input[0].length; d++) {
    let start = d - 1;
    let stop = d;
    let numOnes = 0;
    let numZeroes = 0;
    for (var i = 0; i < input.length; i++) {
      if (input[i].slice(start, stop) === '0') {
        numZeroes += 1;
      } else if (input[i].slice(start, stop) === '1') {
        numOnes += 1;
      }
    }

    if (d === 1) {
      if (numOnes > numZeroes) {
        binaryGammaRate = '1';
        binaryEpsilonRate = '0';
      } else {
        binaryGammaRate = '0';
        binaryEpsilonRate = '1';
      }
    } else {
      if (numOnes > numZeroes) {
        binaryGammaRate = binaryGammaRate + '1';
        binaryEpsilonRate = binaryEpsilonRate + '0';
      } else {
        binaryGammaRate = binaryGammaRate + '0';
        binaryEpsilonRate = binaryEpsilonRate + '1';
      }
    }
  }

  const decimalGammaRate = parseInt(binaryGammaRate, 2);
  const decimalEpsilonRate = parseInt(binaryEpsilonRate, 2);

  return decimalGammaRate * decimalEpsilonRate;
}

// Part Two
async function getLifeSupportRating(input) {
  let oxGenArray = [];
  let co2ScrubArray = [];

  for (var d = 1; d <= input[0].length; d++) {
    let start = d - 1;
    let stop = d;
    let oxTempArray = [];
    let co2TempArray = [];

    if (d === 1) {
      let numOnes = 0;
      let numZeroes = 0;

      for (var i = 0; i < input.length; i++) {
        if (input[i].slice(start, stop) === '0') {
          numZeroes += 1;
        } else if (input[i].slice(start, stop) === '1') {
          numOnes += 1;
        }
      }
      // console.log('Ones: ' + numOnes + ', Zeroes: ' + numZeroes);

      for (var i = 0; i < input.length; i++) {
        if (numOnes >= numZeroes) {
          if (input[i].slice(start, stop) === '1') {
            oxTempArray.push(input[i]);
          } else {
            co2TempArray.push(input[i]);
          }
        } else {
          if (input[i].slice(start, stop) === '0') {
            oxTempArray.push(input[i]);
          } else {
            co2TempArray.push(input[i]);
          }
        }
      }
      oxGenArray = oxTempArray;
      co2ScrubArray = co2TempArray;
    } else {
      let oxNumOnes = 0;
      let oxNumZeroes = 0;
      let co2NumOnes = 0;
      let co2NumZeroes = 0;

      if (oxGenArray.length > 1) {
        for (var i = 0; i < oxGenArray.length; i++) {
          if (oxGenArray[i].slice(start, stop) === '0') {
            oxNumZeroes += 1;
          } else if (oxGenArray[i].slice(start, stop) === '1') {
            oxNumOnes += 1;
          }
        }

        for (var i = 0; i < oxGenArray.length; i++) {
          if (oxNumOnes >= oxNumZeroes) {
            if (oxGenArray[i].slice(start, stop) === '1') {
              oxTempArray.push(oxGenArray[i]);
            }
          } else {
            if (oxGenArray[i].slice(start, stop) === '0') {
              oxTempArray.push(oxGenArray[i]);
            }
          }
        }

        oxGenArray = oxTempArray;
      }

      if (co2ScrubArray.length > 1) {
        for (var i = 0; i < co2ScrubArray.length; i++) {
          if (co2ScrubArray[i].slice(start, stop) === '0') {
            co2NumZeroes += 1;
          } else if (co2ScrubArray[i].slice(start, stop) === '1') {
            co2NumOnes += 1;
          }
        }

        for (var i = 0; i < co2ScrubArray.length; i++) {
          if (co2NumOnes >= co2NumZeroes) {
            if (co2ScrubArray[i].slice(start, stop) === '0') {
              co2TempArray.push(co2ScrubArray[i]);
            }
          } else {
            if (co2ScrubArray[i].slice(start, stop) === '1') {
              co2TempArray.push(co2ScrubArray[i]);
            }
          }
        }
        co2ScrubArray = co2TempArray;
      }
    }
  }

  const oxGenRating = parseInt(oxGenArray[0], 2);
  const co2ScrubRating = parseInt(co2ScrubArray[0], 2);

  return oxGenRating * co2ScrubRating;
}

async function runDay03() {
  const dataPath = require.resolve(
    '../../../src/AoC21/puzzleInputs/Day01Input.txt'
  );

  try {
    const input = await formatData(dataPath);
    const results = await Promise.all([
      await getPowerConsumption(input),
      await getLifeSupportRating(input),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getPowerConsumption,
  getLifeSupportRating,
  runDay03,
};

//Post-solve refactor with help from Kevin Talley :)

/*

Part One:

let tempCounts = [
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
  { zero: 0, one: 0 },
];

// loop over each number in the array with .forEach()
numbers.forEach((n) => {
    // loop over each digit in that number using the for()
    for (let i = 0; i < 12; i++) {
        // compare the digit to one or zero with n[i]
        if (n[i] === '1') {
            tempCounts[i].one++;
        } else {
             tempCounts[i].zero++;
        }
    }
});

When looking at a string. you can get each character via it’s index. so number[5] will tell me the sixth digit in the number (zero-based indexing) JS looks at a string as an array of characters

Part Two WIP:

another thing i noticed was how you accessed each character/digit. you can access them more easily by using an index vs. slice
co2ScrubArray[i].slice(start,stop) === co2ScrubArray[i][d-1]
*/
