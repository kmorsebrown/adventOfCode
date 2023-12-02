import * as path from 'path';
import {
  getId,
  getSet,
  formatData,
  partOne,
  partTwo,
  Cube,
  checkIfGamePossible,
} from './Day02';

// npm test src/AoC23/Day02/Day02.spec.js

describe('Day02', () => {
  const mockFormattedData = [
    {
      id: 1,
      sets: [
        {
          red: 4,
          green: 0,
          blue: 3,
        },
        {
          red: 1,
          green: 2,
          blue: 6,
        },
        { red: 0, green: 2, blue: 0 },
      ],
    },
    {
      id: 2,
      sets: [
        { red: 0, green: 2, blue: 1 },
        { red: 1, green: 3, blue: 4 },
        { red: 0, green: 1, blue: 1 },
      ],
    },
    {
      id: 3,
      sets: [
        { red: 20, green: 8, blue: 6 },
        { red: 4, green: 13, blue: 5 },
        { red: 1, green: 5, blue: 0 },
      ],
    },
    {
      id: 4,
      sets: [
        { red: 3, green: 1, blue: 6 },
        { red: 6, green: 3, blue: 0 },
        { red: 14, green: 3, blue: 15 },
      ],
    },
    {
      id: 5,
      sets: [
        { red: 6, green: 3, blue: 1 },
        { red: 1, green: 2, blue: 2 },
      ],
    },
  ];
  describe('getId', () => {
    it('Returns 1 digit number from string', () => {
      expect(getId('Game 3')).toEqual(3);
    });
    it('Returns 2 digit number from string', () => {
      expect(getId('Game 35')).toEqual(35);
    });
    it('Returns 5 digit number from string', () => {
      expect(getId('Game 33156')).toEqual(33156);
    });
  });
  describe('getSet', () => {
    it('generates blue red set', () => {
      const args = '3 blue, 4 red';
      expect(getSet(args)).toHaveProperty([Cube.Blue], 3);
      expect(getSet(args)).toHaveProperty([Cube.Red], 4);
      expect(getSet(args)).toHaveProperty([Cube.Green], 0);
    });
  });
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day02TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockFormattedData);
    });
  });
  describe('checkIfGamePossible', () => {
    it('Game is possible when all sets show less than the arg cubes', () => {
      const args = { redCubes: 12, greenCubes: 13, blueCubes: 14 };
      const actual = checkIfGamePossible(mockFormattedData[0], args);
      expect(actual).toEqual(true);
    });
    it('Game is not possible if too many blue cubes', () => {
      const args = { redCubes: 12, greenCubes: 13, blueCubes: 14 };
      const actual = checkIfGamePossible(mockFormattedData[3], args);
      expect(actual).toEqual(false);
    });
    it('Game is not possible if too many red cubes', () => {
      const args = { redCubes: 12, greenCubes: 13, blueCubes: 14 };
      const actual = checkIfGamePossible(mockFormattedData[2], args);
      expect(actual).toEqual(false);
    });
  });
  describe('partOne', () => {
    it('TK', async () => {
      const args = { redCubes: 12, greenCubes: 13, blueCubes: 14 };
      const actual = await partOne(mockFormattedData, args);
      expect(actual).toEqual(8);
    });
  });
  describe.skip('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(0);
    });
  });
});
