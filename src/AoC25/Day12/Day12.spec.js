const { formatData, partOne, partTwo } = require('./Day12');

// npm test -- src/AoC25/Day12/Day12.spec.js

describe('Day12', () => {
  const mockInput = {
    shapes: [
      ['###', '##.', '##.'],
      ['###', '##.', '.##'],
      ['.##', '###', '##.'],
      ['##.', '###', '##.'],
      ['###', '#..', '###'],
      ['###', '.#.', '###'],
    ],
    regions: [
      {
        dimensions: [4, 4],
        gifts: [0, 0, 0, 0, 2, 0],
      },
      {
        dimensions: [12, 5],
        gifts: [1, 0, 1, 0, 2, 2],
      },
      {
        dimensions: [12, 5],
        gifts: [1, 0, 1, 0, 3, 2],
      },
    ],
  };
  describe('formatData', () => {
    it('Formats the data', async () => {
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
