import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, partOne, partTwo } from './DayXX.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC23/DayXX/DayXX.spec.js

describe.skip('DayXX', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./DayXXTestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual([]);
    });
  });
  describe('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(0);
    });
  });
  describe('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(0);
    });
  });
});
