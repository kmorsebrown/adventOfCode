import {
  formatData,
  concatAndValidate,
  getCoordinatesForAllCases,
  getDirectionsToCheck,
  getPartOneMatches,
  removeSides,
  partOne,
  partTwo,
} from './Day04.js';

// npm test -- src/AoC24/Day04/Day04.spec.js

describe('Day04', () => {
  const mockL2R = [
    ['X', 'M', 'A', 'S', 'S'],
    ['M', 'A', 'S', 'X', 'X'],
    ['S', 'X', 'X', 'S', 'M'],
  ];
  const mockT2B = [
    ['M', 'X', 'X', 'S'],
    ['S', 'M', 'S', 'X'],
    ['X', 'A', 'X', 'M'],
    ['M', 'S', 'X', 'M'],
    ['X', 'X', 'M', 'X'],
  ];
  const mockTL2BR = [
    ['X', 'X', 'M', 'S'],
    ['M', 'M', 'X', 'X'],
    ['X', 'S', 'A', 'S'],
    ['S', 'X', 'X', 'S'],
    ['X', 'S', 'S', 'M'],
  ];
  const mockBL2TR = [
    ['X', 'M', 'M', 'X'],
    ['S', 'S', 'M', 'S'],
    ['X', 'X', 'A', 'S'],
    ['M', 'M', 'X', 'X'],
    ['X', 'M', 'S', 'X'],
  ];
  const mockTwoOverlap = [
    ['00', '01', '02', 'X'],
    ['X', '11', 'X', '13'],
    ['X', 'M', 'A', 'S'],
    ['30', '31', 'A', '33'],
    ['X', 'X', '42', 'S'],
  ];

  const mockTestPuzzle = [
    ['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'],
    ['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'],
    ['A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M'],
    ['M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X'],
    ['X', 'M', 'A', 'S', 'A', 'M', 'X', 'A', 'M', 'M'],
    ['X', 'X', 'A', 'M', 'M', 'X', 'X', 'A', 'M', 'A'],
    ['S', 'M', 'S', 'M', 'S', 'A', 'S', 'X', 'S', 'S'],
    ['S', 'A', 'X', 'A', 'M', 'A', 'S', 'A', 'A', 'A'],
    ['M', 'A', 'M', 'M', 'M', 'X', 'M', 'M', 'M', 'M'],
    ['M', 'X', 'M', 'X', 'A', 'X', 'M', 'A', 'S', 'X'],
  ];

  const mockTestCoords = [
    { row: 0, col: 4 },
    { row: 0, col: 5 },
    { row: 1, col: 4 },
    { row: 2, col: 2 },
    { row: 2, col: 4 },
    { row: 3, col: 9 },
    { row: 4, col: 0 },
    { row: 4, col: 6 },
    { row: 5, col: 0 },
    { row: 5, col: 1 },
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 6, col: 7 },
    { row: 7, col: 2 },
    { row: 8, col: 5 },
    { row: 9, col: 1 },
    { row: 9, col: 3 },
    { row: 9, col: 5 },
    { row: 9, col: 9 },
  ];

  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day04TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockTestPuzzle);
    });
  });
  describe('concatAndValidate', () => {
    it('returns true for XMAS', () => {
      const actual = concatAndValidate(['X', 'M', 'A', 'S'], 'XMAS');
      expect(actual).toEqual(true);
    });
    it('returns false for SAMX', () => {
      const actual = concatAndValidate(['S', 'A', 'M', 'X'], 'XMAS');
      expect(actual).toEqual(false);
    });
    it('returns false for XMSA', () => {
      const actual = concatAndValidate(['X', 'M', 'S', 'A'], 'XMAS');
      expect(actual).toEqual(false);
    });
  });
  describe('getCoordinatesForAllCases', () => {
    it('returns all coordinates for K vals', () => {
      const mockGrid = [
        ['M', 'A', 'K'],
        ['S', 'M', 'A'],
        ['K', 'K', 'M'],
      ];

      const actual = getCoordinatesForAllCases(mockGrid, 'K');
      expect(actual).toEqual([
        { row: 0, col: 2 },
        { row: 2, col: 0 },
        { row: 2, col: 1 },
      ]);
    });
    it('returns all coordinates for X vals', () => {
      const actual = getCoordinatesForAllCases(mockTestPuzzle, 'X');
      expect(actual).toEqual(mockTestCoords);
    });
  });
  describe('getDirectionsToCheck', () => {
    it('returns directions for NW most corner', () => {
      const mockGrid = [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22'],
      ];
      const args = { width: 3, height: 3, row: 0, col: 0, string: 'tan' };
      const actual = getDirectionsToCheck(args);
      expect(actual).toEqual(['E', 'S', 'SE']);
    });
    it('returns directions for SW most corner', () => {
      const mockGrid = [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22'],
      ];
      const args = { width: 3, height: 3, row: 3, col: 0, string: 'tan' };
      const actual = getDirectionsToCheck(args);
      expect(actual).toEqual(['E', 'NE']);
    });
    it('returns directions for NE most corner', () => {
      const mockGrid = [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22'],
      ];
      const args = { width: 3, height: 3, row: 0, col: 3, string: 'tan' };
      const actual = getDirectionsToCheck(args);
      expect(actual).toEqual(['S']);
    });
    it('returns directions for SE most corner', () => {
      const mockGrid = [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22'],
      ];
      const args = { width: 3, height: 3, row: 3, col: 3, string: 'tan' };
      const actual = getDirectionsToCheck(args);
      expect(actual).toEqual([]);
    });
  });
  describe('getPartOneMatches', () => {
    it('returns 2 matches', async () => {
      const actual = await getPartOneMatches(mockTwoOverlap, 'XMAS');
      expect(actual).toEqual(2);
    });
  });
  describe('partOne', () => {
    it('Returns the number of XMAS matches', async () => {
      const actual = await partOne(mockTestPuzzle);
      expect(actual).toEqual(18);
    });
  });
  describe('removeSides', () => {
    it('removes all sides of a grid', () => {
      const mockGrid = [
        ['00', '01', '02', '03'],
        ['10', '11', '12', '13'],
        ['20', '21', '22', '23'],
        ['30', '31', '32', '33'],
      ];
      const actual = removeSides(mockGrid);
      expect(actual).toEqual([
        ['11', '12'],
        ['21', '22'],
      ]);
    });
  });
  describe('partTwo', () => {
    it('Returns the number of X-MAS matches', async () => {
      const actual = await partTwo(mockTestPuzzle, 'MAS');
      expect(actual).toEqual(9);
    });
  });
});
