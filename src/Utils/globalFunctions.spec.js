const { getData, parseStringOfInts } = require('./globalFunctions.js');
const path = require('path');

describe('globalFunctions', () => {
  describe('getData', () => {
    it('Reads text file', async () => {
      const args = require.resolve('./testDataForSpec.txt');
      const actual = await getData(args);
      expect(actual).toEqual('Hello.');
    });
  });
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
