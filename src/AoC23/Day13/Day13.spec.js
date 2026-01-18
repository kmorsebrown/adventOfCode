import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData,
  getReflectionData,
  partOne,
  findNumCharDiffs,
  getReflectionIdxWithSmudge,
  getReflectionDataWithSmudges,
  partTwo,
} from './Day13.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC23/Day13/Day13.spec.js

describe('Day13', () => {
  const mockData = [
    [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ],
    [
      '#...##..#',
      '#....#..#',
      '..##..###',
      '#####.##.',
      '#####.##.',
      '..##..###',
      '#....#..#',
    ],
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day13TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockData);
    });
  });
  describe('getReflectionData', () => {
    it('returns data for grid w/vert reflection', () => {
      expect(getReflectionData(mockData[0])).toHaveProperty(
        'reflectionAxis',
        'vert'
      );
      expect(getReflectionData(mockData[0])).toHaveProperty(
        'reflectionIdx',
        [4, 5]
      );
    });
    it('returns data for grid w/horiz reflection', () => {
      expect(getReflectionData(mockData[1])).toHaveProperty(
        'reflectionAxis',
        'horiz'
      );
      expect(getReflectionData(mockData[1])).toHaveProperty(
        'reflectionIdx',
        [3, 4]
      );
    });
  });
  describe('partOne', () => {
    it('Returns the number of columns to the left of vert reflections plus 100 * the number of rows above horizontal reflections', async () => {
      const actual = await partOne(mockData);
      expect(actual).toEqual(405);
    });
  });
  describe('findNumCharDiffs', () => {
    it('returns 1 when only 1 character is different between two strings', () => {
      expect(
        findNumCharDiffs(
          '.#......#..#.##.#...##..##.',
          '##......#..#.##.#...##..##.'
        )
      ).toEqual(1);
    });
    it('returns 5 when 5 characters are different between two strings', () => {
      expect(findNumCharDiffs('#.#.##.#.', '..##..##.')).toEqual(5);
    });
    it('returns 0 array when comparing identical strings', () => {
      expect(findNumCharDiffs('..##..###', '..##..###')).toEqual(0);
    });
  });
  describe('getReflectionIdxWithSmudge', () => {
    it('returns 3 when fixing smudge causes new reflection line to be between indexes 2 and 3', () => {
      expect(getReflectionIdxWithSmudge(mockData[0])).toEqual(3);
    });
    it('returns 1 when fixing smudge causes new reflection line to be between indexes 0 and 1', () => {
      expect(getReflectionIdxWithSmudge(mockData[1])).toEqual(1);
    });
    it('returns 4 when fixing smudge causes new reflection line to be between indexes 3 and 4', () => {
      const mockGrid = [
        '#.#.##.#.',
        '..##..##.',
        '..#.##.#.',
        '##....#.#',
        '##......#',
        '..#.##.#.',
        '..##..##.',
      ];
      expect(getReflectionIdxWithSmudge(mockGrid)).toEqual(4);
    });
    it('returns undefined when no smudges to fix', () => {
      const mockGrid = [
        '###.##.#.',
        '..##..##.',
        '.##.##.#.',
        '##...#..#',
        '##......#',
        '..#.##.#.',
        '..##..##.',
      ];
      expect(getReflectionIdxWithSmudge(mockGrid)).toBeUndefined();
    });
  });
  describe('getReflectionDataWithSmudges', () => {
    it('returns data for grid where fixing smudge results in a horiz relfection line between row indexes 2 and 3', () => {
      expect(getReflectionDataWithSmudges(mockData[0])).toHaveProperty(
        'reflectionAxis',
        'horiz'
      );
      expect(getReflectionDataWithSmudges(mockData[0])).toHaveProperty(
        'reflectionIdx',
        [2, 3]
      );
    });
    it('returns data for grid where fixing smudge results in a horiz relfection line between row indexes 0 and 1', () => {
      expect(getReflectionDataWithSmudges(mockData[1])).toHaveProperty(
        'reflectionAxis',
        'horiz'
      );
      expect(getReflectionDataWithSmudges(mockData[1])).toHaveProperty(
        'reflectionIdx',
        [0, 1]
      );
    });
  });
  describe('partTwo', () => {
    it('Returns the number of columns to the left of vert reflections plus 100 * the number of rows above horizontal reflections when accounting for smudges', async () => {
      const actual = await partTwo(mockData);
      expect(actual).toEqual(400);
    });
  });
});
