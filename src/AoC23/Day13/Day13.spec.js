const {
  formatData,
  getReflectionData,
  partOne,
  findDifferenceIndexes,
  getSmudgeReflectionIndex,
  getReflectionDataWithSmudges,
  partTwo,
} = require('./Day13');

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
      const args = require.resolve('./Day13TestData.txt');
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
  describe('findDifferenceIndexes', () => {
    it('returns array with one index when comparing strings with only 1 difference', () => {
      expect(findDifferenceIndexes('..##..##.', '#.##..##.')).toEqual([0]);
    });
    it('returns array with 5 indexes when comparing strings with 5 differences', () => {
      expect(findDifferenceIndexes('..##..###', '#....#..#')).toEqual([
        0, 2, 3, 5, 6, 7,
      ]);
    });
    it('returns empty array when comparing identical strings', () => {
      expect(findDifferenceIndexes('..##..###', '..##..###')).toEqual([]);
    });
  });
  describe('getSmudgeReflectionIndex', () => {
    it('returns 3 when fixing smudge causes new reflection line to be between indexes 2 and 3', () => {
      expect(getSmudgeReflectionIndex(mockData[0])).toEqual(3);
    });
    it('returns 1 when fixing smudge causes new reflection line to be between indexes 0 and 1', () => {
      expect(getSmudgeReflectionIndex(mockData[1])).toEqual(1);
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
      expect(getSmudgeReflectionIndex(mockGrid)).toEqual(4);
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
      expect(getSmudgeReflectionIndex(mockGrid)).toBeUndefined();
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
