const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n').map((row) => {
    let tempArr = [];
    row.split('').forEach((i) => {
      if (i === 'S') {
        tempArr.push(1);
      } else if (i === 'E') {
        tempArr.push(26);
      } else {
        tempArr.push(i.charCodeAt(0) - 96);
      }
    });
    return tempArr;
  });
  return splitData;
}

async function getCoords(filepath, char) {
  const data = await getData(filepath);
  const splitData = data.split('\n');
  let row;
  let col;
  splitData.forEach((str, index) => {
    if (str.includes(char)) {
      row = index;
      col = str.indexOf(char);
    }
  });

  return { x: row, y: col };
}

// Part One

async function partOne(input) {
  return input;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay12() {
  const dataPath = path.join(__dirname, 'Day12Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const start = await getCoords(dataPath, 'S');
    const end = await getCoords(dataPath, 'E');
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
  getCoords,
  partOne,
  partTwo,
  runDay12,
};
