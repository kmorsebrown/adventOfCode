const path = require('path');
const {
  formatData,
  findDupLetters,
  getDupPrioritySum,
  partTwo,
} = require('./Day03.js');

describe('Day03', () => {
  describe.skip('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day03TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        ['vJrwpWtwJgWr', 'hcsFMMfFFhFp'],
        ['jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL'],
        ['PmmdzqPrV', 'vPwwTWBwg'],
        ['wMqvLMZHhHMvwLH', 'jbvcjnnSBnvTQFn'],
        ['ttgJtRGJ', 'QctTZtZT'],
        ['CrZsJsPPZsGz', 'wwsLwLmpwMDw'],
      ]);
    });
  });
  describe('findDupLetters', () => {
    it('Returns array of letters duplicated between compartments', async () => {
      const args = [
        ['vJrwpWtwJgWr', 'hcsFMMfFFhFp'],
        ['jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL'],
        ['PmmdzqPrV', 'vPwwTWBwg'],
        ['wMqvLMZHhHMvwLH', 'jbvcjnnSBnvTQFn'],
        ['ttgJtRGJ', 'QctTZtZT'],
        ['CrZsJsPPZsGz', 'wwsLwLmpwMDw'],
      ];
      const actual = await findDupLetters(args);
      expect(actual).toEqual(['p', 'L', 'P', 'v', 't', 's']);
    });
  });
  describe('getDupPrioritySum', () => {
    it('Get sum of priority values of duplicate items', async () => {
      const args = ['p', 'L', 'P', 'v', 't', 's'];
      const actual = await getDupPrioritySum(args);
      expect(actual).toEqual(157);
    });
  });
  describe.skip('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(0);
    });
  });
});
