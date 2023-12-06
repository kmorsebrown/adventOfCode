const path = require('path');
const { formatData, getMappedNum, partOne, partTwo } = require('./Day05');

// npm test -- src/AoC23/Day05/Day05.spec.js

describe('Day05', () => {
  const formattedData = new Map([
    ['seeds', [79, 14, 55, 13]],
    [
      'seed-to-soil',
      [
        { destRngStrt: 50, srcRngStrt: 98, rngLngth: 2 },
        { destRngStrt: 52, srcRngStrt: 50, rngLngth: 48 },
      ],
    ],
    [
      'soil-to-fertilizer',
      [
        { destRngStrt: 0, srcRngStrt: 15, rngLngth: 37 },
        { destRngStrt: 37, srcRngStrt: 52, rngLngth: 2 },
        { destRngStrt: 39, srcRngStrt: 0, rngLngth: 15 },
      ],
    ],
    [
      'fertilizer-to-water',
      [
        { destRngStrt: 49, srcRngStrt: 53, rngLngth: 8 },
        { destRngStrt: 0, srcRngStrt: 11, rngLngth: 42 },
        { destRngStrt: 42, srcRngStrt: 0, rngLngth: 7 },
        { destRngStrt: 57, srcRngStrt: 7, rngLngth: 4 },
      ],
    ],
    [
      'water-to-light',
      [
        { destRngStrt: 88, srcRngStrt: 18, rngLngth: 7 },
        { destRngStrt: 18, srcRngStrt: 25, rngLngth: 70 },
      ],
    ],
    [
      'light-to-temperature',
      [
        { destRngStrt: 45, srcRngStrt: 77, rngLngth: 23 },
        { destRngStrt: 81, srcRngStrt: 45, rngLngth: 19 },
        { destRngStrt: 68, srcRngStrt: 64, rngLngth: 13 },
      ],
    ],
    [
      'temperature-to-humidity',
      [
        { destRngStrt: 0, srcRngStrt: 69, rngLngth: 1 },
        { destRngStrt: 1, srcRngStrt: 0, rngLngth: 69 },
      ],
    ],
    [
      'humidity-to-location',
      [
        { destRngStrt: 60, srcRngStrt: 56, rngLngth: 37 },
        { destRngStrt: 56, srcRngStrt: 93, rngLngth: 4 },
      ],
    ],
  ]);
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day05TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(formattedData);
    });
  });
  describe('getMappedNum', () => {
    it('Gets the mapped soil number when the seed is in the first range', () => {
      expect(getMappedNum(55, formattedData.get('seed-to-soil'), 0)).toEqual(
        57
      );
    });
    it('Gets the mapped soil number when the seed is in the second range', () => {
      expect(getMappedNum(79, formattedData.get('seed-to-soil'), 0)).toEqual(
        81
      );
    });
    it('Gets the mapped soil number when the seed is not in any ranges', () => {
      expect(getMappedNum(14, formattedData.get('seed-to-soil'), 0)).toEqual(
        14
      );
    });
  });
  describe('partOne', () => {
    it('Returns lowest location number', async () => {
      const actual = await partOne(formattedData);
      expect(actual).toEqual(35);
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
