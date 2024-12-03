const {
  formatData,
  partOneRegex,
  isValidMulInstruction,
  extractValidInstructions,
  extractMultipliers,
  partOne,
  partTwo,
} = require('./Day03');

// npm test -- src/AoC24/Day03/Day03.spec.js

describe('Day03', () => {
  const mockProgram =
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

  describe.skip('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day03TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockProgram);
    });
  });
  describe('isValidMulInstruction', () => {
    it('returns true for 1 digit mul instructions', () => {
      const actual = isValidMulInstruction(partOneRegex, 'mul(4,2)');
      expect(actual).toEqual(true);
    });
    it('returns true for 2 digit mul instructions', () => {
      const actual = isValidMulInstruction(partOneRegex, 'mul(43,26)');
      expect(actual).toEqual(true);
    });
    it('returns true for 3 digit mul instructions', () => {
      const actual = isValidMulInstruction(partOneRegex, 'mul(123,4)');
      expect(actual).toEqual(true);
    });
    it('returns false for 4 digit mul instructions', () => {
      const actual = isValidMulInstruction(partOneRegex, 'mul(34,5678)');
      expect(actual).toEqual(false);
    });
    it('returns false for string without second number', () => {
      const actual = isValidMulInstruction(partOneRegex, 'mul(4*');
      expect(actual).toEqual(false);
    });
    it('returns false for string without closing paren', () => {
      const actual = isValidMulInstruction(partOneRegex, 'mul(6,9!');
      expect(actual).toEqual(false);
    });
    it('returns false for string without mul', () => {
      const actual = isValidMulInstruction(partOneRegex, '?(12,34)');
      expect(actual).toEqual(false);
    });
    it('returns false for string without whitespace', () => {
      const actual = isValidMulInstruction(partOneRegex, 'mul ( 2 , 4 )');
      expect(actual).toEqual(false);
    });
  });
  describe('extractValidInstructions', () => {
    it('extracts valid instructions', () => {
      const actual = extractValidInstructions(partOneRegex, mockProgram);
      expect(actual).toEqual(['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']);
    });
  });
  describe('extractMultipliers', () => {
    it('extracts multipliers from instructions', () => {
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
  });
  describe('partOne', () => {
    it('returns the total of all multiplier instructions', async () => {
      const actual = await partOne(mockProgram);
      expect(actual).toEqual(161);
    });
  });
  describe.skip('partTwo', () => {
    it('returns the total of all enabled multiplier instructions', async () => {
      const actual = await partTwo(mockProgram);
      expect(actual).toEqual(48);
    });
  });
});
