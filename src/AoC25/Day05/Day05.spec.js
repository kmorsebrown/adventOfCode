import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, partOne, partTwo } from './Day05.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC25/Day05/Day05.spec.js

describe('Day05', () => {
  const mockInput = {
    freshIds: [
      [3, 5],
      [10, 14],
      [16, 20],
      [12, 18],
    ],
    availableIds: [1, 5, 8, 11, 17, 32],
  };
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day05TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('partOne', () => {
    it('Returns the number of fresh available ingredients', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(3);
    });
  });
  describe('partTwo', () => {
    it('Returns the number of fresh ids in all ranges', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(14);
    });
  });
});
