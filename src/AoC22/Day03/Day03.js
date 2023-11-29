const fs = require('fs');
const path = require('path');
const { getData } = require('../../globalFunctions.js');

async function formatData(filepath) {
  const data = await getData(filepath);
  const arrayOfStrings = data.split('\n').filter(String);
  return arrayOfStrings;
}

// Part One

async function findDupLetters(rucksackArr) {
  const rucksackCompArr = rucksackArr.map((rucksack) => {
    const rucksackSize = rucksack.length;
    const compSize = rucksackSize / 2;
    return [
      rucksack.slice(0, compSize),
      rucksack.slice(compSize, rucksackSize),
    ];
  });
  const dupArr = rucksackCompArr.map((rucksack) => {
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

async function getPrioritySum(dupItems) {
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
async function getGroups(input) {
  const newArr = [];
  let i = 0;
  do {
    newArr.push(input.slice(i, i + 3));
    i = i + 3;
  } while (newArr.length < input.length / 3);
  return newArr;
}

async function getBadges(rucksackGroups) {
  const badgeArr = rucksackGroups.map((rucksackGroup) => {
    let i = 0;
    let foundBadge = false;
    let badgeLetter = '';
    do {
      const item = Array.from(rucksackGroup[0])[i];
      if (rucksackGroup[1].includes(item) && rucksackGroup[2].includes(item)) {
        foundBadge = true;
        badgeLetter = item;
      } else {
        i++;
      }
    } while (!foundBadge);
    return badgeLetter;
  });

  return badgeArr;
}

async function runDay03() {
  const dataPath = path.join(__dirname, 'Day03Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const dupArr = await findDupLetters(formattedData);
    const groups = await getGroups(formattedData);
    const badgeArr = await getBadges(groups);
    const results = await Promise.all([
      await getPrioritySum(dupArr),
      await getPrioritySum(badgeArr),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  findDupLetters,
  getPrioritySum,
  getGroups,
  getBadges,
  runDay03,
};
