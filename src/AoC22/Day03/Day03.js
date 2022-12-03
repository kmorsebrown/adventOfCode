const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function formatData(filepath) {
  const data = await getData(filepath);
  const arrayOfStrings = data.split('\n').filter(String);
  const rucksackArr = arrayOfStrings.map((rucksack) => {
    const rucksackSize = rucksack.length;
    const compSize = rucksackSize / 2;
    return [
      rucksack.slice(0, compSize),
      rucksack.slice(compSize, rucksackSize),
    ];
  });
  return rucksackArr;
}

// Part One

async function findDupLetters(rucksackArr) {
  const dupArr = rucksackArr.map((rucksack) => {
    let i = 0;
    let foundDup = false;
    let dupLetter = '';

    do {
      const item = Array.from(rucksack[0])[i];
      const expression = `.*${item}.*`;
      const re = new RegExp(expression, 'g');
      foundDup = re.test(rucksack[1]);
      if (foundDup) {
        dupLetter = item;
      } else {
        i++;
      }
    } while (!foundDup);
    return dupLetter;
  });

  return dupArr;
}

async function getDupPrioritySum(dupItems) {
  // a thru z have priorities 1 - 26 and char codes 97 - 122
  // A thru Z have priorities 27 - 52 and char codes 65 - 90
  const dupPriorityArr = dupItems.map((letter) => {
    if (letter.charCodeAt(0) < 97) {
      return letter.charCodeAt(0) - 38;
    } else {
      return letter.charCodeAt(0) - 96;
    }
  });

  return dupPriorityArr.reduce((a, b) => a + b, 0);
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay03() {
  const dataPath = path.join(__dirname, 'Day03Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const dupArr = await findDupLetters(formattedData);
    const results = await Promise.all([
      await getDupPrioritySum(dupArr),
      //await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  findDupLetters,
  getDupPrioritySum,
  partTwo,
  runDay03,
};
