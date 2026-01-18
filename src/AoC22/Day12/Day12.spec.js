import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  formatData,
  getCoords,
  getPossibleMoves,
  generateGraph,
  findShortestPath,
  getStartPoints,
  partTwo,
} from './Day12.js';

// npm test src/AoC22/Day12/Day12.spec.js

const TEST_DATA = [
  [1, 1, 2, 17, 16, 15, 14, 13],
  [1, 2, 3, 18, 25, 24, 24, 12],
  [1, 3, 3, 19, 26, 26, 24, 11],
  [1, 3, 3, 20, 21, 22, 23, 10],
  [1, 2, 4, 5, 6, 7, 8, 9],
];
describe('Day12', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day12TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(TEST_DATA);
    });
  });
  describe('getCoords', () => {
    it('gets the coordinates of the starting position', async () => {
      const data = path.join(__dirname, 'Day12TestData.txt');
      const actual = await getCoords(data, 'S');
      expect(actual).toEqual('x0y0');
    });
    it('gets the coordinates of the ending position', async () => {
      const data = path.join(__dirname, 'Day12TestData.txt');
      const actual = await getCoords(data, 'E');
      expect(actual).toEqual('x5y2');
    });
  });
  describe('getPossibleMoves', () => {
    it('gets the possible moves from current position x1 y1', () => {
      const actual = getPossibleMoves('x1y1', TEST_DATA);
      expect(actual).toEqual(['x0y1', 'x2y1', 'x1y0', 'x1y2']);
    });
    it('gets the possible moves from current position x0 y0', () => {
      const actual = getPossibleMoves('x0y0', TEST_DATA);
      expect(actual).toEqual(['x1y0', 'x0y1']);
    });
    it('gets the possible moves from current position x7 y4', () => {
      const actual = getPossibleMoves('x7y4', TEST_DATA);
      expect(actual).toEqual(['x6y4', 'x7y3']);
    });
  });
  describe('generateGraph', () => {
    it('generates a graph from the grid', () => {
      const actual = generateGraph(TEST_DATA);
      expect(actual).toEqual({
        x0y0: ['x1y0', 'x0y1'],
        x1y0: ['x0y0', 'x2y0', 'x1y1'],
        x2y0: ['x1y0', 'x2y1'],
        x3y0: ['x2y0', 'x4y0', 'x3y1'],
        x4y0: ['x3y0', 'x5y0'],
        x5y0: ['x4y0', 'x6y0'],
        x6y0: ['x5y0', 'x7y0'],
        x7y0: ['x6y0', 'x7y1'],
        x0y1: ['x1y1', 'x0y0', 'x0y2'],
        x1y1: ['x0y1', 'x2y1', 'x1y0', 'x1y2'],
        x2y1: ['x1y1', 'x2y0', 'x2y2'],
        x3y1: ['x2y1', 'x3y0', 'x3y2'],
        x4y1: ['x3y1', 'x5y1', 'x4y0', 'x4y2'],
        x5y1: ['x4y1', 'x6y1', 'x5y0'],
        x6y1: ['x5y1', 'x7y1', 'x6y0', 'x6y2'],
        x7y1: ['x7y0', 'x7y2'],
        x0y2: ['x0y1', 'x0y3'],
        x1y2: ['x0y2', 'x2y2', 'x1y1', 'x1y3'],
        x2y2: ['x1y2', 'x2y1', 'x2y3'],
        x3y2: ['x2y2', 'x3y1', 'x3y3'],
        x4y2: ['x3y2', 'x5y2', 'x4y1', 'x4y3'],
        x5y2: ['x4y2', 'x6y2', 'x5y1', 'x5y3'],
        x6y2: ['x7y2', 'x6y1', 'x6y3'],
        x7y2: ['x7y1', 'x7y3'],
        x0y3: ['x0y2', 'x0y4'],
        x1y3: ['x0y3', 'x2y3', 'x1y2', 'x1y4'],
        x2y3: ['x1y3', 'x2y2', 'x2y4'],
        x3y3: ['x2y3', 'x4y3', 'x3y2', 'x3y4'],
        x4y3: ['x3y3', 'x5y3', 'x4y4'],
        x5y3: ['x4y3', 'x6y3', 'x5y4'],
        x6y3: ['x5y3', 'x7y3', 'x6y2', 'x6y4'],
        x7y3: ['x7y2', 'x7y4'],
        x0y4: ['x1y4', 'x0y3'],
        x1y4: ['x0y4', 'x1y3'],
        x2y4: ['x1y4', 'x3y4', 'x2y3'],
        x3y4: ['x2y4', 'x4y4'],
        x4y4: ['x3y4', 'x5y4'],
        x5y4: ['x4y4', 'x6y4'],
        x6y4: ['x5y4', 'x7y4'],
        x7y4: ['x6y4', 'x7y3'],
      });
    });
  });
  describe('findShortestPath', () => {
    it('Returns minimum number of steps to reach highest point', async () => {
      const start = 'x0y0';
      const end = 'x5y2';
      const actual = await findShortestPath(TEST_DATA, start, end);
      expect(actual).toEqual(31);
    });
  });
  describe('getStartPoints', () => {
    it('Returns coordinates of all possible starting points', async () => {
      const actual = await getStartPoints(TEST_DATA);
      expect(actual).toEqual(['x0y0', 'x1y0', 'x0y1', 'x0y2', 'x0y3', 'x0y4']);
    });
  });
  describe('partTwo', () => {
    it('Gets shortest distance to end point', async () => {
      const [startArr, end] = [
        ['x0y0', 'x1y0', 'x0y1', 'x0y2', 'x0y3', 'x0y4'],
        'x5y2',
      ];
      const actual = await partTwo(TEST_DATA, startArr, end);
      expect(actual).toEqual(29);
    });
  });
});
