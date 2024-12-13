const { formatData, partOne, partTwo } = require('./Day11');

// npm test -- src/AoC24/Day11/Day11.spec.js

describe('Day11', () => {
  const mockInput = ['0', '1', '10', '99', '999'];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day11TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
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
