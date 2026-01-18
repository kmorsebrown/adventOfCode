import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, partOne, partTwo } from './Day08.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe.skip('Day08', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day08TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([]);
    });
  });
  describe('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(26);
    });
  });
  describe('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(61229);
    });
  });
});
