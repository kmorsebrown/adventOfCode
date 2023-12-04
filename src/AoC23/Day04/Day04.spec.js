const path = require('path');
const {
  formatData,
  getPoints,
  getMatchingNumbers,
  partOne,
  partTwo,
} = require('./Day04');

// npm test -- src/AoC23/Day04/Day04.spec.js

describe('Day04', () => {
  const formattedData = [
    [
      ['41', '48', '83', '86', '17'],
      ['83', '86', '6', '31', '17', '9', '48', '53'],
    ],
    [
      ['13', '32', '20', '16', '61'],
      ['61', '30', '68', '82', '17', '32', '24', '19'],
    ],
    [
      ['1', '21', '53', '59', '44'],
      ['69', '82', '63', '72', '16', '21', '14', '1'],
    ],
    [
      ['41', '92', '73', '84', '69'],
      ['59', '84', '76', '51', '58', '5', '54', '83'],
    ],
    [
      ['87', '83', '26', '28', '32'],
      ['88', '30', '70', '12', '93', '22', '82', '36'],
    ],
    [
      ['31', '18', '13', '56', '72'],
      ['74', '77', '10', '23', '35', '67', '36', '11'],
    ],
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day04TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(formattedData);
    });
  });
  describe('getPoints', () => {
    it('returns 8 points when first match is worth 1 point and 4 matching numbers', () => {
      expect(getPoints(1, 4)).toEqual(8);
    });
    it('returns 0 points when first match is worth 1 point and 0 matching numbers', () => {
      expect(getPoints(1, 0)).toEqual(0);
    });
    it('returns 1 point when first match is worth 1 point and 1 matching number', () => {
      expect(getPoints(1, 1)).toEqual(1);
    });
    it('returns 2 points when first match is worth 1 point and 2 matching numbers', () => {
      expect(getPoints(1, 2)).toEqual(2);
    });
  });
  describe('getMatchingNumbers', () => {
    it('Returns four winning numbers', () => {
      const card = formattedData[0];
      expect(getMatchingNumbers(card)).toEqual([48, 83, 86, 17]);
    });
    it('Returns two winning numbers', () => {
      const card = formattedData[1];
      expect(getMatchingNumbers(card)).toEqual([32, 61]);
    });
    it('Returns one winning number', () => {
      const card = formattedData[3];
      expect(getMatchingNumbers(card)).toEqual([84]);
    });
    it('Returns no winning numbers', () => {
      const card = formattedData[4];
      expect(getMatchingNumbers(card)).toEqual([]);
    });
  });
  describe('partOne', () => {
    it('Returns sum of points', async () => {
      const actual = await partOne(formattedData);
      expect(actual).toEqual(13);
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
