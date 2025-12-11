const { formatData, evaluateEquation, partOne, partTwo } = require('./Day06');

// npm test -- src/AoC25/Day06/Day06.spec.js

describe('Day06', () => {
  const mockInput = [
    [123, 45, 6, '*'],
    [328, 64, 98, '+'],
    [51, 387, 215, '*'],
    [64, 23, 314, '+'],
  ];

  describe('formatData', () => {
    it('Formats the data into a transposed array', async () => {
      const args = require.resolve('./Day06TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
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
  describe.skip('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(0);
    });
  });
});
