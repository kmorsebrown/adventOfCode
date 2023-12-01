const fs = require('fs');
const path = require('path');
const { getData } = require('../../globalFunctions.js');

// https://adventofcode.com/2022/day/06

async function formatData(filepath) {
  const data = await getData(filepath);
  return data;
}

const MARKER_LENGTH = {
  startOfPacket: 4,
  startOfMessage: 14,
};

async function getNumCharactersProcessed(input, markerType) {
  let markerLength = MARKER_LENGTH[markerType];

  const tempArr = [];

  let i = 0;
  // let sopMarker;

  while (i < input.length) {
    if (tempArr.length < markerLength) {
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

async function runDay06() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day06Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await getNumCharactersProcessed(formattedData, 'startOfPacket'),
      await getNumCharactersProcessed(formattedData, 'startOfMessage'),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getNumCharactersProcessed,
  runDay06,
};
