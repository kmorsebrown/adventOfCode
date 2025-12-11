const {
  formatData,
  formatDataPt1,
  formatDataPt2,
  evaluateEquation,
  parseCephalopodMath,
  partOne,
  partTwo,
} = require('./Day06');

// npm test -- src/AoC25/Day06/Day06.spec.js

describe('Day06', () => {
  const mockInput = [
    '123 328  51 64 ',
    ' 45 64  387 23 ',
    '  6 98  215 314',
    '*   +   *   +  ',
  ];
  const mockInputPt1 = [
    [123, 45, 6, '*'],
    [328, 64, 98, '+'],
    [51, 387, 215, '*'],
    [64, 23, 314, '+'],
  ];

  const mockInputPt2 = [
    [4, 431, 623, '+'],
    [175, 581, 32, '*'],
    [8, 248, 369, '+'],
    [356, 24, 1, '*'],
  ];

  describe('formatData', () => {
    it('Formats the data into an array of strings', async () => {
      const args = require.resolve('./Day06TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('formatDataPt1', () => {
    it('Formats the data into a transposed 2D array', async () => {
      const actual = await formatDataPt1(mockInput);
      expect(actual).toEqual(mockInputPt1);
    });
  });
  describe('formatDataPt2', () => {
    it('Formats the data into a transposed 2D array', async () => {
      const actual = await formatDataPt2(mockInput);
      // expect(actual).toEqual(mockInputPt2);
      expect(actual).toEqual(mockInputPt2);
    });
  });
  describe('evaluateEquation', () => {
    it('Adds all numbers in array together when operator is +', async () => {
      const actual = await evaluateEquation([328, 64, 98], '+');
      expect(actual).toEqual(490);
    });
    it('Multiplies all numbers in array together when operator is *', async () => {
      const actual = await evaluateEquation([123, 45, 6], '*');
      expect(actual).toEqual(33210);
    });
  });
  describe('partOne', () => {
    it('Returns the grand total of all solutions in the worksheet', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(4277556);
    });
  });
  describe('partTwo', () => {
    it('Returns the grand total of all solutions on the worksheet', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(3263827);
    });
  });
});
