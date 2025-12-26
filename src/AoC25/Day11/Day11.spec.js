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
  describe('partTwo', () => {
    it('returns the total number of paths from svr to out that visit both dac and fft', async () => {
      const mockGraph = new Map([
        ['svr', ['aaa', 'bbb']],
        ['aaa', ['fft']],
        ['fft', ['ccc']],
        ['bbb', ['tty']],
        ['tty', ['ccc']],
        ['ccc', ['ddd', 'eee']],
        ['ddd', ['hub']],
        ['hub', ['fff']],
        ['eee', ['dac']],
        ['dac', ['fff']],
        ['fff', ['ggg', 'hhh']],
        ['ggg', ['out']],
        ['hhh', ['out']],
      ]);
      const actual = await partTwo(mockGraph);
      expect(actual).toEqual(2);
    });
  });
});
