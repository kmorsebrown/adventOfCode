const path = require('path');
const {
  formatCratesData,
  formatMovesData,
  moveCrates,
  partOne,
  partTwo,
} = require('./Day05.js');

describe('Day05', () => {
  describe('formatCratesData', () => {
    it('Formats the data into a map', async () => {
      const args = path.join(__dirname, 'Day05TestData.txt');
      const actual = await formatCratesData(args);
      expect(actual).toEqual(
        new Map([
          [1, ['N', 'Z']],
          [2, ['D', 'C', 'M']],
          [3, ['P']],
        ])
      );
    });
  });
  describe('formatMovesData', () => {
    it('Formats the data into an array of objects', async () => {
      const args = path.join(__dirname, 'Day05TestData.txt');
      const actual = await formatMovesData(args);
      expect(actual).toEqual([
        { move: 1, from: 2, to: 1 },
        { move: 3, from: 1, to: 3 },
        { move: 2, from: 2, to: 1 },
        { move: 1, from: 1, to: 2 },
      ]);
    });
  });
  describe('moveCrates', () => {
    it('Follows moves to create new crates map', async () => {
      const cratesMap = new Map([
        [1, ['N', 'Z']],
        [2, ['D', 'C', 'M']],
        [3, ['P']],
      ]);

      const movesArr = [
        { move: 1, from: 2, to: 1 },
        { move: 3, from: 1, to: 3 },
        { move: 2, from: 2, to: 1 },
        { move: 1, from: 1, to: 2 },
      ];
      const actual = await moveCrates(cratesMap, movesArr);
      expect(actual).toEqual(
        new Map([
          [1, ['C']],
          [2, ['M']],
          [3, ['Z', 'N', 'D', 'P']],
        ])
      );
    });
  });
  describe('partOne', () => {
    it('Gets string of top boxes for each stack', async () => {
      const args = new Map([
        [1, ['C']],
        [2, ['M']],
        [3, ['Z', 'N', 'D', 'P']],
      ]);
      const actual = await partOne(args);
      expect(actual).toEqual('CMZ');
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
