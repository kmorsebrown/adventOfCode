const { formatData, runHASH, partOne, partTwo } = require('./Day15');

// npm test -- src/AoC23/Day15/Day15.spec.js

describe('Day15', () => {
  const mockData = [
    'rn=1',
    'cm-',
    'qp=3',
    'cm=2',
    'qp-',
    'pc=4',
    'ot=9',
    'ab=5',
    'pc-',
    'pc=6',
    'ot=7',
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day15TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockData);
    });
  });
  describe('runHASH', () => {
    it('runs the HASH algorithm on a string', async () => {
      expect(runHASH('rn=1')).toEqual(30);
      expect(runHASH('cm-')).toEqual(253);
    });
  });
  describe('partOne', () => {
    it('Get sum of running HASH on each step of the initialization sequence', async () => {
      const actual = await partOne(mockData);
      expect(actual).toEqual(1320);
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
