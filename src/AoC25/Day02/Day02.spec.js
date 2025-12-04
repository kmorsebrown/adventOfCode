const {
  formatData,
  findDuplicatesInRange,
  filterRanges,
  partOne,
  partTwo,
} = require('./Day02');

// npm test -- src/AoC25/Day02/Day02.spec.js

describe('Day02', () => {
  const mockInput = [
    ['11', '22'],
    ['95', '115'],
    ['998', '1012'],
    ['1188511880', '1188511890'],
    ['222220', '222224'],
    ['1698522', '1698528'],
    ['446443', '446449'],
    ['38593856', '38593862'],
    ['565653', '565659'],
    ['824824821', '824824827'],
    ['2121212118', '2121212124'],
  ];

  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day02TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });

  describe('filterRanges', () => {
    it('should filter out ranges that cannot have invalid IDs', () => {
      const actual = filterRanges(mockInput);
      expect(actual).toEqual([
        ['11', '22'],
        ['95', '99'],
        ['1000', '1012'],
        ['1188511880', '1188511890'],
        ['222220', '222224'],
        ['446443', '446449'],
        ['38593856', '38593862'],
      ]);
    });
  });
  describe('findDuplicatesInRange', () => {
    it('should return one duplicate id when the first half of both the start and end are the same', () => {
      const actual = findDuplicatesInRange(['38593856', '38593862']);
      expect(actual).toEqual(['38593859']);
    });
    it('should return 2 duplicates 11  -22', () => {
      const actual = findDuplicatesInRange(['11', '22']);
      expect(actual).toEqual(['11', '22']);
    });
    it('should return 4 duplicates 9575 - 9999', () => {
      const actual = findDuplicatesInRange(['9575', '9999']);
      expect(actual).toEqual(['9595', '9696', '9797', '9898', '9999']);
    });
  });
  describe('partOne', () => {
    it('Sums all the invalid IDs', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(1227775554);
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
