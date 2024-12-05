const { getData } = require('../../Utils/globalFunctions.js');
const {
  arrayifyGrid,
  rotateOneEighty,
  getAdjacentCoords,
  getValueFromCoords,
} = require('../../Utils/grids.js');

// https://adventofcode.com/2024/day/04

// DAY=4 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  return arrayifyGrid(data.split('\n').filter(String), '');
};

// Part One

/*
  find all instances of the string `XMAS`
  word search allows words to be:

    horizontal

      XMAS..

    vertical

      ..X..
      ..M..
      ..A..
      ..S..

    diagonal

      .X...
      ..M..
      ...A.
      ....S

    written backwards

      .SAMX.

    overlapping other words

      .SAMX.
      ..A...
      ...M..
      ....X.
*/

exports.concatAndValidate = (arr, str) => {
  const stringToCheck = arr.join('');
  return stringToCheck === str;
};

exports.getCoordinatesForAllCases = (two_d_array, str) => {
  let coordinates = [];
  two_d_array.forEach((row, ri) => {
    row.forEach((el, ci) => {
      if (el === str) {
        coordinates.push({
          row: ri,
          col: ci,
        });
      }
    });
  });
  return coordinates;
};

exports.getDirectionsToCheck = ({ width, height, row, col, string }) => {
  let dirArr = [];
  let len = string.length;

  if (col <= width - len) {
    dirArr.push('E');
  }

  if (row <= height - len) {
    dirArr.push('S');
  }

  if (row <= height - len && col <= width - len) {
    dirArr.push('SE');
  }

  if (row >= len - 1 && col <= width - len) {
    dirArr.push('NE');
  }

  return dirArr;
};

exports.getMatches = async (input, word) => {
  const coords = exports.getCoordinatesForAllCases(input, word[0]);
  const width = input[0].length;
  const height = input.length;
  let matches = 0;

  for (let i = 0; i < coords.length; i++) {
    const { row, col } = coords[i];
    const dirsToCheck = exports.getDirectionsToCheck({
      width: width,
      height: height,
      row: row,
      col: col,
      string: word,
    });

    dirsToCheck.forEach((dir) => {
      const wordCoords = [coords[i]];
      const wordToCheck = [getValueFromCoords(input, coords[i])];
      for (let idx = 0; idx < word.length - 1; idx++) {
        const args = {
          width: width,
          height: height,
          row: wordCoords[idx].row,
          col: wordCoords[idx].col,
          dir: dir,
        };
        const adjCoords = getAdjacentCoords(args);
        wordCoords.push(adjCoords);
        wordToCheck.push(getValueFromCoords(input, adjCoords));
      }
      const isMatch = exports.concatAndValidate(wordToCheck, word);
      if (isMatch) {
        matches += 1;
      }
    });
  }
  return matches;
};

exports.partOne = async (input) => {
  const rotatedInput = rotateOneEighty(input);
  const results = await Promise.all([
    await exports.getMatches(input, 'XMAS'),
    await exports.getMatches(rotatedInput, 'XMAS'),
  ]);

  return results[0] + results[1];
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day04Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      //await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
