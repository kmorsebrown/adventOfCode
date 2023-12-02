import * as path from 'path';
import { getId, getSet, formatData, partOne, partTwo, Cube } from './Day02';

// npm test src/AoC23/Day02/Day02.spec.js

describe('Day02', () => {
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
      expect(getSet(args)).not.toHaveProperty([Cube.Green]);
    });
  });
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day02TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        {
          id: 1,
          sets: [
            {
              blue: 3,
              red: 4,
            },
            {
              red: 1,
              green: 2,
              blue: 6,
            },
            { green: 2 },
          ],
        },
        {
          id: 2,
          sets: [
            { blue: 1, green: 2 },
            { green: 3, blue: 4, red: 1 },
            { green: 1, blue: 1 },
          ],
        },
        {
          id: 3,
          sets: [
            { green: 8, blue: 6, red: 20 },
            { blue: 5, red: 4, green: 13 },
            { green: 5, red: 1 },
          ],
        },
        {
          id: 4,
          sets: [
            { green: 1, red: 3, blue: 6 },
            { green: 3, red: 6 },
            { green: 3, blue: 15, red: 14 },
          ],
        },
        {
          id: 5,
          sets: [
            { red: 6, blue: 1, green: 3 },
            { blue: 2, red: 1, green: 2 },
          ],
        },
      ]);
    });
  });
  describe.skip('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
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
