const {
  formatData,
  getGalaxyCoords,
  expandUniverse,
  getDistance,
  partOne,
  partTwo,
} = require('./Day11');

// npm test -- src/AoC23/Day11/Day11.spec.js

describe('Day11', () => {
  const mockData = [
    '...#......',
    '.......#..',
    '#.........',
    '..........',
    '......#...',
    '.#........',
    '.........#',
    '..........',
    '.......#..',
    '#...#.....',
  ];
  const mockGalaxiesPreExpansion = new Map([
    [1, { y: 0, x: 3 }],
    [2, { y: 1, x: 7 }],
    [3, { y: 2, x: 0 }],
    [4, { y: 4, x: 6 }],
    [5, { y: 5, x: 1 }],
    [6, { y: 6, x: 9 }],
    [7, { y: 8, x: 7 }],
    [8, { y: 9, x: 0 }],
    [9, { y: 9, x: 4 }],
  ]);
  const mockGalaxiesPostExpansion = new Map([
    [1, { y: 0, x: 4 }],
    [2, { y: 1, x: 9 }],
    [3, { y: 2, x: 0 }],
    [4, { y: 5, x: 8 }],
    [5, { y: 6, x: 1 }],
    [6, { y: 7, x: 12 }],
    [7, { y: 10, x: 9 }],
    [8, { y: 11, x: 0 }],
    [9, { y: 11, x: 5 }],
  ]);
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day11TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockData);
    });
  });
  describe('getGalaxyCoords', () => {
    it('returns a map of each galaxy and its coordinates', () => {
      expect(getGalaxyCoords(mockData)).toEqual(mockGalaxiesPreExpansion);
    });
  });
  describe('expandUniverse', () => {
    it('expands width of empty rows and columns', () => {
      expect(expandUniverse(mockData, 1)).toEqual(mockGalaxiesPostExpansion);
    });
  });
  describe('getDistance', () => {
    it('returns the steps between galaxies 1 and 7', () => {
      expect(getDistance(mockGalaxiesPostExpansion, 1, 7)).toEqual(15);
    });
    it('returns the steps between galaxies 3 and 6', () => {
      expect(getDistance(mockGalaxiesPostExpansion, 3, 6)).toEqual(17);
    });
    it('returns the steps between galaxies 8 and 9', () => {
      expect(getDistance(mockGalaxiesPostExpansion, 8, 9)).toEqual(5);
    });
  });
  describe('partOne', () => {
    it('Returns sum of lengths between all pairs of galaxies', async () => {
      const actual = await partOne(mockData);
      expect(actual).toEqual(374);
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
