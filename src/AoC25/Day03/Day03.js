const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts, unique } = require('../../Utils/parse.js');
const { sum, sortDescending } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/03

// DAY=03 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n');
};

//

/*
  each battery: joltage rating 1 - 9
  1 line = bank of batteries
  For each bank, turn on exactly two batteries
  Bank joltage = to the number formed by the digits on the batteries you've turned on
  ex: bank 12345 w/ 2 & 4 turned on produces 24 jolts
  
  you cannot rearrange the batteries

  Find the largest possible joltage each bank can produce
*/

// Part One

exports.findMaxJoltage = (bank, numBatteriesToTurnOn) => {
  // find unique joltages in bank and arrange from highest to lowest
  const uniqueJoltages = sortDescending(unique(parseStringOfInts(bank, '')));

  const onBatteries = [];
  let indexOfLastTurnedOnBattery;
  let remainingToTurnOn = numBatteriesToTurnOn;

  while (remainingToTurnOn > 0) {
    // loop through all joltages for each battery that needs to be turned on
    for (const joltage of uniqueJoltages) {
      let indexOfFirst;

      if (typeof indexOfLastTurnedOnBattery === 'undefined') {
        // find the first instance of that joltage in the bank
        indexOfFirst = bank.indexOf(joltage);
      } else {
        // find the first instance of that joltage in the bank
        // after the given index
        indexOfFirst = bank.indexOf(joltage, indexOfLastTurnedOnBattery + 1);
      }

      // continue to next joltage if there isn't a
      // battery of the given joltage isn't in the bank
      // after the last turned on battery
      if (indexOfFirst === -1) {
        continue;
      }

      // continue to next joltage if too close to the end of the bank
      // to turn on all batteries after it
      if (indexOfFirst > bank.length - remainingToTurnOn) {
        continue;
      }

      // turn on battery and stop joltage loop
      onBatteries.push(joltage);
      remainingToTurnOn -= 1;
      indexOfLastTurnedOnBattery = indexOfFirst;
      break;
    }
  }

  return parseInt(onBatteries.join(''));
};
exports.partOne = async (input) => {
  return sum(input.map((bank) => exports.findMaxJoltage(bank, 2)));
};

// Part Two
exports.partTwo = async (input) => {
  return sum(input.map((bank) => exports.findMaxJoltage(bank, 12)));
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day03Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 03');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
