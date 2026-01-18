import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  formatData,
  findDupLetters,
  getPrioritySum,
  getGroups,
  getBadges,
} from './Day03.js';

describe('Day03', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day03TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
      ]);
    });
  });
  describe('findDupLetters', () => {
    it('Returns array of letters duplicated between compartments', async () => {
      const args = [
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
      ];
      const actual = await findDupLetters(args);
      expect(actual).toEqual(['p', 'L', 'P', 'v', 't', 's']);
    });
  });
  describe('getPrioritySum', () => {
    it('Get sum of priority values of duplicate items', async () => {
      const args = ['p', 'L', 'P', 'v', 't', 's'];
      const actual = await getPrioritySum(args);
      expect(actual).toEqual(157);
    });
    it('Get sum of priority values of badges items', async () => {
      const args = ['r', 'Z'];
      const actual = await getPrioritySum(args);
      expect(actual).toEqual(70);
    });
  });
  describe('getGroups', () => {
    it('Return array of arrays of groups of three items each', async () => {
      const args = [
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
      ];
      const actual = await getGroups(args);
      expect(actual).toEqual([
        [
          'vJrwpWtwJgWrhcsFMMfFFhFp',
          'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
          'PmmdzqPrVvPwwTWBwg',
        ],
        [
          'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
          'ttgJtRGJQctTZtZT',
          'CrZsJsPPZsGzwwsLwLmpwMDw',
        ],
      ]);
    });
  });
  describe('getBadges', () => {
    it('Get array of badges', async () => {
      const args = [
        [
          'vJrwpWtwJgWrhcsFMMfFFhFp',
          'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
          'PmmdzqPrVvPwwTWBwg',
        ],
        [
          'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
          'ttgJtRGJQctTZtZT',
          'CrZsJsPPZsGzwwsLwLmpwMDw',
        ],
      ];
      const actual = await getBadges(args);
      expect(actual).toEqual(['r', 'Z']);
    });
  });
});
