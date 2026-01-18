import { formatData, partOne, partTwo } from './Day03.js';
import { getTestDataPath } from '../../Utils/paths.js';

// npm test -- src/AoC15/Day03/Day03.spec.js

describe('Day03', () => {
  const mockInput = '>^>v<^v^v^v^v^v';
  describe('formatData', () => {
    it('Formats the data into a string', async () => {
      const args = getTestDataPath('03', import.meta.url);
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('partOne', () => {
    it('delivers gifts to two houses', async () => {
      const actual = await partOne('>');
      expect(actual).toEqual(2);
    });
    it('delivers gifts to four houses', async () => {
      const actual = await partOne('^>v<');
      expect(actual).toEqual(4);
    });
    it('delivers gifts to two houses', async () => {
      const actual = await partOne('^v^v^v^v^v');
      expect(actual).toEqual(2);
    });
  });
  describe('partTwo', () => {
    it('delivers gifts to three houses when ^v', async () => {
      const actual = await partTwo('^v');
      expect(actual).toEqual(3);
    });
    it('delivers gifts to three houses when ^>v<', async () => {
      const actual = await partTwo('^>v<');
      expect(actual).toEqual(3);
    });
    it('delivers gifts to 11 houses', async () => {
      const actual = await partTwo('^v^v^v^v^v');
      expect(actual).toEqual(11);
    });
  });
});
