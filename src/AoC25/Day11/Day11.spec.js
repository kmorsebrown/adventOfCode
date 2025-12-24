const { formatData, partOne, partTwo } = require('./Day11');

// npm test -- src/AoC25/Day11/Day11.spec.js

describe('Day11', () => {
  const mockInput = new Map([
    ['aaa', ['you', 'hhh']],
    ['you', ['bbb', 'ccc']],
    ['bbb', ['ddd', 'eee']],
    ['ccc', ['ddd', 'eee', 'fff']],
    ['ddd', ['ggg']],
    ['eee', ['out']],
    ['fff', ['out']],
    ['ggg', ['out']],
    ['hhh', ['ccc', 'fff', 'iii']],
    ['iii', ['out']],
  ]);

  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day11TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
      expect(actual.get('you')).toEqual(['bbb', 'ccc']);
    });
  });
  describe('partOne', () => {
    it('returns the total number of paths between you and out', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(5);
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
