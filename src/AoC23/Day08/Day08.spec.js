import path from 'path';
import { fileURLToPath } from 'url';
import {
  getDirections,
  formatData,
  partOne,
  calculateLcmForAll,
  partTwo,
} from './Day08.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const mockInstruxC = 'LR';
  const mockNodesC = {
    '11A': { L: '11B', R: 'XXX' },
    '11B': { L: 'XXX', R: '11Z' },
    '11Z': { L: '11B', R: 'XXX' },
    '22A': { L: '22B', R: 'XXX' },
    '22B': { L: '22C', R: '22C' },
    '22C': { L: '22Z', R: '22Z' },
    '22Z': { L: '22B', R: '22B' },
    XXX: { L: 'XXX', R: 'XXX' },
  };
  describe('getDirections', () => {
    it('Returns directions RL', async () => {
      const args = new URL('./Day08TestDataA.txt', import.meta.url).pathname;
      const actual = await getDirections(args);
      expect(actual).toEqual(mockInstruxA);
    });
    it('Returns directions LLR', async () => {
      const args = new URL('./Day08TestDataB.txt', import.meta.url).pathname;
      const actual = await getDirections(args);
      expect(actual).toEqual(mockInstruxB);
    });
  });
  describe('formatData', () => {
    it('Formats the node definitions into an object', async () => {
      const args = new URL('./Day08TestDataA.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockNodesA);
    });
    it('Formats the node definitions into an object', async () => {
      const args = new URL('./Day08TestDataB.txt', import.meta.url).pathname;
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
  describe('calculateLcmForAll', () => {
    it('returns lcm for 2 numbers', () => {
      let args = [2, 3];
      expect(calculateLcmForAll(args)).toEqual(6);
    });
    it('returns lcm for 4 numbers', () => {
      let args = [5, 10, 15, 25];
      expect(calculateLcmForAll(args)).toEqual(150);
    });
    it('returns lcm for 6 numbers', () => {
      let args = [12, 18, 7, 15, 20, 24, 28];
      expect(calculateLcmForAll(args)).toEqual(2520);
    });
  });
  describe('partTwo', () => {
    it('Returns the number of steps it takes to end up entirely on nodes that end with Z', async () => {
      const actual = await partTwo(mockInstruxC, mockNodesC);
      expect(actual).toEqual(6);
    });
  });
});
