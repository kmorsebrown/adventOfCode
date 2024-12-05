const { getData } = require('../../Utils/globalFunctions.js');
const {
  arrayifyGrid,
  rotateOneEighty,
  transpose,
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
    vertical
    diagonal
    written backwards
    overlapping other words
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

exports.getPartOneMatches = async (input, word) => {
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
    await exports.getPartOneMatches(input, 'XMAS'),
    await exports.getPartOneMatches(rotatedInput, 'XMAS'),
  ]);

  return results[0] + results[1];
};

// Part Two

/*
  find all instances of the string `MAS` in the shape of an X

    M_S      S_M
    _A_  or  _A_
    M_S      S_M

    M_M      S_S
    _A_  or  _A_
    S_S      M_M
*/

exports.removeSides = (input) => {
  let newGrid = JSON.parse(JSON.stringify(input));

  newGrid.pop();
  newGrid.shift();

  newGrid = transpose(newGrid);

  newGrid.pop();
  newGrid.shift();

  newGrid = transpose(newGrid);

  return newGrid;
};

exports.partTwo = async (input, word) => {
  const width = input[0].length;
  const height = input.length;
  const reverseWord = word.split('').reverse().join('');

  let matches = 0;

  const coords = exports
    .getCoordinatesForAllCases(exports.removeSides(input), 'A')
    .map((el) => {
      return {
        row: el.row + 1,
        col: el.col + 1,
      };
    });

  for (let i = 0; i < coords.length; i++) {
    const { row, col } = coords[i];

    const args = {
      width: width,
      height: height,
      row: coords[i].row,
      col: coords[i].col,
    };

    const wordCoords = {
      NW: getAdjacentCoords({ ...args, dir: 'NW' }),
      SW: getAdjacentCoords({ ...args, dir: 'SW' }),
      NE: getAdjacentCoords({ ...args, dir: 'NE' }),
      SE: getAdjacentCoords({ ...args, dir: 'SE' }),
    };

    const NE2SW = [getValueFromCoords(input, coords[i])];
    const SE2NW = [getValueFromCoords(input, coords[i])];

    NE2SW.push(getValueFromCoords(input, wordCoords.SW));
    NE2SW.unshift(getValueFromCoords(input, wordCoords.NE));

    SE2NW.push(getValueFromCoords(input, wordCoords.NW));
    SE2NW.unshift(getValueFromCoords(input, wordCoords.SE));

    const NE2SW_isMatch =
      exports.concatAndValidate(NE2SW, word) ||
      exports.concatAndValidate(NE2SW, reverseWord);
    const SE2NW_isMatch =
      exports.concatAndValidate(SE2NW, word) ||
      exports.concatAndValidate(SE2NW, reverseWord);

    if (NE2SW_isMatch && SE2NW_isMatch) {
      matches += 1;
    }
  }
  return matches;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day04Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData, 'MAS'),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
