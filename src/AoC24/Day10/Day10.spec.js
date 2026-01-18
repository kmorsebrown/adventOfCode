import { formatData, partOne, partTwo } from './Day10.js';

// npm test -- src/AoC24/Day10/Day10.spec.js

describe('Day10', () => {
  // 9 trailheads
  // scores [5, 6, 5, 3, 1, 3, 5, 3, 5]
  // total 36
  const mockInput = [
    [8, 9, 0, 1, 0, 1, 2, 3],
    [7, 8, 1, 2, 1, 8, 7, 4],
    [8, 7, 4, 3, 0, 9, 6, 5],
    [9, 6, 5, 4, 9, 8, 7, 4],
    [4, 5, 6, 7, 8, 9, 0, 3],
    [3, 2, 0, 1, 9, 0, 1, 2],
    [0, 1, 3, 2, 9, 8, 0, 1],
    [1, 0, 4, 5, 6, 7, 3, 2],
  ];

  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day10TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('partOne', () => {
    it('returns trailhead score of 2', async () => {
      // I've replaced the `.` in the actual example with `20`
      const oneTrailheadScore2 = [
        [20, 20, 20, 0, 20, 20, 20],
        [20, 20, 20, 1, 20, 20, 20],
        [20, 20, 20, 2, 20, 20, 20],
        [6, 5, 4, 3, 4, 5, 6],
        [7, 20, 20, 20, 20, 20, 7],
        [8, 20, 20, 20, 20, 20, 8],
        [9, 20, 20, 20, 20, 20, 9],
      ];
      const actual = await partOne(oneTrailheadScore2);
      expect(actual).toEqual(2);
    });
    it('returns trailhead score of 4', async () => {
      // I've replaced the `.` in the actual example with `20`
      const oneTrailheadScore4 = [
        [20, 20, 9, 0, 20, 20, 9],
        [20, 20, 20, 1, 20, 9, 8],
        [20, 20, 20, 2, 20, 20, 7],
        [6, 5, 4, 3, 4, 5, 6],
        [7, 6, 5, 20, 9, 8, 7],
        [8, 7, 6, 20, 20, 20, 20],
        [9, 8, 7, 20, 20, 20, 20],
      ];
      const actual = await partOne(oneTrailheadScore4);
      expect(actual).toEqual(4);
    });
    it('returns trailhead score of 3', async () => {
      // I've replaced the `.` in the actual example with `20`
      const twoTrailheadScore3 = [
        [1, 0, 20, 20, 9, 20, 20],
        [2, 20, 20, 20, 8, 20, 20],
        [3, 20, 20, 20, 7, 20, 20],
        [4, 5, 6, 7, 6, 5, 4],
        [20, 20, 20, 8, 20, 20, 3],
        [20, 20, 20, 9, 20, 20, 2],
        [20, 20, 20, 20, 20, 0, 1],
      ];
      const actual = await partOne(twoTrailheadScore3);
      expect(actual).toEqual(3);
    });
    it('returns trailhead score of 36', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(36);
    });
  });
  describe('partTwo', () => {
    it('returns trailhead ratings sum of 3', async () => {
      const oneTrailheadRating3 = [
        [20, 20, 20, 20, 20, 0, 20],
        [20, 20, 4, 3, 2, 1, 20],
        [20, 20, 5, 20, 20, 2, 20],
        [20, 20, 6, 5, 4, 3, 20],
        [20, 20, 7, 20, 20, 4, 20],
        [20, 20, 8, 7, 6, 5, 20],
        [20, 20, 9, 20, 20, 20, 20],
      ];
      const actual = await partTwo(oneTrailheadRating3);
      expect(actual).toEqual(3);
    });
    it('returns trailhead ratings sum of 36', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(81);
    });
  });
});
