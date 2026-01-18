import {
  formatData,
  findAccessiblePaper,
  partOne,
  removeRolls,
  partTwo,
} from './Day04.js';

// npm test -- src/AoC25/Day04/Day04.spec.js

describe('Day04', () => {
  const mockInput = [
    ['.', '.', '@', '@', '.', '@', '@', '@', '@', '.'],
    ['@', '@', '@', '.', '@', '.', '@', '.', '@', '@'],
    ['@', '@', '@', '@', '@', '.', '@', '.', '@', '@'],
    ['@', '.', '@', '@', '@', '@', '.', '.', '@', '.'],
    ['@', '@', '.', '@', '@', '@', '@', '.', '@', '@'],
    ['.', '@', '@', '@', '@', '@', '@', '@', '.', '@'],
    ['.', '@', '.', '@', '.', '@', '.', '@', '@', '@'],
    ['@', '.', '@', '@', '@', '.', '@', '@', '@', '@'],
    ['.', '@', '@', '@', '@', '@', '@', '@', '@', '.'],
    ['@', '.', '@', '.', '@', '@', '@', '.', '@', '.'],
  ];

  const mockAccessibleRolls = new Set([
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 5 },
    { row: 0, col: 6 },
    { row: 0, col: 8 },
    { row: 1, col: 0 },
    { row: 2, col: 6 },
    { row: 4, col: 0 },
    { row: 4, col: 9 },
    { row: 7, col: 0 },
    { row: 9, col: 0 },
    { row: 9, col: 2 },
    { row: 9, col: 8 },
  ]);

  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day04TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('findAccessiblePaper', () => {
    it('returns coordinates of rolls of paper that can be accessed by a forklift', async () => {
      const actual = await findAccessiblePaper(mockInput);
      expect(Array.from(actual)).toEqual(
        expect.arrayContaining([...mockAccessibleRolls])
      );
      expect(actual.size).toEqual(mockAccessibleRolls.size);
    });
  });
  describe('partOne', () => {
    it('returns the number of rolls of paper that can be accessed by a forklift', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(13);
    });
  });

  describe('removeRolls', () => {
    it('returns the number of rolls of paper that can be accessed by a forklift', async () => {
      const expected = [
        ['.', '.', '.', '.', '.', '.', '.', '@', '.', '.'],
        ['.', '@', '@', '.', '@', '.', '@', '.', '@', '@'],
        ['@', '@', '@', '@', '@', '.', '.', '.', '@', '@'],
        ['@', '.', '@', '@', '@', '@', '.', '.', '@', '.'],
        ['.', '@', '.', '@', '@', '@', '@', '.', '@', '.'],
        ['.', '@', '@', '@', '@', '@', '@', '@', '.', '@'],
        ['.', '@', '.', '@', '.', '@', '.', '@', '@', '@'],
        ['.', '.', '@', '@', '@', '.', '@', '@', '@', '@'],
        ['.', '@', '@', '@', '@', '@', '@', '@', '@', '.'],
        ['.', '.', '.', '.', '@', '@', '@', '.', '.', '.'],
      ];
      const actual = await removeRolls(mockInput, mockAccessibleRolls);
      expect(actual).toEqual(expected);
    });
  });
  describe('partTwo', () => {
    it('Returns total number of rolls of paper that can be removed by forklift', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(43);
    });
  });
});
