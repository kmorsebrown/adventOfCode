const { getDirections, formatData, partOne, partTwo } = require('./Day08');

// npm test -- src/AoC23/Day08/Day08.spec.js

describe('Day08', () => {
  const mockInstruxA = 'RL';
  const mockNodesA = {
    AAA: { L: 'BBB', R: 'CCC' },
    BBB: { L: 'DDD', R: 'EEE' },
    CCC: { L: 'ZZZ', R: 'GGG' },
    DDD: { L: 'DDD', R: 'DDD' },
    EEE: { L: 'EEE', R: 'EEE' },
    GGG: { L: 'GGG', R: 'GGG' },
    ZZZ: { L: 'ZZZ', R: 'ZZZ' },
  };
  const mockInstruxB = 'LLR';
  const mockNodesB = {
    AAA: { L: 'BBB', R: 'BBB' },
    BBB: { L: 'AAA', R: 'ZZZ' },
    ZZZ: { R: 'ZZZ', L: 'ZZZ' },
  };
  describe('getDirections', () => {
    it('Returns directions RL', async () => {
      const args = require.resolve('./Day08TestDataA.txt');
      const actual = await getDirections(args);
      expect(actual).toEqual(mockInstruxA);
    });
    it('Returns directions LLR', async () => {
      const args = require.resolve('./Day08TestDataB.txt');
      const actual = await getDirections(args);
      expect(actual).toEqual(mockInstruxB);
    });
  });
  describe('formatData', () => {
    it('Formats the node definitions into an object', async () => {
      const args = require.resolve('./Day08TestDataA.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockNodesA);
    });
    it('Formats the node definitions into an object', async () => {
      const args = require.resolve('./Day08TestDataB.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockNodesB);
    });
  });
  describe('partOne', () => {
    it('Finds the number of steps to reach ZZZ for test data A', async () => {
      const actual = await partOne(mockInstruxA, mockNodesA);
      expect(actual).toEqual(2);
    });
    it('Finds the number of steps to reach ZZZ for test data B', async () => {
      const actual = await partOne(mockInstruxB, mockNodesB);
      expect(actual).toEqual(6);
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
