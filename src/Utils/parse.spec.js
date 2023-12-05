const { parseStringOfInts } = require('./parse.js');

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
});
