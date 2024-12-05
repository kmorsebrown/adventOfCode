const {
  isFirst,
  isLast,
  transpose,
  transposeArrStr,
  flipHoriz,
  rotateOneEighty,
  arrayifyGrid,
  getAdjacentCoords,
  getValueFromCoords,
} = require('./grids.js');
// npm test -- src/Utils/grids.spec.js

describe('grids', () => {
  const mockGrid = ['-L|F7', '7S-7|', 'L|7||', '-L-J|', 'L|-JF'];
  describe('isFirst', () => {
    it('returns true if index is 0', () => {
      expect(isFirst(0)).toEqual(true);
    });
    it('returns false if index is greater than 0', () => {
      expect(isFirst(1)).toEqual(false);
    });
  });
  describe('isLast', () => {
    it('returns true if index is equal to the last index of the array', () => {
      expect(isLast(mockGrid[0].length - 1, mockGrid)).toEqual(true);
    });
    it('returns false if index is greater than 0', () => {
      expect(isLast(mockGrid.length - 2, mockGrid)).toEqual(false);
    });
  });
  describe('transpose', () => {
    it('tranpsoses a two dimensional array', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
      ];
      expect(transpose(arr)).toEqual([
        [1, 4, 7, 10],
        [2, 5, 8, 11],
        [3, 6, 9, 12],
      ]);
    });
  });
  describe('transposeArrStr', () => {
    it('transposes a 1 dimensional array of strings', () => {
      const arr = ['abc', '123', 'xyz'];
      expect(transposeArrStr(arr)).toEqual(['a1x', 'b2y', 'c3z']);
    });
    it('transposes 1 dimensional grid of strings', () => {
      const arr = [
        '#.##..##.',
        '..#.##.#.',
        '##......#',
        '##......#',
        '..#.##.#.',
        '..##..##.',
        '#.#.##.#.',
      ];
      expect(transposeArrStr(arr)).toEqual([
        '#.##..#',
        '..##...',
        '##..###',
        '#....#.',
        '.#..#.#',
        '.#..#.#',
        '#....#.',
        '##..###',
        '..##...',
      ]);
    });
  });
  describe('arrayifyGrid', () => {
    it('arrayifies a grid of strings w/o numbers', () => {
      const arr = ['abc', '.!_', ',e%'];
      expect(arrayifyGrid(arr, '')).toEqual([
        ['a', 'b', 'c'],
        ['.', '!', '_'],
        [',', 'e', '%'],
      ]);
    });
    it('arrayifies a grid of numbers and type converts them', () => {
      const arr = ['1 2 3.4', '-4 56 27.3', '78.0 0.89 2'];
      expect(arrayifyGrid(arr, ' ')).toEqual([
        [1, 2, 3.4],
        [-4, 56, 27.3],
        [78.0, 0.89, 2],
      ]);
    });
  });
  describe('flipHoriz', () => {
    it('flips a grid horizontally', () => {
      const mockGrid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(flipHoriz(mockGrid)).toEqual([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7],
      ]);
    });
  });
  describe('rotateOneEighty', () => {
    it('rotates grid 180 degrees', () => {
      const mockGrid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l'],
      ];
      expect(rotateOneEighty(mockGrid)).toEqual([
        ['l', 'k', 'j', 'i'],
        ['h', 'g', 'f', 'e'],
        ['d', 'c', 'b', 'a'],
      ]);
    });
  });
  describe('getAdjacentCoords', () => {
    it('gets N coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'N',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 0, col: 1 });
    });
    it('gets S coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'S',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 2, col: 1 });
    });
    it('gets E coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'E',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 1, col: 2 });
    });
    it('gets W coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'W',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 1, col: 0 });
    });
    it('gets NW coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'NW',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 0, col: 0 });
    });
    it('gets NE coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'NE',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 0, col: 2 });
    });
    it('gets SE coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'SE',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 2, col: 2 });
    });
    it('gets SW coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'SW',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 2, col: 0 });
    });
  });
  describe('getValueFromCoords', () => {
    it('gets coordinates from grid', () => {
      const mockCoords = { row: 1, col: 1 };
      const mockGrid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l'],
      ];
      const actual = getValueFromCoords(mockGrid, mockCoords);
      expect(actual).toEqual('f');
    });
  });
});
