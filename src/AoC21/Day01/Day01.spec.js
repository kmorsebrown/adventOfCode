import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, getNumIncreases, getSumIncreases } from './Day01.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Day01', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day01TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
      ]);
    });
  });
  describe('getNumIncreases', () => {
    it('returns the largest increase', async () => {
      const args = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      const actual = await getNumIncreases(args);
      expect(actual).toEqual(7);
    });
  });
  describe('getSumIncreases', () => {
    it('returns the largest increase', async () => {
      const args = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      const actual = await getSumIncreases(args);
      expect(actual).toEqual(5);
    });
  });
});
