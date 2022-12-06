const fs = require('fs');
const path = require('path');
const { getData } = require('../../globalFunctions.js');

async function formatData(filepath) {
  const data = await getData(filepath);
  return data;
}

// Part One

async function partOne(input) {
  const tempArr = [];

  let i = 0;
  // let sopMarker;

  while (i < input.length) {
    if (tempArr.length < 4) {
      tempArr.push(input[i]);
    } else {
      const lengthArr = tempArr.map(
        (char) => tempArr.filter((x) => x === char).length
      );
      if (lengthArr.every((x) => x === 1)) {
        // sopMarker = tempArr.join('');
        break;
      } else {
        tempArr.shift();
        tempArr.push(input[i]);
      }
    }
    // if (sopMarker) {
    //   break;
    // }
    i++;
  }
  return i;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay06() {
  const dataPath = path.join(__dirname, 'Day06Input.txt');

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

module.exports = {
  formatData,
  partOne,
  partTwo,
  runDay06,
};
