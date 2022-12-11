const path = require('path');
const {
  formatData,
  getWorryWhileInspect,
  getWorryNoDamagePtOne,
  getTestResult,
  partOne,
  getInspectedTotal,
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
  describe('getWorryNoDamagePtOne', () => {
    it('Divides 1501 by 3, rounded down to the nearest integer', async () => {
      const actual = await getWorryNoDamagePtOne(1501);
      expect(actual).toEqual(500);
    });
    it('Divides 1862 by 3, rounded down to the nearest integer', async () => {
      const actual = await getWorryNoDamagePtOne(1862);
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
  describe.only('getInspectedTotal', () => {
    const operator = '/';
    const operand = 1000;
    it('After round 1', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        1,
        operator,
        operand
      );
      expect(actual).toEqual([2, 4, 3, 6]);
    });
    it('After round 20', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        20,
        operator,
        operand
      );
      expect(actual).toEqual([99, 97, 8, 103]);
    });
    it('After round 1000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        1000,
        operator,
        operand
      );
      expect(actual).toEqual([5204, 4792, 199, 5192]);
    });
    it('After round 2000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        2000,
        operator,
        operand
      );
      expect(actual).toEqual([10419, 9577, 392, 10391]);
    });

    it('After round 3000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        3000,
        operator,
        operand
      );
      expect(actual).toEqual([15638, 14358, 587, 15593]);
    });
    it('After round 4000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        4000,
        operator,
        operand
      );
      expect(actual).toEqual([20858, 19138, 780, 20797]);
    });
    it('After round 5000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        5000,
        operator,
        operand
      );
      expect(actual).toEqual([26075, 23921, 974, 26000]);
    });

    it('After round 6000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        6000,
        operator,
        operand
      );
      expect(actual).toEqual([31294, 28702, 1165, 31204]);
    });
    it('After round 7000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        7000,
        operator,
        operand
      );
      expect(actual).toEqual([36508, 33488, 1360, 36400]);
    });
    it('After round 8000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        8000,
        operator,
        operand
      );
      expect(actual).toEqual([41728, 38268, 1553, 41606]);
    });
    it('After round 9000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        9000,
        operator,
        operand
      );
      expect(actual).toEqual([46945, 43051, 1746, 46807]);
    });
    it('After round 100000', async () => {
      const actual = await getInspectedTotal(
        monkeyTestMap,
        10000,
        operator,
        operand
      );
      expect(actual).toEqual([52166, 47830, 1938, 52013]);
    });
    describe('partTwo', () => {
      it('Gets monkey business level', async () => {
        const actual = await partOne([52166, 47830, 1938, 52013]);
        expect(actual).toEqual(2713310158);
      });
    });
  });
});
