import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData,
  isSafe,
  partOne,
  isSafePtTwo,
  partTwo,
} from './Day02.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC24/Day02/Day02.spec.js

describe('Day02', () => {
  const mockFormattedData = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day02TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockFormattedData);
    });
  });
  describe('isSafe', () => {
    it('Returns true when the levels are all decreasing by 1 or 2', () => {
      const actual = isSafe([7, 6, 4, 2, 1]);
      expect(actual).toEqual({ isSafe: true, badLevels: new Set() });
    });
    it('Returns false when two levels are decreasing by 5', () => {
      const actual = isSafe([1, 2, 7, 8, 9]);
      expect(actual).toEqual({ isSafe: false, badLevels: new Set([1, 2]) });
    });
    it('Returns false when two levels are decreasing by 4', () => {
      const actual = isSafe([9, 7, 6, 2, 1]);
      expect(actual).toEqual({ isSafe: false, badLevels: new Set([2, 3]) });
    });
    it('Returns false when some levels are decreasing and others are increasing', () => {
      const actual = isSafe([1, 3, 2, 4, 5]);
      expect(actual).toEqual({ isSafe: false, badLevels: new Set([1, 2]) });
    });
    it('Returns false when two adjacent levels are the same', () => {
      const actual = isSafe([8, 6, 4, 4, 1]);
      expect(actual).toEqual({ isSafe: false, badLevels: new Set([2, 3]) });
    });
    it('Returns true when all adjacent levels are increasing by 1, 2, or 3', () => {
      const actual = isSafe([1, 3, 6, 7, 9]);
      expect(actual).toEqual({ isSafe: true, badLevels: new Set() });
    });
  });
  describe('partOne', () => {
    it('Returns the number of safe reports', async () => {
      const actual = await partOne(mockFormattedData);
      expect(actual).toEqual(2);
    });
  });
  describe('isSafePtTwo', () => {
    it('Returns true when the levels are all decreasing by 1 or 2', () => {
      const actual = isSafePtTwo([7, 6, 4, 2, 1]);
      expect(actual).toEqual(true);
    });
    it('Returns false when two levels are decreasing by 5', () => {
      const actual = isSafePtTwo([1, 2, 7, 8, 9]);
      expect(actual).toEqual(false);
    });
    it('Returns false when two levels are decreasing by 4', () => {
      const actual = isSafePtTwo([9, 7, 6, 2, 1]);
      expect(actual).toEqual(false);
    });
    it('Returns true when level with too high increase is removed causing a decrease in an otherwise increasing sequence', () => {
      const actual = isSafePtTwo([1, 3, 2, 4, 5]);
      expect(actual).toEqual(true);
    });
    it('Returns true when removing either of two adjacent levels renders the report safe', () => {
      const actual = isSafePtTwo([8, 6, 4, 4, 1]);
      expect(actual).toEqual(true);
    });
    it('Returns true when all adjacent levels are increasing by 1, 2, or 3', () => {
      const actual = isSafePtTwo([1, 3, 6, 7, 9]);
      expect(actual).toEqual(true);
    });
    it('Returns true when removing level prior to bad level causes record to be safe', () => {
      const actual = isSafePtTwo([64, 63, 64, 66, 67]);
      expect(actual).toEqual(true);
    });
    it('Returns true when decreasing level is removed in an otherwise increasing sequence', () => {
      const actual = isSafePtTwo([62, 63, 60, 65, 67]);
      expect(actual).toEqual(true);
    });
    it('Returns true when removing last level of unsafe report causes report to be save', () => {
      const actual = isSafePtTwo([7, 6, 4, 2, 1, 3]);
      expect(actual).toEqual(true);
    });
  });
  describe('partTwo', () => {
    it('Returns the number of safe reports', async () => {
      const actual = await partTwo(mockFormattedData);
      expect(actual).toEqual(4);
    });
  });
});
