const { isFirst, isLast, transpose, transposeArrStr } = require('./grids.js');
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
    it('tranpsoses a 1 dimensional array of strings', () => {
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
});
