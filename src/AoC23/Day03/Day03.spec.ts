import * as path from 'path';
import {
  formatData,
  isSymbol,
  getSchematicNumbersFromRow,
  hasAdjacentSymbol,
  checkForAdjacentSymbols,
  partOne,
  getGearsFromRow,
  getAdjacentPartNumbers,
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
  describe('getGearsFromRow', () => {
    it('returns array of gears objects', () => {
      expect(getGearsFromRow(formattedData)).toEqual([
        {
          coordinates: {
            rowIdx: 1,
            colIdx: 3,
          },
          adjCoords: [
            {
              rowIdx: 0,
              colIdx: 2,
            },
            {
              rowIdx: 0,
              colIdx: 3,
            },
            {
              rowIdx: 0,
              colIdx: 4,
            },
            {
              rowIdx: 1,
              colIdx: 2,
            },
            {
              rowIdx: 1,
              colIdx: 4,
            },
            {
              rowIdx: 2,
              colIdx: 2,
            },
            {
              rowIdx: 2,
              colIdx: 3,
            },
            {
              rowIdx: 2,
              colIdx: 4,
            },
          ],
          adjPartNums: [],
        },
        {
          coordinates: {
            rowIdx: 4,
            colIdx: 3,
          },
          adjCoords: [
            {
              rowIdx: 3,
              colIdx: 2,
            },
            {
              rowIdx: 3,
              colIdx: 3,
            },
            {
              rowIdx: 3,
              colIdx: 4,
            },
            {
              rowIdx: 4,
              colIdx: 2,
            },
            {
              rowIdx: 4,
              colIdx: 4,
            },
            {
              rowIdx: 5,
              colIdx: 2,
            },
            {
              rowIdx: 5,
              colIdx: 3,
            },
            {
              rowIdx: 5,
              colIdx: 4,
            },
          ],
          adjPartNums: [],
        },
        {
          coordinates: {
            rowIdx: 8,
            colIdx: 5,
          },
          adjCoords: [
            {
              rowIdx: 7,
              colIdx: 4,
            },
            {
              rowIdx: 7,
              colIdx: 5,
            },
            {
              rowIdx: 7,
              colIdx: 6,
            },
            {
              rowIdx: 8,
              colIdx: 4,
            },
            {
              rowIdx: 8,
              colIdx: 6,
            },
            {
              rowIdx: 9,
              colIdx: 4,
            },
            {
              rowIdx: 9,
              colIdx: 5,
            },
            {
              rowIdx: 9,
              colIdx: 6,
            },
          ],
          adjPartNums: [],
        },
      ]);
    });
  });
  describe('getAdjacentPartNumbers', () => {
    const gearArr = [
      {
        coordinates: {
          rowIdx: 1,
          colIdx: 3,
        },
        adjCoords: [
          {
            rowIdx: 0,
            colIdx: 2,
          },
          {
            rowIdx: 0,
            colIdx: 3,
          },
          {
            rowIdx: 0,
            colIdx: 4,
          },
          {
            rowIdx: 1,
            colIdx: 2,
          },
          {
            rowIdx: 1,
            colIdx: 4,
          },
          {
            rowIdx: 2,
            colIdx: 2,
          },
          {
            rowIdx: 2,
            colIdx: 3,
          },
          {
            rowIdx: 2,
            colIdx: 4,
          },
        ],
        adjPartNums: [],
      },
      {
        coordinates: {
          rowIdx: 4,
          colIdx: 3,
        },
        adjCoords: [
          {
            rowIdx: 3,
            colIdx: 2,
          },
          {
            rowIdx: 3,
            colIdx: 3,
          },
          {
            rowIdx: 3,
            colIdx: 4,
          },
          {
            rowIdx: 4,
            colIdx: 2,
          },
          {
            rowIdx: 4,
            colIdx: 4,
          },
          {
            rowIdx: 5,
            colIdx: 2,
          },
          {
            rowIdx: 5,
            colIdx: 3,
          },
          {
            rowIdx: 5,
            colIdx: 4,
          },
        ],
        adjPartNums: [],
      },
      {
        coordinates: {
          rowIdx: 8,
          colIdx: 5,
        },
        adjCoords: [
          {
            rowIdx: 7,
            colIdx: 4,
          },
          {
            rowIdx: 7,
            colIdx: 5,
          },
          {
            rowIdx: 7,
            colIdx: 6,
          },
          {
            rowIdx: 8,
            colIdx: 4,
          },
          {
            rowIdx: 8,
            colIdx: 6,
          },
          {
            rowIdx: 9,
            colIdx: 4,
          },
          {
            rowIdx: 9,
            colIdx: 5,
          },
          {
            rowIdx: 9,
            colIdx: 6,
          },
        ],
        adjPartNums: [],
      },
    ];
    const schematicNumbers = [
      {
        number: 467,
        coordinates: [
          { rowIdx: 0, colIdx: 0 },
          { rowIdx: 0, colIdx: 1 },
          { rowIdx: 0, colIdx: 2 },
        ],
        adjacentSymbol: true,
      },
      {
        number: 114,
        coordinates: [
          { rowIdx: 0, colIdx: 5 },
          { rowIdx: 0, colIdx: 6 },
          { rowIdx: 0, colIdx: 7 },
        ],
        adjacentSymbol: false,
      },
      {
        number: 35,
        coordinates: [
          { rowIdx: 2, colIdx: 2 },
          { rowIdx: 2, colIdx: 3 },
        ],
        adjacentSymbol: true,
      },
      {
        number: 633,
        coordinates: [
          { rowIdx: 2, colIdx: 6 },
          { rowIdx: 2, colIdx: 7 },
          { rowIdx: 2, colIdx: 8 },
        ],
        adjacentSymbol: true,
      },
      {
        number: 617,
        coordinates: [
          { rowIdx: 4, colIdx: 0 },
          { rowIdx: 4, colIdx: 1 },
          { rowIdx: 4, colIdx: 2 },
        ],
        adjacentSymbol: true,
      },
      {
        number: 58,
        coordinates: [
          { rowIdx: 5, colIdx: 7 },
          { rowIdx: 5, colIdx: 8 },
        ],
        adjacentSymbol: false,
      },
      {
        number: 592,
        coordinates: [
          { rowIdx: 6, colIdx: 2 },
          { rowIdx: 6, colIdx: 3 },
          { rowIdx: 6, colIdx: 4 },
        ],
        adjacentSymbol: true,
      },
      {
        number: 755,
        coordinates: [
          { rowIdx: 7, colIdx: 6 },
          { rowIdx: 7, colIdx: 7 },
          { rowIdx: 7, colIdx: 8 },
        ],
        adjacentSymbol: true,
      },
      {
        number: 664,
        coordinates: [
          { rowIdx: 9, colIdx: 1 },
          { rowIdx: 9, colIdx: 2 },
          { rowIdx: 9, colIdx: 3 },
        ],
        adjacentSymbol: true,
      },
      {
        number: 598,
        coordinates: [
          { rowIdx: 9, colIdx: 5 },
          { rowIdx: 9, colIdx: 6 },
          { rowIdx: 9, colIdx: 7 },
        ],
        adjacentSymbol: true,
      },
    ];
    it('returns array of gears objects', () => {
      expect(getAdjacentPartNumbers(gearArr, schematicNumbers)).toEqual([
        {
          coordinates: {
            rowIdx: 1,
            colIdx: 3,
          },
          adjCoords: [
            {
              rowIdx: 0,
              colIdx: 2,
            },
            {
              rowIdx: 0,
              colIdx: 3,
            },
            {
              rowIdx: 0,
              colIdx: 4,
            },
            {
              rowIdx: 1,
              colIdx: 2,
            },
            {
              rowIdx: 1,
              colIdx: 4,
            },
            {
              rowIdx: 2,
              colIdx: 2,
            },
            {
              rowIdx: 2,
              colIdx: 3,
            },
            {
              rowIdx: 2,
              colIdx: 4,
            },
          ],
          adjPartNums: [467, 35],
        },
        {
          coordinates: {
            rowIdx: 4,
            colIdx: 3,
          },
          adjCoords: [
            {
              rowIdx: 3,
              colIdx: 2,
            },
            {
              rowIdx: 3,
              colIdx: 3,
            },
            {
              rowIdx: 3,
              colIdx: 4,
            },
            {
              rowIdx: 4,
              colIdx: 2,
            },
            {
              rowIdx: 4,
              colIdx: 4,
            },
            {
              rowIdx: 5,
              colIdx: 2,
            },
            {
              rowIdx: 5,
              colIdx: 3,
            },
            {
              rowIdx: 5,
              colIdx: 4,
            },
          ],
          adjPartNums: [617],
        },
        {
          coordinates: {
            rowIdx: 8,
            colIdx: 5,
          },
          adjCoords: [
            {
              rowIdx: 7,
              colIdx: 4,
            },
            {
              rowIdx: 7,
              colIdx: 5,
            },
            {
              rowIdx: 7,
              colIdx: 6,
            },
            {
              rowIdx: 8,
              colIdx: 4,
            },
            {
              rowIdx: 8,
              colIdx: 6,
            },
            {
              rowIdx: 9,
              colIdx: 4,
            },
            {
              rowIdx: 9,
              colIdx: 5,
            },
            {
              rowIdx: 9,
              colIdx: 6,
            },
          ],
          adjPartNums: [755, 598],
        },
      ]);
    });
  });

  describe('partTwo', () => {
    it('Gets gear ratios', async () => {
      const actual = await partTwo(formattedData);
      expect(actual).toEqual(467835);
    });
  });
});
