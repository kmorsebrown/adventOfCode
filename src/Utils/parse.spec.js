const { parseStringOfInts, unique } = require('./parse.js');

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
  });
  describe('unique', () => {
    it('returns only unique values in an array', () => {
      const mockArr = ['a', 1, 'a', 2, '1', 2, 'b', 'B'];
      expect(unique(mockArr)).toEqual(['a', 1, 2, '1', 'b', 'B']);
    });
  });
});
