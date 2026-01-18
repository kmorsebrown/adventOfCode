import { getPuzzleInputPath, getTestDataPath } from './paths.js';

describe('paths utilities', () => {
  describe('getPuzzleInputPath', () => {
    it('constructs the correct path for a day', () => {
      const result = getPuzzleInputPath('01', import.meta.url);
      expect(result).toContain('puzzleInputs/Day01Input.txt');
    });

    it('constructs the correct path for a two-digit day', () => {
      const result = getPuzzleInputPath('15', import.meta.url);
      expect(result).toContain('puzzleInputs/Day15Input.txt');
    });

    it('returns an absolute path', () => {
      const result = getPuzzleInputPath('01', import.meta.url);
      expect(result.startsWith('/')).toBe(true);
    });

    it('includes the correct year folder structure when called from a day file', () => {
      // This simulates being called from a day file in AoC25/Day01/
      const mockUrl = 'file:///Users/test/adventOfCode/src/AoC25/Day01/Day01.js';
      const result = getPuzzleInputPath('01', mockUrl);
      expect(result).toContain('AoC25/puzzleInputs/Day01Input.txt');
    });
  });

  describe('getTestDataPath', () => {
    it('constructs the correct path for test data', () => {
      const result = getTestDataPath('01', import.meta.url);
      expect(result).toContain('Day01TestData.txt');
    });

    it('constructs the correct path for a two-digit day', () => {
      const result = getTestDataPath('12', import.meta.url);
      expect(result).toContain('Day12TestData.txt');
    });

    it('returns an absolute path', () => {
      const result = getTestDataPath('01', import.meta.url);
      expect(result.startsWith('/')).toBe(true);
    });

    it('places test data in the same directory as the calling file', () => {
      // When called from a spec file in the same directory as the day file
      const result = getTestDataPath('01', import.meta.url);
      expect(result).toContain('Utils/Day01TestData.txt');
    });

    it('works correctly when called from a day spec file', () => {
      // Simulate being called from AoC25/Day12/Day12.spec.js
      const mockUrl = 'file:///Users/test/adventOfCode/src/AoC25/Day12/Day12.spec.js';
      const result = getTestDataPath('12', mockUrl);
      expect(result).toContain('AoC25/Day12/Day12TestData.txt');
    });
  });

  describe('path consistency', () => {
    it('getPuzzleInputPath and getTestDataPath use different base paths', () => {
      const puzzlePath = getPuzzleInputPath('01', import.meta.url);
      const testPath = getTestDataPath('01', import.meta.url);

      expect(puzzlePath).toContain('puzzleInputs');
      expect(testPath).not.toContain('puzzleInputs');
    });

    it('both functions handle the same day number consistently', () => {
      const dayNum = '07';
      const puzzlePath = getPuzzleInputPath(dayNum, import.meta.url);
      const testPath = getTestDataPath(dayNum, import.meta.url);

      expect(puzzlePath).toContain('Day07Input.txt');
      expect(testPath).toContain('Day07TestData.txt');
    });
  });

  describe('edge cases', () => {
    it('handles single digit days', () => {
      const result = getPuzzleInputPath('1', import.meta.url);
      expect(result).toContain('Day1Input.txt');
    });

    it('handles zero-padded days', () => {
      const result = getPuzzleInputPath('01', import.meta.url);
      expect(result).toContain('Day01Input.txt');
    });

    it('handles large day numbers', () => {
      const result = getPuzzleInputPath('25', import.meta.url);
      expect(result).toContain('Day25Input.txt');
    });
  });
});
