const path = require('path');
const {
  formatData,
  countEdgeTrees,
  getTreesAbove,
  getTreesBelow,
  getTreesLeft,
  getTreesRight,
  getDirectionScore,
  getScenicScore,
  partOne,
  partTwo,
} = require('./Day08.js');

// npm test src/AoC22/Day08/Day08.spec.js

const TEST_DATA = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];

describe('Day08', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day08TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(TEST_DATA);
    });
  });
  describe('countEdgeTrees', () => {
    it('Counts the number of visible trees on the edge of the grid', async () => {
      const args = TEST_DATA;
      const actual = await countEdgeTrees(args);
      expect(actual).toEqual(16);
    });
  });
  describe('getTreesAbove', () => {
    it('Returns array of tree heights between tree and top edge, descending', async () => {
      const actual = await getTreesAbove(TEST_DATA, 3, 3);
      expect(actual).toEqual([7, 1, 3]);
    });
  });
  describe('getTreesBelow', () => {
    it('Returns array of tree heights between tree and bottom edge, ascending', async () => {
      const actual = await getTreesBelow(TEST_DATA, 3, 1);
      expect(actual).toEqual([9, 4, 3]);
    });
  });
  describe('getTreesLeft', () => {
    it('Returns array of tree heights between tree and left edge, ascending', async () => {
      const actual = await getTreesLeft(TEST_DATA, 2, 1);
      expect(actual).toEqual([2, 5]);
    });
  });
  describe('getTreesRight', () => {
    it('Returns array of tree heights between tree and right edge, ascending', async () => {
      const actual = await getTreesRight(TEST_DATA, 2, 1);
      expect(actual).toEqual([2, 1]);
    });
  });

  describe('partOne', () => {
    it('TK', async () => {
      const args = TEST_DATA;
      const actual = await partOne(args);
      expect(actual).toEqual(21);
    });
  });
  describe('getDirectionScore', () => {
    it('Get num of trees until view is blocked in a given direction', async () => {
      const actual = await getDirectionScore(5, [3, 5, 3]);
      expect(actual).toEqual(2);
    });
  });
  describe('getScenicScore', () => {
    it('Get sum of directional blocked score for the tree in the middle of the fourth row', async () => {
      const actual = await getScenicScore(TEST_DATA, 2, 3);
      expect(actual).toEqual(8);
    });
    it('Get sum of directional blocked score for the tree in the middle of the second row', async () => {
      const actual = await getScenicScore(TEST_DATA, 2, 1);
      expect(actual).toEqual(4);
    });
  });
  describe('partTwo', () => {
    it('Gets highest possible scenic score', async () => {
      const args = [];
      const actual = await partTwo(TEST_DATA);
      expect(actual).toEqual(8);
    });
  });
});
