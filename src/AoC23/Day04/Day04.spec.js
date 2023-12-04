const path = require('path');
const {
  formatData,
  getPoints,
  getMatchingNumbers,
  partOne,
  getWinningCards,
  getCardStats,
  makeCopies,
  getTotalCards,
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
  const mockWinningCards = new Map([
    ['Card 1', { cardIndex: 0, numMatches: 4 }],
    ['Card 2', { cardIndex: 1, numMatches: 2 }],
    ['Card 3', { cardIndex: 2, numMatches: 2 }],
    ['Card 4', { cardIndex: 3, numMatches: 1 }],
  ]);
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
  describe('getWinningCards', () => {
    it('gets winning cards', () => {
      expect(getWinningCards(formattedData)).toEqual(mockWinningCards);
    });
  });
  describe('getCardStats', () => {
    const mockCardsMap = new Map([
      ['Card 1', 1],
      ['Card 2', 1],
      ['Card 3', 1],
      ['Card 4', 1],
      ['Card 5', 1],
      ['Card 6', 1],
    ]);
    it('Creates a map of all the cards', () => {
      expect(getCardStats(formattedData)).toEqual(mockCardsMap);
    });
  });
  describe('makeCopies', () => {
    it('makes copies of Card 1', () => {
      const mockCardsMapCopies = new Map([
        ['Card 1', 1],
        ['Card 2', 1],
        ['Card 3', 1],
        ['Card 4', 1],
        ['Card 5', 1],
        ['Card 6', 1],
      ]);
      makeCopies(
        mockCardsMapCopies,
        mockCardsMapCopies.get('Card 1'),
        1,
        mockWinningCards.get('Card 1').numMatches
      );
      expect(mockCardsMapCopies).toEqual(
        new Map([
          ['Card 1', 1],
          ['Card 2', 2],
          ['Card 3', 2],
          ['Card 4', 2],
          ['Card 5', 2],
          ['Card 6', 1],
        ])
      );
    });
    it('makes copies of Card 4', () => {
      const mockCardsMapCopies = new Map([
        ['Card 1', 1],
        ['Card 2', 2],
        ['Card 3', 4],
        ['Card 4', 8],
        ['Card 5', 6],
        ['Card 6', 1],
      ]);
      makeCopies(
        mockCardsMapCopies,
        mockCardsMapCopies.get('Card 4'),
        4,
        mockWinningCards.get('Card 4').numMatches
      );
      expect(mockCardsMapCopies).toEqual(
        new Map([
          ['Card 1', 1],
          ['Card 2', 2],
          ['Card 3', 4],
          ['Card 4', 8],
          ['Card 5', 14],
          ['Card 6', 1],
        ])
      );
    });
    it('makes no copies of Card 5', () => {
      const mockCardsMapCopies = new Map([
        ['Card 1', 1],
        ['Card 2', 2],
        ['Card 3', 4],
        ['Card 4', 8],
        ['Card 5', 14],
        ['Card 6', 1],
      ]);
      makeCopies(mockCardsMapCopies, mockCardsMapCopies.get('Card 5'), 5, 0);
      expect(mockCardsMapCopies).toEqual(
        new Map([
          ['Card 1', 1],
          ['Card 2', 2],
          ['Card 3', 4],
          ['Card 4', 8],
          ['Card 5', 14],
          ['Card 6', 1],
        ])
      );
    });
  });
  describe('getTotalCards', () => {
    const mockCardsMap = new Map([
      ['Card 1', 1],
      ['Card 2', 1],
      ['Card 3', 1],
      ['Card 4', 1],
      ['Card 5', 1],
      ['Card 6', 1],
    ]);
    it('Sets total cards in map', () => {
      getTotalCards(mockCardsMap, mockWinningCards);
      expect(mockCardsMap).toEqual(
        new Map([
          ['Card 1', 1],
          ['Card 2', 2],
          ['Card 3', 4],
          ['Card 4', 8],
          ['Card 5', 14],
          ['Card 6', 1],
        ])
      );
    });
  });
  describe('partTwo', () => {
    it('Get total number of scratch cards', async () => {
      const actual = await partTwo(formattedData);
      expect(actual).toEqual(30);
    });
  });
});
