const {
  formatData,
  getNumPossibleArrangementsForRow,
  partOne,
  partTwo,
} = require('./Day12');

// npm test -- src/AoC23/Day12/Day12.spec.js

describe('Day12', () => {
  const mockData = [
    '???.### 1,1,3',
    '.??..??...?##. 1,1,3',
    '?#?#?#?#?#?#?#? 1,3,1,6',
    '????.#...#... 4,1,1',
    '????.######..#####. 1,6,5',
    '?###???????? 3,2,1',
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day12TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockData);
    });
  });
  describe.skip('getNumPossibleArrangementsForRow', () => {
    it('returns 1 possible arrangement for row 0', () => {
      const row = '???.### 1,1,3';
      expect(getNumPossibleArrangementsForRow(row)).toEqual(1);
    });
    it('returns 4 possible arrangement for row 1', () => {
      const row = '.??..??...?##. 1,1,3';
      expect(getNumPossibleArrangementsForRow(row)).toEqual(4);
    });
    it('returns 1 possible arrangement for row 2', () => {
      const row = '?#?#?#?#?#?#?#? 1,3,1,6';
      expect(getNumPossibleArrangementsForRow(row)).toEqual(1);
    });
    it('returns 1 possible arrangement for row 3', () => {
      const row = '????.#...#... 4,1,1';
      expect(getNumPossibleArrangementsForRow(row)).toEqual(1);
    });
    it('returns 4 possible arrangement for row 4', () => {
      const row = '????.######..#####. 1,6,5';
      expect(getNumPossibleArrangementsForRow(row)).toEqual(4);
    });
    it('returns 10 possible arrangement for row 5', () => {
      const row = '?###???????? 3,2,1';
      expect(getNumPossibleArrangementsForRow(row)).toEqual(10);
    });
  });
  describe.skip('partOne', () => {
    it('Returns the sum of all possible arrangements', async () => {
      const actual = await partOne(mockData);
      expect(actual).toEqual(21);
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
