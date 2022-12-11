const path = require('path');
const {
  formatData,
  getWorryWhileInspect,
  getWorryNoDamage,
  getTestResult,
  partOne,
  partTwo,
} = require('./Day11.js');

// npm test src/AoC22/Day11/Day11.spec.js

const monkeyTestMap = new Map([
  [
    'monkey0',
    {
      operation: ['*', '19'],
      items: [79, 98],
      test: 23,
      isTrue: 'monkey2',
      isFalse: 'monkey3',
      totalItems: 0,
    },
  ],
  [
    'monkey1',
    {
      operation: ['+', '6'],
      items: [54, 65, 75, 74],
      test: 19,
      isTrue: 'monkey2',
      isFalse: 'monkey0',
      totalItems: 0,
    },
  ],
  [
    'monkey2',
    {
      operation: ['*', 'old'],
      items: [79, 60, 97],
      test: 13,
      isTrue: 'monkey1',
      isFalse: 'monkey3',
      totalItems: 0,
    },
  ],
  [
    'monkey3',
    {
      operation: ['+', '3'],
      items: [74],
      test: 17,
      isTrue: 'monkey0',
      isFalse: 'monkey1',
      totalItems: 0,
    },
  ],
]);

describe('Day11', () => {
  describe('formatData', () => {
    it('Formats the data into an map', async () => {
      const args = path.join(__dirname, 'Day11TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(monkeyTestMap);
    });
  });
  describe('getWorryWhileInspect', () => {
    it('Returns number when operation is new = old + number', async () => {
      const actual = await getWorryWhileInspect(54, ['+', '6']);
      expect(actual).toEqual(60);
    });
    it('Returns number when operation is new = old * old', async () => {
      const actual = await getWorryWhileInspect(79, ['*', 'old']);
      expect(actual).toEqual(6241);
    });
  });
  describe('getWorryNoDamage', () => {
    it('Divides 1501 by 3, rounded down to the nearest integer', async () => {
      const actual = await getWorryNoDamage(1501);
      expect(actual).toEqual(500);
    });
    it('Divides 1862 by 3, rounded down to the nearest integer', async () => {
      const actual = await getWorryNoDamage(1862);
      expect(actual).toEqual(620);
    });
  });
  describe('getTestResult', () => {
    it('Returns isFalse when item is not divisible by test value', async () => {
      const monkey0 = monkeyTestMap.get('monkey0');
      const newItemLevel = 500;
      const actual = await getTestResult(newItemLevel, monkey0);
      expect(actual).toEqual('monkey3');
    });
    it('Returns isTrue when item is divisible by test value', async () => {
      const monkey2 = monkeyTestMap.get('monkey2');
      const newItemLevel = 2080;
      const actual = await getTestResult(newItemLevel, monkey2);
      expect(actual).toEqual('monkey1');
    });
  });
  describe('partOne', () => {
    it('Gets monkey business level', async () => {
      const actual = await partOne(monkeyTestMap, 20);
      expect(actual).toEqual(10605);
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
