const path = require('path');
const { formatData, getCoords, partOne, partTwo } = require('./Day12.js');

// npm test src/AoC22/Day12/Day12.spec.js

describe('Day12', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day12TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        [1, 1, 2, 17, 16, 15, 14, 13],
        [1, 2, 3, 18, 25, 24, 24, 12],
        [1, 3, 3, 19, 26, 26, 24, 11],
        [1, 3, 3, 20, 21, 22, 23, 10],
        [1, 2, 4, 5, 6, 7, 8, 9],
      ]);
    });
  });
  describe('getCoords', () => {
    it('gets the coordinates of the starting position', async () => {
      const data = path.join(__dirname, 'Day12TestData.txt');
      const actual = await getCoords(data, 'S');
      expect(actual).toEqual({ x: 0, y: 0 });
    });
    it('gets the coordinates of the ending position', async () => {
      const data = path.join(__dirname, 'Day12TestData.txt');
      const actual = await getCoords(data, 'E');
      expect(actual).toEqual({ x: 2, y: 5 });
    });
  });
  describe.skip('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(31);
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
