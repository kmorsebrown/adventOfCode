const {
  formatData,
  combinations,
  isEquationTrue,
  canEquationBeTrue,
  partOne,
  partTwo,
} = require('./Day07');

// npm test -- src/AoC24/Day07/Day07.spec.js

describe('Day07', () => {
  const mockInput = [
    { testValue: 190, operands: [10, 19] },
    { testValue: 3267, operands: [81, 40, 27] },
    { testValue: 83, operands: [17, 5] },
    { testValue: 156, operands: [15, 6] },
    { testValue: 7290, operands: [6, 8, 6, 15] },
    { testValue: 161011, operands: [16, 10, 13] },
    { testValue: 192, operands: [17, 8, 14] },
    { testValue: 21037, operands: [9, 7, 18, 13] },
    { testValue: 292, operands: [11, 6, 16, 20] },
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day07TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('combinations', () => {
    it('Returns all possible operator combinations for 3 slots', () => {
      const actual = combinations(['+', '*'], [], 0, 3);
      expect(actual).toEqual([
        ['+', '+', '+'],
        ['+', '+', '*'],
        ['+', '*', '+'],
        ['+', '*', '*'],
        ['*', '+', '+'],
        ['*', '+', '*'],
        ['*', '*', '+'],
        ['*', '*', '*'],
      ]);
    });
  });
  describe('isEquationTrue', () => {
    it('returns true when the equation equals the expected value', () => {
      const actual = isEquationTrue(292, [11, 6, 16, 20], ['+', '*', '+']);
      expect(actual).toEqual(true);
    });
    it('returns false when the equation does not equal the expected value', () => {
      const actual = isEquationTrue(292, [11, 6, 16, 20], ['*', '*', '+']);
      expect(actual).toEqual(false);
    });
    it('returns true when the equation equals the expected value w/|| operator', () => {
      const actual = isEquationTrue(7290, [6, 8, 6, 15], ['*', '||', '*']);
      expect(actual).toEqual(true);
    });
  });
  describe('canEquationBeTrue', () => {
    it('returns true when the operands can equal the test value', () => {
      const actual = canEquationBeTrue(
        {
          testValue: 292,
          operands: [11, 6, 16, 20],
        },
        ['*', '+']
      );
      expect(actual).toEqual(true);
    });
    it('returns true when the operands can equal 7290 w/|| operator', () => {
      const actual = canEquationBeTrue(
        {
          testValue: 7290,
          operands: [6, 8, 6, 15],
        },
        ['*', '+', '||']
      );
      expect(actual).toEqual(true);
    });
    it('returns false when the operands cannot equal the test value', () => {
      const actual = canEquationBeTrue(
        {
          testValue: 21037,
          operands: [9, 7, 18, 13],
        },
        ['*', '+']
      );
      expect(actual).toEqual(false);
    });
    it('returns true when the operands can equal 156 w/|| operator', () => {
      const actual = canEquationBeTrue(
        {
          testValue: 156,
          operands: [15, 6],
        },
        ['*', '+', '||']
      );
      expect(actual).toEqual(true);
    });
  });
  describe('partOne', () => {
    it('Returns the the sum of the test values from equations that can be true', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(3749);
    });
  });
  describe('partTwo', () => {
    it('Returns the the sum of the test values from equations that can be true', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(11387);
    });
  });
});
