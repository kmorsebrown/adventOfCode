import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, findMaxJoltage, partOne, partTwo } from './Day03.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC25/Day03/Day03.spec.js

describe('Day03', () => {
  const mockInput = [
    '987654321111111',
    '811111111111119',
    '234234234234278',
    '818181911112111',
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day03TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('findMaxJoltage', () => {
    describe('when turning on two batteries in a bank', () => {
      it('returns 98 for bank 987654321111111', async () => {
        const args = mockInput[0];
        const actual = await findMaxJoltage(args, 2);
        expect(actual).toEqual(98);
      });
      it('returns 89 for bank 811111111111119', async () => {
        const args = mockInput[1];
        const actual = await findMaxJoltage(args, 2);
        expect(actual).toEqual(89);
      });
      it('returns 78 for bank 234234234234278', async () => {
        const args = mockInput[2];
        const actual = await findMaxJoltage(args, 2);
        expect(actual).toEqual(78);
      });
      it('returns 92 for bank 818181911112111', async () => {
        const args = mockInput[3];
        const actual = await findMaxJoltage(args, 2);
        expect(actual).toEqual(92);
      });
    });

    describe('when turning on 12 batteries in a bank', () => {
      it('returns 987654321111 for bank 987654321111111', async () => {
        const args = mockInput[0];
        const actual = await findMaxJoltage(args, 12);
        expect(actual).toEqual(987654321111);
      });
      it('returns 811111111119 for bank 811111111111119', async () => {
        const args = mockInput[1];
        const actual = await findMaxJoltage(args, 12);
        expect(actual).toEqual(811111111119);
      });
      it('returns 434234234278 for bank 234234234234278', async () => {
        const args = mockInput[2];
        const actual = await findMaxJoltage(args, 12);
        expect(actual).toEqual(434234234278);
      });
      it('returns 888911112111 for bank 818181911112111', async () => {
        const args = mockInput[3];
        const actual = await findMaxJoltage(args, 12);
        expect(actual).toEqual(888911112111);
      });
    });
  });
  describe('partOne', () => {
    it('Returns the sum of the max joltage from each bank', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(357);
    });
  });
  describe('partTwo', () => {
    it('Returns the sum of the max joltage from each bank', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(3121910778619);
    });
  });
});
