const path = require('path');
const {
  formatData,
  getCoords,
  getPossibleMoves,
  partOne,
  partTwo,
} = require('./Day12.js');

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
      expect(actual).toEqual('x0y0');
    });
    it('gets the coordinates of the ending position', async () => {
      const data = path.join(__dirname, 'Day12TestData.txt');
      const actual = await getCoords(data, 'E');
      expect(actual).toEqual('x5y2');
    });
  });
  describe('getPossibleMoves', () => {
    const possibleMovesSourceData = [
      [1, 1, 2, 17, 16, 15, 14, 13],
      [1, 2, 3, 18, 25, 24, 24, 12],
      [1, 3, 3, 19, 26, 26, 24, 11],
      [1, 3, 3, 20, 21, 22, 23, 10],
      [1, 2, 4, 5, 6, 7, 8, 9],
    ];
    it('gets the possible moves from current position x1 y1', () => {
      const actual = getPossibleMoves({ x: 1, y: 1 }, possibleMovesSourceData);
      expect(actual).toEqual([
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ]);
    });
    it('gets the possible moves from current position x0 y0', () => {
      const actual = getPossibleMoves({ x: 0, y: 0 }, possibleMovesSourceData);
      expect(actual).toEqual([
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ]);
    });
    it('gets the possible moves from current position x7 y4', () => {
      const actual = getPossibleMoves({ x: 7, y: 4 }, possibleMovesSourceData);
      expect(actual).toEqual([{ x: 7, y: 3 }]);
    });
  });
  describe('partOne', () => {
    it('Returns minimum number of steps to reach highest point', async () => {
      const start = 'x0y0';
      const end = 'x5y2';
      const data = [
        [1, 1, 2, 17, 16, 15, 14, 13],
        [1, 2, 3, 18, 25, 24, 24, 12],
        [1, 3, 3, 19, 26, 26, 24, 11],
        [1, 3, 3, 20, 21, 22, 23, 10],
        [1, 2, 4, 5, 6, 7, 8, 9],
      ];
      const actual = await partOne(data, start, end);
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
