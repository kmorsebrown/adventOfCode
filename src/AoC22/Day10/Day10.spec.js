const path = require('path');
const {
  formatData,
  getAddxNum,
  getCycleMap,
  partOne,
  partTwo,
} = require('./Day10.js');

// npm test src/AoC22/Day10/Day10.spec.js

const partOneTestLong = [
  'addx 15',
  'addx -11',
  'addx 6',
  'addx -3',
  'addx 5',
  'addx -1',
  'addx -8',
  'addx 13',
  'addx 4',
  'noop',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx 5',
  'addx -1',
  'addx -35',
  'addx 1',
  'addx 24',
  'addx -19',
  'addx 1',
  'addx 16',
  'addx -11',
  'noop',
  'noop',
  'addx 21',
  'addx -15',
  'noop',
  'noop',
  'addx -3',
  'addx 9',
  'addx 1',
  'addx -3',
  'addx 8',
  'addx 1',
  'addx 5',
  'noop',
  'noop',
  'noop',
  'noop',
  'noop',
  'addx -36',
  'noop',
  'addx 1',
  'addx 7',
  'noop',
  'noop',
  'noop',
  'addx 2',
  'addx 6',
  'noop',
  'noop',
  'noop',
  'noop',
  'noop',
  'addx 1',
  'noop',
  'noop',
  'addx 7',
  'addx 1',
  'noop',
  'addx -13',
  'addx 13',
  'addx 7',
  'noop',
  'addx 1',
  'addx -33',
  'noop',
  'noop',
  'noop',
  'addx 2',
  'noop',
  'noop',
  'noop',
  'addx 8',
  'noop',
  'addx -1',
  'addx 2',
  'addx 1',
  'noop',
  'addx 17',
  'addx -9',
  'addx 1',
  'addx 1',
  'addx -3',
  'addx 11',
  'noop',
  'noop',
  'addx 1',
  'noop',
  'addx 1',
  'noop',
  'noop',
  'addx -13',
  'addx -19',
  'addx 1',
  'addx 3',
  'addx 26',
  'addx -30',
  'addx 12',
  'addx -1',
  'addx 3',
  'addx 1',
  'noop',
  'noop',
  'noop',
  'addx -9',
  'addx 18',
  'addx 1',
  'addx 2',
  'noop',
  'noop',
  'addx 9',
  'noop',
  'noop',
  'noop',
  'addx -1',
  'addx 2',
  'addx -37',
  'addx 1',
  'addx 3',
  'noop',
  'addx 15',
  'addx -21',
  'addx 22',
  'addx -6',
  'addx 1',
  'noop',
  'addx 2',
  'addx 1',
  'noop',
  'addx -10',
  'noop',
  'noop',
  'addx 20',
  'addx 1',
  'addx 2',
  'addx 2',
  'addx -6',
  'addx -11',
  'noop',
  'noop',
  'noop',
];

const partOneTestShort = ['noop', 'addx 3', 'addx -5'];

describe('Day10', () => {
  describe('formatData', () => {
    it('Formats data into an array of strings', async () => {
      const args = path.join(__dirname, 'Day10TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(partOneTestLong);
    });
  });
  describe('getAddxNum', () => {
    it('Returns positive number if command is addx 15', async () => {
      const args = 'addx 15';
      const actual = await getAddxNum(args);
      expect(actual).toEqual(15);
    });
    it('Returns negative number if command is addx -11', async () => {
      const args = 'addx -11';
      const actual = await getAddxNum(args);
      expect(actual).toEqual(-11);
    });
  });
  describe('getCycleMap', () => {
    it('Returns map of cyle number and X value during that cycle', async () => {
      const actual = await getCycleMap(partOneTestShort);
      expect(actual).toEqual(
        new Map([
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 4],
          [5, 4],
        ])
      );
    });
    it('Returns X value of 21 during cycle 20', async () => {
      const actual = await getCycleMap(partOneTestLong);
      expect(actual.get(20)).toEqual(21);
    });
  });
  describe('partOne', () => {
    it('Returns sum of signal strength at cycle 20 and every 40th cycle after that', async () => {
      const args = partOneTestLong;
      const actual = await partOne(args);
      expect(actual).toEqual(13140);
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
