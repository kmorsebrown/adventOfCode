import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, partOne, partTwo } from './Day01.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC24/Day01/Day01.spec.js

describe('Day01', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day01TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual({
        left_list: [3, 4, 2, 1, 3, 3],
        right_list: [4, 3, 5, 3, 9, 3],
      });
    });
  });
  describe('partOne', () => {
    it('Finds the total distance between the lists', async () => {
      const args = {
        left_list: [3, 4, 2, 1, 3, 3],
        right_list: [4, 3, 5, 3, 9, 3],
      };
      const actual = await partOne(args);
      expect(actual).toEqual(11);
    });
  });
  describe('partTwo', () => {
    it('Finds the similarity score', async () => {
      const args = {
        left_list: [3, 4, 2, 1, 3, 3],
        right_list: [4, 3, 5, 3, 9, 3],
      };
      const actual = await partTwo(args);
      expect(actual).toEqual(31);
    });
  });
});
