const { isFirst, isLast } = require('./grids.js');
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
});
