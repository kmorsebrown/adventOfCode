import * as path from 'path';
import {
  formatData,
  isSymbol,
  arrayFromRow,
  getSchematicNumbersFromRow,
  hasAdjacentSymbol,
  checkForAdjacentSymbols,
  partOne,
  partTwo,
} from './Day03';

// npm test -- /AoC23/Day03/Day03.spec.ts

describe('Day03', () => {
  const formattedData = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.....+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..',
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day03TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(formattedData);
    });
  });
  describe('isSymbol', () => {
    it('returns true if the character is a sumbol', () => {
      expect(isSymbol('#')).toEqual(true);
      expect(isSymbol('$')).toEqual(true);
      expect(isSymbol('/')).toEqual(true);
      expect(isSymbol('%')).toEqual(true);
      expect(isSymbol('=')).toEqual(true);
      expect(isSymbol('+')).toEqual(true);
    });
    it('returns false if the character is a dot', () => {
      expect(isSymbol('.')).toEqual(false);
    });
    it('returns false if the character is a number', () => {
      expect(isSymbol(6)).toEqual(false);
    });
  });
  describe('arrayFromRow', () => {
    it('returns array of numbers and strings from row', () => {
      expect(arrayFromRow('467..114..')).toEqual([
        4,
        6,
        7,
        '.',
        '.',
        1,
        1,
        4,
        '.',
        '.',
      ]);
    });
    it('returns array of strings from row with no digits', () => {
      expect(arrayFromRow('......#...')).toEqual([
        '.',
        '.',
        '.',
        '.',
        '.',
        '.',
        '#',
        '.',
        '.',
        '.',
      ]);
    });
  });
  describe('getSchematicNumbersFromRow', () => {
    it('gets schematic data from first row', () => {
      expect(getSchematicNumbersFromRow(formattedData[0], 0)).toEqual([
        {
          number: 467,
          coordinates: [
            { rowIdx: 0, colIdx: 0 },
            { rowIdx: 0, colIdx: 1 },
            { rowIdx: 0, colIdx: 2 },
          ],
        },
        {
          number: 114,
          coordinates: [
            { rowIdx: 0, colIdx: 5 },
            { rowIdx: 0, colIdx: 6 },
            { rowIdx: 0, colIdx: 7 },
          ],
        },
      ]);
    });
  });
  describe('hasAdjacentSymbol', () => {
    it('Returns true if symbol is above center of current', () => {
      expect(hasAdjacentSymbol(formattedData, 2, 3)).toEqual(true);
    });
    it('Returns true if symbol is above left of current', () => {
      expect(hasAdjacentSymbol(formattedData, 2, 4)).toEqual(true);
    });
    it('Returns true if symbol is above right of current', () => {
      expect(hasAdjacentSymbol(formattedData, 2, 2)).toEqual(true);
    });
    it('Returns true if symbol is left of current', () => {
      expect(hasAdjacentSymbol(formattedData, 1, 4)).toEqual(true);
    });
    it('Returns true if symbol is right of current', () => {
      expect(hasAdjacentSymbol(formattedData, 1, 2)).toEqual(true);
    });
    it('Returns true if symbol is below center of current', () => {
      expect(hasAdjacentSymbol(formattedData, 2, 6)).toEqual(true);
    });
    it('Returns true if symbol is below left of current', () => {
      expect(hasAdjacentSymbol(formattedData, 7, 6)).toEqual(true);
    });
    it('Returns true if symbol is below right of current', () => {
      expect(hasAdjacentSymbol(formattedData, 0, 2)).toEqual(true);
    });
    it('Returns false if no adjacent symbols', () => {
      expect(hasAdjacentSymbol(formattedData, 5, 7)).toEqual(false);
    });
  });
  describe('checkForAdjacentSymbols', () => {
    it('sets adjacentSymbol to true when any digits are adjacent to a symbol', () => {
      const schematicNum = {
        number: 467,
        coordinates: [
          { rowIdx: 0, colIdx: 0 },
          { rowIdx: 0, colIdx: 1 },
          { rowIdx: 0, colIdx: 2 },
        ],
      };
      checkForAdjacentSymbols(formattedData, schematicNum);
      expect(schematicNum).toHaveProperty('adjacentSymbol', true);
    });
    it('sets adjacentSymbol to false when no digits are adjacent to a symbol', () => {
      const schematicNum = {
        number: 114,
        coordinates: [
          { rowIdx: 0, colIdx: 5 },
          { rowIdx: 0, colIdx: 6 },
          { rowIdx: 0, colIdx: 7 },
        ],
      };
      checkForAdjacentSymbols(formattedData, schematicNum);
      expect(schematicNum).toHaveProperty('adjacentSymbol', false);
    });
  });
  describe('partOne', () => {
    it('Returns sum of numbers with adjacent symbols', async () => {
      const actual = await partOne(formattedData);
      expect(actual).toEqual(4361);
    });
  });
  describe.skip('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(467835);
    });
  });
});
