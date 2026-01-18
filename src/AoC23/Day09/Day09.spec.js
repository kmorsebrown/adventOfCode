import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData,
  getLastStepHistory,
  getNextNumberInSequence,
  partOne,
  getFirstStepHistory,
  getPrevNumberInSequence,
  partTwo,
} from './Day09.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC23/Day09/Day09.spec.js

describe('Day09', () => {
  const mockData = [
    [0, 3, 6, 9, 12, 15],
    [1, 3, 6, 10, 15, 21],
    [10, 13, 16, 21, 30, 45],
  ];
  describe('formatData', () => {
    it('Formats the data into an array of arrays', async () => {
      const args = new URL('./Day09TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockData);
    });
  });
  describe('getLastStepHistory', () => {
    it('returns array with the last step in history of first sequence until 0', () => {
      expect(getLastStepHistory([0, 3, 6, 9, 12, 15])).toEqual([15, 3, 0]);
    });
    it('returns array with the last step in history of first second until 0', () => {
      expect(getLastStepHistory([1, 3, 6, 10, 15, 21])).toEqual([21, 6, 1, 0]);
    });
    it('returns array with the last step in history of third second until 0', () => {
      expect(getLastStepHistory([10, 13, 16, 21, 30, 45])).toEqual([
        45, 15, 6, 2, 0,
      ]);
    });
  });
  describe('getNextNumberInSequence', () => {
    it('returns array of the next number in first sequence', () => {
      expect(getNextNumberInSequence([15, 3, 0])).toEqual(18);
    });
    it('returns array of the next number in second sequence', () => {
      expect(getNextNumberInSequence([21, 6, 1, 0])).toEqual(28);
    });
    it('returns array of the next number in third sequence', () => {
      expect(getNextNumberInSequence([45, 15, 6, 2, 0])).toEqual(68);
    });
  });
  describe('getFirstStepHistory', () => {
    it('returns array with the last step in history of first sequence until 0', () => {
      expect(getFirstStepHistory([0, 3, 6, 9, 12, 15])).toEqual([0, 3, 0]);
    });
    it('returns array with the last step in history of first second until 0', () => {
      expect(getFirstStepHistory([1, 3, 6, 10, 15, 21])).toEqual([1, 2, 1, 0]);
    });
    it('returns array with the last step in history of third second until 0', () => {
      expect(getFirstStepHistory([10, 13, 16, 21, 30, 45])).toEqual([
        10, 3, 0, 2, 0,
      ]);
    });
  });
  describe('getPrevNumberInSequence', () => {
    it('returns array of the first number history in first sequence', () => {
      expect(getPrevNumberInSequence([0, 3, 0])).toEqual(-3);
    });
    it('returns array of the first number history in second sequence', () => {
      expect(getPrevNumberInSequence([1, 2, 1, 0])).toEqual(0);
    });
    it('returns array of the first number history in third sequence', () => {
      expect(getPrevNumberInSequence([10, 3, 0, 2, 0])).toEqual(5);
    });
  });
  describe('partOne', () => {
    it('returns the sum of the next step in every sequence', async () => {
      const actual = await partOne(mockData);
      expect(actual).toEqual(114);
    });
  });
  describe('partTwo', () => {
    it('returns the sum of the previous step in every sequence', async () => {
      const actual = await partTwo(mockData);
      expect(actual).toEqual(2);
    });
  });
});
