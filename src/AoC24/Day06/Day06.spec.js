import path from 'path';
import { fileURLToPath } from 'url';
import { formatData, move, partOne, partTwo } from './Day06.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC24/Day06/Day06.spec.js

describe('Day06', () => {
  const mockInput = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...',
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day06TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('move', () => {
    it('moves in same direction if no obstacles', () => {
      const mockMap = ['...', '.^.', '...'];
      const actual = move(mockMap, { row: 1, col: 1 }, 'N');
      expect(actual).toEqual({
        dir: 'N',
        position: {
          row: 0,
          col: 1,
        },
      });
    });
    it('rotates 90 clockwise if obstacles', () => {
      const mockMap = ['.#.', '.^.', '...'];
      const actual = move(mockMap, { row: 1, col: 1 }, 'N');
      expect(actual).toEqual({
        dir: 'E',
        position: {
          row: 1,
          col: 1,
        },
      });
    });
    it('returns empty position if moves off map', () => {
      const mockMap = ['...', '...', '.v.'];
      const actual = move(mockMap, { row: 2, col: 1 }, 'S');
      expect(actual).toEqual({
        dir: 'off map',
        position: {},
      });
    });
  });
  describe('partOne', () => {
    it('Returns the number of distinct positions the guard has traversed', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(41);
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
