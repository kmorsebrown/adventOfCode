import { formatData, partOne, partTwo } from './DayXX.js';
import { getTestDataPath } from '../../Utils/paths.js';

// npm test -- src/AoC25/DayXX/DayXX.spec.js

describe('DayXX', () => {
  const mockInput = [];
  describe.skip('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = getTestDataPath('XX', import.meta.url);
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe.skip('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(0);
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
