import { getData } from '../../Utils/globalFunctions.js';
import {
  arrayifyGrid,
  rotateOneEighty,
  transpose,
  getAdjacentCoords,
  getValueFromCoords,
} from '../../Utils/grids.js';

// https://adventofcode.com/2024/day/04

// DAY=4 npm run 2024
export async function formatData(filepath) {
  const data = await getData(filepath);
  return arrayifyGrid(data.split('\n').filter(String), '');
}

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

export function concatAndValidate(arr, str) {
  const stringToCheck = arr.join('');
  return stringToCheck === str;
}

export function getCoordinatesForAllCases(two_d_array, str) {
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
}

export function getDirectionsToCheck({ width, height, row, col, string }) {
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
}

export async function getPartOneMatches(input, word) {
  const coords = getCoordinatesForAllCases(input, word[0]);
  const width = input[0].length;
  const height = input.length;
  let matches = 0;

  for (let i = 0; i < coords.length; i++) {
    const { row, col } = coords[i];
    const dirsToCheck = getDirectionsToCheck({
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
      const isMatch = concatAndValidate(wordToCheck, word);
      if (isMatch) {
        matches += 1;
      }
    });
  }
  return matches;
}

export async function partOne(input) {
  const rotatedInput = rotateOneEighty(input);
  const results = await Promise.all([
    await getPartOneMatches(input, 'XMAS'),
    await getPartOneMatches(rotatedInput, 'XMAS'),
  ]);

  return results[0] + results[1];
}

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

export function removeSides(input) {
  let newGrid = JSON.parse(JSON.stringify(input));

  newGrid.pop();
  newGrid.shift();

  newGrid = transpose(newGrid);

  newGrid.pop();
  newGrid.shift();

  newGrid = transpose(newGrid);

  return newGrid;
}

export async function partTwo(input, word) {
  const width = input[0].length;
  const height = input.length;
  const reverseWord = word.split('').reverse().join('');

  let matches = 0;

  const coords = getCoordinatesForAllCases(removeSides(input), 'A')
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
      concatAndValidate(NE2SW, word) ||
      concatAndValidate(NE2SW, reverseWord);
    const SE2NW_isMatch =
      concatAndValidate(SE2NW, word) ||
      concatAndValidate(SE2NW, reverseWord);

    if (NE2SW_isMatch && SE2NW_isMatch) {
      matches += 1;
    }
  }
  return matches;
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day04Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData, 'MAS'),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
