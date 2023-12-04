import * as path from 'path';

import { getData } from '../../globalFunctions.js';

type Coordinates = {
  rowIdx: number;
  colIdx: number;
};
type SchematicNumber = {
  number: number;
  coordinates: Coordinates[];
  adjacentSymbol?: boolean;
};

type Gear = {
  coordinates: Coordinates;
  adjCoords: Coordinates[];
  adjPartNums: number[];
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

export function hasAdjacentSymbol(data: string[], row: number, col: number) {
  let numAdjacentSymbols = 0;
  const isNotFirstRow = row !== 0;
  const isNotLastRow = row !== data.length - 1;
  const isNotFirstCol = col !== 0;
  const isNotLastCol = col !== data[row].length - 1;

  // checking for symbols adjacent to data[row][col]

  if (isNotFirstRow) {
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
    numAdjacentSymbols += isSymbol(data[row][col - 1]) ? 1 : 0;
  }

  // check right
  if (isNotLastCol) {
    numAdjacentSymbols += isSymbol(data[row][col + 1]) ? 1 : 0;
  }

  if (isNotLastRow) {
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

export function getGearsFromRow(data: string[]): Gear[] {
  const isGear = (x: any) => {
    const GEAR_REGEX = /\*/;
    return GEAR_REGEX.test(x as any);
  };

  const getCoordsObj = (ri: number, ci: number): Coordinates => {
    return {
      rowIdx: ri,
      colIdx: ci,
    };
  };

  let gearsArray: Gear[] = [];

  data.forEach((row, rowIndex) => {
    const rowArr = Array.from(row);
    rowArr.forEach((char, colIndex) => {
      const charIsGear = isGear(char);
      const isNotFirstRow = rowIndex !== 0;
      const isNotLastRow = rowIndex !== data.length - 1;
      const isNotFirstCol = colIndex !== 0;
      const isNotLastCol = colIndex !== rowArr.length - 1;

      if (charIsGear) {
        let gear: Gear = {
          coordinates: {
            rowIdx: rowIndex,
            colIdx: colIndex,
          },
          adjCoords: [],
          adjPartNums: [],
        };
        if (isNotFirstRow) {
          if (isNotFirstCol) {
            // get above left coords
            gear.adjCoords.push(getCoordsObj(rowIndex - 1, colIndex - 1));
          }
          // get above center coords
          gear.adjCoords.push(getCoordsObj(rowIndex - 1, colIndex));

          if (isNotLastCol) {
            // get above right coords
            gear.adjCoords.push(getCoordsObj(rowIndex - 1, colIndex + 1));
          }
        }
        if (isNotFirstCol) {
          // get left coords
          gear.adjCoords.push(getCoordsObj(rowIndex, colIndex - 1));
        }
        if (isNotLastCol) {
          // get right coords
          gear.adjCoords.push(getCoordsObj(rowIndex, colIndex + 1));
        }
        if (isNotLastRow) {
          if (isNotFirstCol) {
            // get below left coords
            gear.adjCoords.push(getCoordsObj(rowIndex + 1, colIndex - 1));
          }
          // get below center coords
          gear.adjCoords.push(getCoordsObj(rowIndex + 1, colIndex));

          if (isNotLastCol) {
            // get below right coords
            gear.adjCoords.push(getCoordsObj(rowIndex + 1, colIndex + 1));
          }
        }
        gearsArray.push(gear);
      }
    });
  });
  return gearsArray;
}

export function getAdjacentPartNumbers(
  gearArr: Gear[],
  partNums: SchematicNumber[]
) {
  const partCoordsOverlap = (coordArrA: Coordinates[], coordB: Coordinates) => {
    return coordArrA.some((c) => {
      return c.rowIdx === coordB.rowIdx && c.colIdx === coordB.colIdx;
    });
  };
  gearArr.forEach((gear) => {
    gear.adjCoords.forEach((c: Coordinates) => {
      partNums.forEach((p) => {
        if (partCoordsOverlap(p.coordinates, c)) {
          if (!gear.adjPartNums.includes(p.number)) {
            gear.adjPartNums.push(p.number);
          }
        }
      });
    });
  });
  return gearArr;
}
export async function partTwo(data: string[]) {
  const schematicNumbers: SchematicNumber[] = [];
  data.forEach((row, i) => {
    getSchematicNumbersFromRow(row, i).forEach((obj) => {
      schematicNumbers.push(obj);
    });
  });

  const gearsArr = getGearsFromRow(data);
  getAdjacentPartNumbers(gearsArr, schematicNumbers);

  const gearRatios: number[] = [];
  gearsArr.forEach((gear) => {
    if (gear.adjPartNums.length === 2) {
      gearRatios.push(gear.adjPartNums[0] * gear.adjPartNums[1]);
    }
  });

  return gearRatios.reduce((a, b) => a + b);
}

export async function solve() {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day03Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
