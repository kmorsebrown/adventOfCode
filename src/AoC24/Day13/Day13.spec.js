import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData,
  solveAandB,
  partOne,
  solveAandBpt2,
  partTwo,
} from './Day13.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC24/Day13/Day13.spec.js

describe('Day13', () => {
  const mockInput = [
    {
      A: { x: 94, y: 34 },
      B: { x: 22, y: 67 },
      P: { x: 8400, y: 5400 },
    },
    {
      A: { x: 26, y: 66 },
      B: { x: 67, y: 21 },
      P: { x: 12748, y: 12176 },
    },
    {
      A: { x: 17, y: 86 },
      B: { x: 84, y: 37 },
      P: { x: 7870, y: 6450 },
    },
    {
      A: { x: 69, y: 23 },
      B: { x: 27, y: 71 },
      P: { x: 18641, y: 10279 },
    },
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day13TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('solveAandB', () => {
    it('returns 80 for A and 40 for B', () => {
      const actual = solveAandB(
        {
          A: { x: 94, y: 34 },
          B: { x: 22, y: 67 },
          P: { x: 8400, y: 5400 },
        },
        100
      );
      expect(actual).toEqual({ A: 80, B: 40 });
    });
    it('returns undefined when no combination of A & B will win a prize', () => {
      const actual = solveAandB(
        {
          A: { x: 26, y: 66 },
          B: { x: 67, y: 21 },
          P: { x: 12748, y: 12176 },
        },
        100
      );

      expect(actual).toBeUndefined();
    });
    it('returns A 38 and B 86', () => {
      const actual = solveAandB(
        {
          A: { x: 17, y: 86 },
          B: { x: 84, y: 37 },
          P: { x: 7870, y: 6450 },
        },
        100
      );

      // 38 * 17 + 86 * 84 = 7870
      // 38 * 86 + 86 * 37 = 6450
      expect(actual).toEqual({ A: 38, B: 86 }, 100);
    });
    it('returns undefined when no combination of A & B will win a prize', () => {
      const actual = solveAandB(
        {
          A: { x: 69, y: 23 },
          B: { x: 27, y: 71 },
          P: { x: 18641, y: 10279 },
        },
        100
      );

      expect(actual).toBeUndefined();
    });
  });
  describe('partOne', () => {
    it('Returns the fewest num tokens required to win the most prizes', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(480);
    });
  });
  describe('solveAandBpt2', () => {
    it('returns undefined when 10000000000000 added to prize coords', () => {
      let actual = solveAandBpt2({
        A: { x: 94, y: 34 },
        B: { x: 22, y: 67 },
        P: { x: 8400, y: 5400 },
      });
      expect(actual).toEqual({ A: 80, B: 40 });

      const actual2 = solveAandBpt2({
        A: { x: 94, y: 34 },
        B: { x: 22, y: 67 },
        P: { x: 10000000008400, y: 10000000005400 },
      });
      expect(actual2).toBeUndefined();
    });
    it('returns defined when 10000000000000 added to prize coords', () => {
      const actual = solveAandBpt2({
        A: { x: 26, y: 66 },
        B: { x: 67, y: 21 },
        P: { x: 12748, y: 12176 },
      });

      expect(actual).toBeUndefined();

      const actual2 = solveAandBpt2({
        A: { x: 26, y: 66 },
        B: { x: 67, y: 21 },
        P: { x: 10000000012748, y: 10000000012176 },
      });
      expect(actual2).not.toBeUndefined();
      expect(actual2).toEqual({ A: 118679050709, B: 103199174542 });
    });
  });
  describe('partTwo', () => {
    it('returns min number of tokens w/updated coords', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(875318608908);
    });
  });
});
