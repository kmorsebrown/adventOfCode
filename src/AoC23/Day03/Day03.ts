import * as path from 'path';

import { getData } from '../../globalFunctions.js';

type Row = (string | number)[];
type Coordinates = {
  rowIdx: number;
  colIdx: number;
};
type SchematicNumber = {
  number: number;
  coordinates: Coordinates[];
  adjacentSymbol?: boolean;
};

// https://adventofcode.com/2023/day/3
export async function formatData(filepath: string): Promise<string[]> {
  const data = await getData(filepath);
  return data.split('\n');
}

// Part One
export function getSchematicNumbersFromRow(row: string, rowIndex: number) {
  const isDigit = (char: any) => {
    const DIGIT_REGEX = /\d/;
    return DIGIT_REGEX.test(char);
  };

  const rowArr = Array.from(row);

  let schematicArray: SchematicNumber[] = [];

  rowArr.forEach((char, i) => {
    const charIsDigit = isDigit(char);
    const prevCharIsDigit = i > 0 && isDigit(rowArr[i - 1]);
    const nextCharIsDigit = i < rowArr.length && isDigit(rowArr[i + 1]);

    if (charIsDigit && !prevCharIsDigit) {
      let x = i;
      let numberStr = '';
      let coordinates: Coordinates[] = [];
      do {
        numberStr += rowArr[x];
        coordinates.push({
          rowIdx: rowIndex,
          colIdx: x,
        });
        x += 1;
      } while (x < rowArr.length && isDigit(rowArr[x]));
      schematicArray.push({
        number: Number(numberStr),
        coordinates: coordinates,
      });
    }
  });
  return schematicArray;
}

export function isSymbol(x: string | number) {
  const SYMBOL_REGEX = /[^\.\d]+/;
  return SYMBOL_REGEX.test(x as any);
}

export function arrayFromRow(row: string): Row {
  return Array.from(row)?.map((i: string | number) => {
    const DIGIT_REGEX = /\d/;
    const isDigit = DIGIT_REGEX.test(i as any);

    if (isDigit) {
      return Number(i);
    } else {
      return i;
    }
  });
}

export function hasAdjacentSymbol(data: string[], row: number, col: number) {
  let numAdjacentSymbols = 0;
  const isNotFirstRow = row !== 0;
  const isNotLastRow = row !== data.length - 1;
  const isNotFirstCol = col !== 0;
  const isNotLastCol = col !== data[row].length - 1;

  // checking for symbols adjacent to data[row][col]

  if (data[row - 1] != null && isNotFirstRow) {
    const previousRow: Row = arrayFromRow(data[row - 1]);
    // check above center
    numAdjacentSymbols += isSymbol(data[row - 1][col]) ? 1 : 0;

    // check above left
    if (isNotFirstCol) {
      numAdjacentSymbols += isSymbol(data[row - 1][col - 1]) ? 1 : 0;
    }

    // check above right
    if (isNotLastCol) {
      numAdjacentSymbols += isSymbol(data[row - 1][col + 1]) ? 1 : 0;
    }
  }

  // check left
  if (isNotFirstCol) {
    const currentRow: Row = arrayFromRow(data[row]);
    numAdjacentSymbols += isSymbol(data[row][col - 1]) ? 1 : 0;
  }

  // check right
  if (isNotLastCol) {
    const currentRow: Row = arrayFromRow(data[row]);
    numAdjacentSymbols += isSymbol(data[row][col + 1]) ? 1 : 0;
  }

  if (isNotLastRow) {
    const nextRow: Row = arrayFromRow(data[row + 1]);
    // check below center
    numAdjacentSymbols += isSymbol(data[row + 1][col]) ? 1 : 0;

    // check below left
    if (isNotFirstCol) {
      numAdjacentSymbols += isSymbol(data[row + 1][col - 1]) ? 1 : 0;
    }

    // check below right
    if (isNotLastCol) {
      numAdjacentSymbols += isSymbol(data[row + 1][col + 1]) ? 1 : 0;
    }
  }
  return numAdjacentSymbols > 0;
}

export function checkForAdjacentSymbols(
  data: string[],
  schematicNum: SchematicNumber
) {
  let numAdjacentSymbols = 0;
  schematicNum.coordinates.forEach((i) => {
    numAdjacentSymbols += hasAdjacentSymbol(data, i.rowIdx, i.colIdx) ? 1 : 0;
  });
  schematicNum.adjacentSymbol = numAdjacentSymbols > 0;
  return;
}

export async function partOne(data: string[]) {
  const schematicNumbers: SchematicNumber[] = [];
  data.forEach((row, i) => {
    getSchematicNumbersFromRow(row, i).forEach((obj) => {
      schematicNumbers.push(obj);
    });
  });
  schematicNumbers.forEach((obj) => checkForAdjacentSymbols(data, obj));

  let numsWithAdjacentSymbols: number[] = [];

  schematicNumbers.forEach((obj) => {
    if (obj.adjacentSymbol) {
      numsWithAdjacentSymbols.push(obj.number);
    }
  });

  return numsWithAdjacentSymbols.reduce((a, b) => a + b);
}

// Part Two
export async function partTwo(input) {
  return input;
}

export async function solve() {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day03Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      // await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
