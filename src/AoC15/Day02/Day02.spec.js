import { formatData, getSurfaceArea, partOne, partTwo } from './Day02.js';
import { getTestDataPath } from '../../Utils/paths.js';

// npm test -- src/AoC15/Day02/Day02.spec.js

describe('Day02', () => {
  const mockInput = [
    [2, 3, 4],
    [1, 1, 10],
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = getTestDataPath('02', import.meta.url);
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('getSurfaceArea', () => {
    it('returns 58 for 2x3x4', () => {
      const actual = getSurfaceArea([2, 3, 4]);
      expect(actual).toEqual(58);
    });
    it('returns 43 for 1x1x10', () => {
      const actual = getSurfaceArea([1, 1, 10]);
      expect(actual).toEqual(43);
    });
  });
  describe('partOne', () => {
    it('returns the total surface area', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(58 + 43);
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
