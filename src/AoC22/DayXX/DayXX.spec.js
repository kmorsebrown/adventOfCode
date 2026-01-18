import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { formatData, partOne, partTwo } from './DayXX.js';

// npm test src/AoC22/DayXX/DayXX.spec.js

describe.skip('DayXX', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'DayXXTestData.txt');
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
