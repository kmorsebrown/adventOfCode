import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData, partOne, getNumPaths, partTwo
} from './Day11.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC25/Day11/Day11.spec.js

describe('Day11', () => {
  const mockInputPt1 = new Map([
    ['aaa', ['you', 'hhh']],
    ['you', ['bbb', 'ccc']],
    ['bbb', ['ddd', 'eee']],
    ['ccc', ['ddd', 'eee', 'fff']],
    ['ddd', ['ggg']],
    ['eee', ['out']],
    ['fff', ['out']],
    ['ggg', ['out']],
    ['hhh', ['ccc', 'fff', 'iii']],
    ['iii', ['out']],
  ]);

  const mockInputPt2 = new Map([
    ['svr', ['aaa', 'bbb']],
    ['aaa', ['fft']],
    ['fft', ['ccc']],
    ['bbb', ['tty']],
    ['tty', ['ccc']],
    ['ccc', ['ddd', 'eee']],
    ['ddd', ['hub']],
    ['hub', ['fff']],
    ['eee', ['dac']],
    ['dac', ['fff']],
    ['fff', ['ggg', 'hhh']],
    ['ggg', ['out']],
    ['hhh', ['out']],
  ]);

  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day11TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInputPt1);
      expect(actual.get('you')).toEqual(['bbb', 'ccc']);
    });
  });
  describe('partOne', () => {
    it('returns the total number of paths between you and out', async () => {
      const actual = await partOne(mockInputPt1);
      expect(actual).toEqual(5);
    });
  });
  describe('getNumPaths', () => {
    it('returns the total number of paths between you and out', async () => {
      const baseIndegree = new Map([
        ['you', 1],
        ['hhh', 1],
        ['aaa', 0],
        ['bbb', 1],
        ['ccc', 2],
        ['ddd', 2],
        ['eee', 2],
        ['fff', 2],
        ['ggg', 1],
        ['out', 4],
        ['iii', 1],
      ]);
      const baseWays = new Map([
        ['aaa', 0],
        ['you', 0],
        ['hhh', 0],
        ['bbb', 0],
        ['ccc', 0],
        ['ddd', 0],
        ['eee', 0],
        ['fff', 0],
        ['ggg', 0],
        ['out', 0],
        ['iii', 0],
      ]);
      const actual = await getNumPaths(
        'you',
        1,
        ['aaa'],
        baseIndegree,
        baseWays,
        mockInputPt1,
        'out'
      );
      expect(actual).toEqual(5);
    });
    it('returns the total number of paths between svr and out', async () => {
      const baseIndegree = new Map([
        ['aaa', 1],
        ['bbb', 1],
        ['svr', 0],
        ['fft', 1],
        ['ccc', 2],
        ['tty', 1],
        ['ddd', 1],
        ['eee', 1],
        ['hub', 1],
        ['fff', 2],
        ['dac', 1],
        ['ggg', 1],
        ['hhh', 1],
        ['out', 2],
      ]);
      const baseWays = new Map([
        ['aaa', 0],
        ['bbb', 0],
        ['svr', 0],
        ['fft', 0],
        ['ccc', 0],
        ['tty', 0],
        ['ddd', 0],
        ['eee', 0],
        ['hub', 0],
        ['fff', 0],
        ['dac', 0],
        ['ggg', 0],
        ['hhh', 0],
        ['out', 0],
      ]);
      const actual = await getNumPaths(
        'svr',
        1,
        ['svr'],
        baseIndegree,
        baseWays,
        mockInputPt2,
        'out'
      );
      expect(actual).toEqual(8);
    });
    it('returns the total number of paths between svr and dac', async () => {
      const baseIndegree = new Map([
        ['aaa', 1],
        ['bbb', 1],
        ['svr', 0],
        ['fft', 1],
        ['ccc', 2],
        ['tty', 1],
        ['ddd', 1],
        ['eee', 1],
        ['hub', 1],
        ['fff', 2],
        ['dac', 1],
        ['ggg', 1],
        ['hhh', 1],
        ['out', 2],
      ]);
      const baseWays = new Map([
        ['aaa', 0],
        ['bbb', 0],
        ['svr', 0],
        ['fft', 0],
        ['ccc', 0],
        ['tty', 0],
        ['ddd', 0],
        ['eee', 0],
        ['hub', 0],
        ['fff', 0],
        ['dac', 0],
        ['ggg', 0],
        ['hhh', 0],
        ['out', 0],
      ]);
      const actual = await getNumPaths(
        'svr',
        1,
        ['svr'],
        baseIndegree,
        baseWays,
        mockInputPt2,
        'dac'
      );
      expect(actual).toEqual(2);
    });
    it('returns 0 when no paths between two points', async () => {
      const baseIndegree = new Map([
        ['aaa', 1],
        ['bbb', 1],
        ['svr', 0],
        ['fft', 1],
        ['ccc', 2],
        ['tty', 1],
        ['ddd', 1],
        ['eee', 1],
        ['hub', 1],
        ['fff', 2],
        ['dac', 1],
        ['ggg', 1],
        ['hhh', 1],
        ['out', 2],
      ]);
      const baseWays = new Map([
        ['aaa', 0],
        ['bbb', 0],
        ['svr', 0],
        ['fft', 0],
        ['ccc', 0],
        ['tty', 0],
        ['ddd', 0],
        ['eee', 0],
        ['hub', 0],
        ['fff', 0],
        ['dac', 0],
        ['ggg', 0],
        ['hhh', 0],
        ['out', 0],
      ]);
      const actual = await getNumPaths(
        'dac',
        1,
        ['svr'],
        baseIndegree,
        baseWays,
        mockInputPt2,
        'fft'
      );
      expect(actual).toEqual(0);
    });
  });
  describe('partTwo', () => {
    it('returns the total number of paths from svr to out that visit both dac and fft', async () => {
      const actual = await partTwo(mockInputPt2);
      expect(actual).toEqual(2);
    });
  });
});
