const path = require('path');
const { formatData, partOne, partTwo } = require('./Day11.js');

// npm test src/AoC22/Day11/Day11.spec.js

const monkeyTestMap = new Map([
  [
    'monkey0',
    {
      false: 'monkey3',
      operation: ['*', '19'],
      startingItems: [79, 98],
      test: 23,
      true: 'monkey2',
    },
  ],
  [
    'monkey1',
    {
      false: 'monkey0',
      operation: ['+', '6'],
      startingItems: [54, 65, 75, 74],
      test: 19,
      true: 'monkey2',
    },
  ],
  [
    'monkey2',
    {
      false: 'monkey3',
      operation: ['*', 'old'],
      startingItems: [79, 60, 97],
      test: 13,
      true: 'monkey1',
    },
  ],
  [
    'monkey3',
    {
      false: 'monkey1',
      operation: ['+', '3'],
      startingItems: [74],
      test: 17,
      true: 'monkey0',
    },
  ],
]);

describe('Day11', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day11TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(monkeyTestMap);
    });
  });
  describe.skip('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(0);
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
