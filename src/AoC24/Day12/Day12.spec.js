const { formatData, generateRegions, partOne, partTwo } = require('./Day12');

// npm test -- src/AoC24/Day12/Day12.spec.js

describe('Day12', () => {
  const mockInputA = ['AAAA', 'BBCD', 'BBCC', 'EEEC'];
  const mockInputB = ['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'];
  const mockInputC = [
    'RRRRIICCFF',
    'RRRRIICCCF',
    'VVRRRCCFFF',
    'VVRCCCJFFF',
    'VVVVCJJCFE',
    'VVIVCCJJEE',
    'VVIIICJJEE',
    'MIIIIIJJEE',
    'MIIISIJEEE',
    'MMMISSJEEE',
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day12TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInputC);
    });
  });
  describe('generateRegions', () => {
    it('gets all regions for input A', () => {
      const actual = generateRegions(mockInputA);
      const expected = new Map([
        [0, 40],
        [1, 32],
        [2, 40],
        [3, 4],
        [4, 24],
      ]);

      expect(actual).toEqual(expected);
    });
    it('gets all regions for input B', () => {
      const actual = generateRegions(mockInputB);
      const expected = new Map([
        [0, 756],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4],
      ]);

      expect(actual).toEqual(expected);
    });
  });
  describe('partOne', () => {
    it('Returns the sum of fence prices for Input A', async () => {
      const actual = await partOne(mockInputA);
      expect(actual).toEqual(140);
    });
    it('Returns the sum of fence prices for Input B', async () => {
      const actual = await partOne(mockInputB);
      expect(actual).toEqual(772);
    });
    it('Returns the sum of fence prices for Input C', async () => {
      const actual = await partOne(mockInputC);
      expect(actual).toEqual(1930);
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
