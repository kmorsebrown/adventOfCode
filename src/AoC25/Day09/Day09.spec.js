const { formatData, partOne, partTwo, getArea } = require('./Day09');

// npm test -- src/AoC25/Day09/Day09.spec.js

describe('Day09', () => {
  const mockInput = [
    [7, 1],
    [11, 1],
    [11, 7],
    [9, 7],
    [9, 5],
    [2, 5],
    [2, 3],
    [7, 3],
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day09TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('getArea', () => {
    it('Returns the area of a rectangle with red corners at 2,5 and 9,7', async () => {
      const actual = await getArea([2, 5], [9, 7]);
      expect(actual).toEqual(24);
    });
    it('Returns the area of a rectangle with red corners at 7,1 and 11,7', async () => {
      const actual = await getArea([7, 1], [11, 7]);
      expect(actual).toEqual(35);
    });
    it('Returns the area of a rectangle with red corners at 7,3 and 2,3', async () => {
      const actual = await getArea([7, 3], [2, 3]);
      expect(actual).toEqual(6);
    });
    it('Returns the area of a rectangle with red corners at 2,5 and 11,1', async () => {
      const actual = await getArea([2, 5], [11, 1]);
      expect(actual).toEqual(50);
    });
  });
  describe('partOne', () => {
    it('Returns the area of the largest possible rectangle', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(50);
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
