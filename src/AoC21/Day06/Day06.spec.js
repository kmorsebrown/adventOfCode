import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, partOne, partTwo } from './Day06.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe.skip('Day06', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day06TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([]);
    });
  });
  describe('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(5934);
    });
  });
  describe('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(26984457539);
    });
  });
});
