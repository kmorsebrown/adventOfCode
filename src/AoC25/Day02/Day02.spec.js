const {
  formatData,
  findDuplicatesInRangePartOne,
  filterRangesPartOne,
  partOne,
  filterRangesPartTwo,
  findInvalidIds,
  getSubstring,
  findDivisors,
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

  describe('filterRangesPartOne', () => {
    it('should filter out ranges that cannot have invalid IDs', () => {
      const actual = filterRangesPartOne(mockInput);
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
  describe('findDuplicatesInRangePartOne', () => {
    it('should return one duplicate id when the first half of both the start and end are the same', () => {
      const actual = findDuplicatesInRangePartOne(['38593856', '38593862']);
      expect(actual).toEqual(['38593859']);
    });
    it('should return 2 duplicates 11  -22', () => {
      const actual = findDuplicatesInRangePartOne(['11', '22']);
      expect(actual).toEqual(['11', '22']);
    });
    it('should return 4 duplicates 9575 - 9999', () => {
      const actual = findDuplicatesInRangePartOne(['9575', '9999']);
      expect(actual).toEqual(['9595', '9696', '9797', '9898', '9999']);
    });
  });
  describe('partOne', () => {
    it('Sums all the invalid IDs', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(1227775554);
    });
  });
  describe('filterRangesPartTwo', () => {
    it('should split up ranges that contain both odd and even number of digits', () => {
      const actual = filterRangesPartTwo(mockInput);
      expect(actual).toEqual([
        ['11', '22'],
        ['95', '99'],
        ['100', '115'],
        ['998', '999'],
        ['1000', '1012'],
        ['1188511880', '1188511890'],
        ['222220', '222224'],
        ['1698522', '1698528'],
        ['446443', '446449'],
        ['38593856', '38593862'],
        ['565653', '565659'],
        ['824824821', '824824827'],
        ['2121212118', '2121212124'],
      ]);
    });
  });
  describe('getSubstring', () => {
    it('divides id in half', () => {
      const actual = getSubstring('1234', 2);
      expect(actual).toEqual('12');
    });
    it('divides id in thirds', () => {
      const actual = getSubstring('123456', 3);
      expect(actual).toEqual('12');
    });
    it('cannot divide odd number of digits', () => {
      const actual = getSubstring('12345', 3);
      expect(actual).toBeUndefined;
    });
  });
  describe('findDivisors', () => {
    it('identifies all divisors of id 12', () => {
      const actual = findDivisors('12');
      expect(actual).toEqual([2]);
    }),
      it('identifies all string divisors of id 1234', () => {
        const actual = findDivisors('1234');
        expect(actual).toEqual([2, 4]);
      });
    it('identifies all string divisors of id 123456', () => {
      const actual = findDivisors('123456');
      expect(actual).toEqual([2, 3, 6]);
    });
  });
  describe('findInvalidIds', () => {
    it('returns 2 invalid Ids for 11-22', () => {
      const actual = findInvalidIds(['11', '22']);
      expect(actual).toEqual(['11', '22']);
    });
    it('returns 2 invalid Ids for 798-999', () => {
      const actual = findInvalidIds(['798', '999']);
      expect(actual).toEqual(['888', '999']);
    });
    it('returns 1 invalid Id for 1000-1012', () => {
      const actual = findInvalidIds(['1000', '1012']);
      expect(actual).toEqual(['1010']);
    });
    it('returns 1 invalid Id for 824824821-824824827', () => {
      const actual = findInvalidIds(['824824821', '824824827']);
      expect(actual).toEqual(['824824824']);
    });
    it('returns 1 invalid Id for 222220-222224', () => {
      const actual = findInvalidIds(['222220', '222224']);
      expect(actual).toEqual(['222222']);
    });
    it('returns undefined for 1698522-1698528', () => {
      const actual = findInvalidIds(['1698522', '1698528']);
      expect(actual).toBeUndefined;
    });
  });
  describe('partTwo', () => {
    it('Sums all the invalid IDs', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(4174379265);
    });
  });
});
