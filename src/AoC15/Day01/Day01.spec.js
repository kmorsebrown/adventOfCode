import { formatData, partOne, partTwo } from './Day01.js';
import { getTestDataPath } from '../../Utils/paths.js';

// npm test -- src/AoC15/Day01/Day01.spec.js

describe('Day01', () => {
  const mockInput = '(())()()((((()(()(';
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = getTestDataPath('01', import.meta.url);
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('partOne', () => {
    it('returns 0 for (())', async () => {
      const actual = await partOne('(())');
      expect(actual).toEqual(0);
    });
    it('returns 0 for ()()', async () => {
      const actual = await partOne('()()');
      expect(actual).toEqual(0);
    });
    it('returns 3 for (((', async () => {
      const actual = await partOne('(((');
      expect(actual).toEqual(3);
    });
    it('returns 3 for (()(()(', async () => {
      const actual = await partOne('(()(()(');
      expect(actual).toEqual(3);
    });
    it('returns 3 for ))(((((', async () => {
      const actual = await partOne('))(((((');
      expect(actual).toEqual(3);
    });
    it('returns -1 for ())', async () => {
      const actual = await partOne('())');
      expect(actual).toEqual(-1);
    });
    it('returns -1 for ))(', async () => {
      const actual = await partOne('))(');
      expect(actual).toEqual(-1);
    });
    it('returns -3 for )))', async () => {
      const actual = await partOne(')))');
      expect(actual).toEqual(-3);
    });
    it('returns -3 for )())())', async () => {
      const actual = await partOne(')())())');
      expect(actual).toEqual(-3);
    });
  });
  describe('partTwo', () => {
    it('returns 1 for )', async () => {
      const actual = await partTwo(')');
      expect(actual).toEqual(1);
    });
    it('returns 5 for ()())', async () => {
      const actual = await partTwo('()())');
      expect(actual).toEqual(5);
    });
  });
});
