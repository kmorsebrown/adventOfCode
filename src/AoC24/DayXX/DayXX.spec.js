const { formatData, partOne, partTwo } = require('./DayXX');

// npm test -- src/AoC24/DayXX/DayXX.spec.js

describe.skip('DayXX', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./DayXXTestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([]);
    });
  });
  describe('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(0);
    });
  });
  describe('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(0);
    });
  });
});
