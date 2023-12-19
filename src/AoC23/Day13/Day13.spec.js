const {
  formatData,
  getReflectionData,
  partOne,
  findDifferenceIndexes,
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
  describe.skip('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(400);
    });
  });
});
