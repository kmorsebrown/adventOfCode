const { formatData, partOne, partTwo } = require('./Day12');

// npm test -- src/AoC25/Day12/Day12.spec.js

describe('Day12', () => {
  const mockInput = [];
  describe.skip('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day12TestData.txt');
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
