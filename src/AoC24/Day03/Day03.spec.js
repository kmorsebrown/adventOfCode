import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData,
  partOneRegex,
  partTwoRegex,
  extractMatches,
  extractMultipliers,
  partOne,
  partTwo,
} from './Day03.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC24/Day03/Day03.spec.js

describe('Day03', () => {
  const mockProgram =
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

  const mockProgramPt2 =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

  describe.skip('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day03TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockProgram);
    });
  });
  describe('extractMatches', () => {
    it('extracts valid instructions', () => {
      const actual = extractMatches(partOneRegex, mockProgram);
      expect(actual).toEqual(['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']);
    });
    it('extracts valid instructions and do & dont expressions', () => {
      const actual = extractMatches(partTwoRegex, mockProgramPt2);
      expect(actual).toEqual([
        'mul(2,4)',
        "don't()",
        'mul(5,5)',
        'mul(11,8)',
        'do()',
        'mul(8,5)',
      ]);
    });
  });
  describe('extractMultipliers', () => {
    it('extracts multipliers from instructions when check conditionals is not set', () => {
      const actual = extractMultipliers([
        'mul(2,4)',
        'mul(5,5)',
        'mul(11,8)',
        'mul(8,5)',
      ]);
      expect(actual).toEqual([
        [2, 4],
        [5, 5],
        [11, 8],
        [8, 5],
      ]);
    });
    it('extracts multipliers from instructions when checking conditionals', () => {
      const actual = extractMultipliers(
        ['mul(2,4)', "don't()", 'mul(5,5)', 'mul(11,8)', 'do()', 'mul(8,5)'],
        true
      );
      expect(actual).toEqual([
        [2, 4],
        [8, 5],
      ]);
    });
  });
  describe('partOne', () => {
    it('returns the total of all multiplier instructions', async () => {
      const actual = await partOne(mockProgram);
      expect(actual).toEqual(161);
    });
  });
  describe('partTwo', () => {
    it('returns the total of all enabled multiplier instructions', async () => {
      const actual = await partTwo(mockProgramPt2);
      expect(actual).toEqual(48);
    });
  });
});
