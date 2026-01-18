import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  formatData,
  getCountOfFullyContainedOverlaps,
  getNumOverlaps,
} from './Day04.js';

describe('Day04', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day04TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        ['2', '4', '6', '8'],
        ['2', '3', '4', '5'],
        ['5', '7', '7', '9'],
        ['2', '8', '3', '7'],
        ['6', '6', '4', '6'],
        ['2', '6', '4', '8'],
      ]);
    });
  });
  describe('getCountOfFullyContainedOverlaps', () => {
    it('Finds the number of pairs where one range is fully contained within the other', async () => {
      const args = [
        ['2', '4', '6', '8'],
        ['2', '3', '4', '5'],
        ['5', '7', '7', '9'],
        ['2', '8', '3', '7'],
        ['6', '6', '4', '6'],
        ['2', '6', '4', '8'],
      ];
      const actual = await getCountOfFullyContainedOverlaps(args);
      expect(actual).toEqual(2);
    });
  });
  describe('getNumOverlaps', () => {
    it('Finds the number of pairs with sections that overlap', async () => {
      const args = [
        ['2', '4', '6', '8'],
        ['2', '3', '4', '5'],
        ['5', '7', '7', '9'],
        ['2', '8', '3', '7'],
        ['6', '6', '4', '6'],
        ['2', '6', '4', '8'],
      ];
      const actual = await getNumOverlaps(args);
      expect(actual).toEqual(4);
    });
  });
});
