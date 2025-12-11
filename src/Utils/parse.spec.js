const { parseStringOfInts, mergeOverlap, unique } = require('./parse.js');

describe('parse', () => {
  describe('parseStringOfInts', () => {
    it('parses integers from space seperated string', () => {
      const input = '83 86  6 31 17  9 48 53';
      expect(parseStringOfInts(input, ' ')).toEqual([
        83, 86, 6, 31, 17, 9, 48, 53,
      ]);
    });
    it('parses integers from comma seperated string', () => {
      const input = '83, 86,  6, 31, 17,  9, 48, 53';
      expect(parseStringOfInts(input, ',')).toEqual([
        83, 86, 6, 31, 17, 9, 48, 53,
      ]);
    });
    it('parses negative integers from comma seperated string', () => {
      const input = '83, -86,  6, 31, -17,  9, 48, 53';
      expect(parseStringOfInts(input, ',')).toEqual([
        83, -86, 6, 31, -17, 9, 48, 53,
      ]);
    });
  });
  describe('unique', () => {
    it('returns only unique values in an array', () => {
      const mockArr = ['a', 1, 'a', 2, '1', 2, 'b', 'B'];
      expect(unique(mockArr)).toEqual(['a', 1, 2, '1', 'b', 'B']);
    });
  });
  describe('mergeOverlap', () => {
    it('merges overlapping ranges in array of rages', () => {
      const mockArr = [
        [7, 8],
        [1, 5],
        [2, 4],
        [4, 6],
      ];
      const actual = mergeOverlap(mockArr);
      expect(actual).toEqual([
        [1, 6],
        [7, 8],
      ]);
    });
  });
});
