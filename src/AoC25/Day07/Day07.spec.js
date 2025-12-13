const { formatData, moveBeam, partOne, partTwo } = require('./Day07');

// npm test -- src/AoC25/Day07/Day07.spec.js

describe('Day07', () => {
  const mockInput = [
    ['.', '.', '.', '.', '.', '.', '.', 'S', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '^', '.', '^', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '^', '.', '^', '.', '^', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '^', '.', '^', '.', '.', '.', '^', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '^', '.', '^', '.', '.', '.', '^', '.', '^', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '^', '.', '.', '.', '^', '.', '.', '.', '.', '.', '^', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '^', '.', '^', '.', '^', '.', '^', '.', '^', '.', '.', '.', '^', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day07TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('moveBeam', () => {
    it('Returns the coordinates south of the current beam when the beam isnt split', async () => {
      const actual = await moveBeam(
        mockInput.length,
        mockInput[0].length,
        mockInput[1],
        {
          row: 0,
          col: 7,
        }
      );
      expect(actual).toEqual([{ row: 1, col: 7 }]);
    });
    it('Returns the coordinates SW and SE of the current beam when the beam is split', async () => {
      const actual = await moveBeam(
        mockInput.length,
        mockInput[0].length,
        mockInput[2],
        {
          row: 1,
          col: 7,
        }
      );
      expect(actual).toEqual([
        { row: 2, col: 6 },
        { row: 2, col: 8 },
      ]);
    });
    it('Returns undefined if current is final row', async () => {
      const actual = await moveBeam(
        mockInput.length,
        mockInput[0].length,
        mockInput[16],
        {
          row: 15,
          col: 0,
        }
      );
      expect(actual).toBeUndefined();
    });
    it('Returns undefined for SW coord if split is on W edge', async () => {
      const mockGrid = [
        ['|', '.'],
        ['^', '.'],
      ];
      const actual = await moveBeam(
        mockGrid.length,
        mockGrid[0].length,
        mockGrid[1],
        {
          row: 0,
          col: 0,
        }
      );
      expect(actual[0]).toBeUndefined;
      expect(actual[1]).toEqual({ row: 1, col: 1 });
    });
    it('Returns undefined for SE coord if split is on E edge', async () => {
      const mockGrid = [
        ['.', '|'],
        ['.', '^'],
      ];
      const actual = await moveBeam(
        mockGrid.length,
        mockGrid[0].length,
        mockGrid[1],
        {
          row: 0,
          col: 1,
        }
      );
      expect(actual[1]).toBeUndefined;
      expect(actual[0]).toEqual({ row: 1, col: 0 });
    });
  });
  describe('partOne', () => {
    it('Returns the number of times the tachyon beam is split', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(21);
    });
  });
  describe('partTwo', () => {
    it('Returns the number of different timelines the particle ended up on', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(40);
    });
  });
});
