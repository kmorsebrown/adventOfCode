import {
  isFirst,
  isLast,
  transpose,
  transposeArrStr,
  flipHoriz,
  rotateOneEighty,
  getAdjacentMatches,
  arrayifyGrid,
  transposeRagged,
  getAdjacentCoords,
  getAllAdjacentCoords,
  getValueFromCoords,
  getCoordinatesForMatch,
  getCoordinatesForAllMatches,
  checkPointOnSegment,
  checkPointInPolygon,
} from './grids.js';
// npm test -- src/Utils/grids.spec.js

describe('grids', () => {
  const mockGrid = ['-L|F7', '7S-7|', 'L|7||', '-L-J|', 'L|-JF'];
  describe('isFirst', () => {
    it('returns true if index is 0', () => {
      expect(isFirst(0)).toEqual(true);
    });
    it('returns false if index is greater than 0', () => {
      expect(isFirst(1)).toEqual(false);
    });
  });
  describe('isLast', () => {
    it('returns true if index is equal to the last index of the array', () => {
      expect(isLast(mockGrid[0].length - 1, mockGrid)).toEqual(true);
    });
    it('returns false if index is greater than 0', () => {
      expect(isLast(mockGrid.length - 2, mockGrid)).toEqual(false);
    });
  });
  describe('transpose', () => {
    it('tranpsoses a two dimensional array', () => {
      const arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
      ];
      expect(transpose(arr)).toEqual([
        [1, 4, 7, 10],
        [2, 5, 8, 11],
        [3, 6, 9, 12],
      ]);
    });
  });
  describe('transposeRagged', () => {
    it('transposes 2D array w/different column lengths', () => {
      const matrix = [
        [6, 4],
        [2, 3],
        [3, 1, 4],
      ];
      expect(transposeRagged(matrix)).toEqual([[6, 2, 3], [4, 3, 1], [4]]);
    });
  });
  describe('transposeArrStr', () => {
    it('transposes a 1 dimensional array of strings', () => {
      const arr = ['abc', '123', 'xyz'];
      expect(transposeArrStr(arr)).toEqual(['a1x', 'b2y', 'c3z']);
    });
    it('transposes 1 dimensional grid of strings', () => {
      const arr = [
        '#.##..##.',
        '..#.##.#.',
        '##......#',
        '##......#',
        '..#.##.#.',
        '..##..##.',
        '#.#.##.#.',
      ];
      expect(transposeArrStr(arr)).toEqual([
        '#.##..#',
        '..##...',
        '##..###',
        '#....#.',
        '.#..#.#',
        '.#..#.#',
        '#....#.',
        '##..###',
        '..##...',
      ]);
    });
  });
  describe('arrayifyGrid', () => {
    it('arrayifies a grid of strings w/o numbers', () => {
      const arr = ['abc', '.!_', ',e%'];
      expect(arrayifyGrid(arr, '')).toEqual([
        ['a', 'b', 'c'],
        ['.', '!', '_'],
        [',', 'e', '%'],
      ]);
    });
    it('arrayifies a grid of numbers and type converts them', () => {
      const arr = ['1 2 3.4', '-4 56 27.3', '78.0 0.89 2'];
      expect(arrayifyGrid(arr, ' ')).toEqual([
        [1, 2, 3.4],
        [-4, 56, 27.3],
        [78.0, 0.89, 2],
      ]);
    });
  });
  describe('flipHoriz', () => {
    it('flips a grid horizontally', () => {
      const mockGrid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(flipHoriz(mockGrid)).toEqual([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7],
      ]);
    });
  });
  describe('rotateOneEighty', () => {
    it('rotates grid 180 degrees', () => {
      const mockGrid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l'],
      ];
      expect(rotateOneEighty(mockGrid)).toEqual([
        ['l', 'k', 'j', 'i'],
        ['h', 'g', 'f', 'e'],
        ['d', 'c', 'b', 'a'],
      ]);
    });
  });
  describe('getAdjacentMatches', () => {
    const isStar = (el) => el === '*';
    const isZero = (num) => num === 0;
    it('Returns coordinates of stars N, E, S, W of current in array of strings when no options ', () => {
      const mockData = ['***', '*.*', '***'];
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 0 },
      ];
      expect(getAdjacentMatches(mockData, 1, 1, isStar)).toEqual(expected);
    });
    it('Returns coordinates of stars N, E, S, W, NE, SE, SW, NW of current in array of strings when diags allowed', () => {
      const mockData = ['***', '*.*', '***'];
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 0 },
        { row: 0, col: 2 },
        { row: 2, col: 2 },
        { row: 2, col: 0 },
        { row: 0, col: 0 },
      ];
      const opts = {
        allowDiagonals: true,
      };
      expect(getAdjacentMatches(mockData, 1, 1, isStar, opts)).toEqual(
        expected
      );
    });
    it('Returns coordinates of 0s N, E, S, W of current in multidimensional array when no options ', () => {
      const mockData = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 0 },
      ];
      expect(getAdjacentMatches(mockData, 1, 1, isZero)).toEqual(expected);
    });
    it('Returns empty array when no adjacent matches', () => {
      const mockData = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [];
      expect(getAdjacentMatches(mockData, 1, 1, isZero, opts)).toEqual(
        expected
      );
    });
    it('Returns N, E, NE when current is in first col & last row', () => {
      const mockData = [
        [1, 2, 3],
        [0, 0, 6],
        [7, 0, 9],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 1, col: 0 },
        { row: 2, col: 1 },
        { row: 1, col: 1 },
      ];
      expect(getAdjacentMatches(mockData, 2, 0, isZero, opts)).toEqual(
        expected
      );
    });
    it('Returns N, W, NW when current is in last col & last row', () => {
      const mockData = [
        [1, 2, 3],
        [4, 0, 0],
        [7, 0, 9],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 1 },
      ];
      expect(getAdjacentMatches(mockData, 2, 2, isZero, opts)).toEqual(
        expected
      );
    });
    it('Returns E, S, SE when current is in first col & first row', () => {
      const mockData = [
        ['.', '*', '.'],
        ['*', '*', '.'],
        ['.', '.', '.'],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ];
      expect(getAdjacentMatches(mockData, 0, 0, isStar, opts)).toEqual(
        expected
      );
    });
    it('Returns W, S, SW when current is in last col & first row', () => {
      const mockData = [
        ['.', '*', '.'],
        ['.', '*', '*'],
        ['.', '.', '.'],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 1, col: 2 },
        { row: 0, col: 1 },
        { row: 1, col: 1 },
      ];
      expect(getAdjacentMatches(mockData, 0, 2, isStar, opts)).toEqual(
        expected
      );
    });
  });
  describe('getAdjacentCoords', () => {
    it('gets N coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'N',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 0, col: 1 });
    });
    it('gets S coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'S',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 2, col: 1 });
    });
    it('gets E coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'E',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 1, col: 2 });
    });
    it('gets W coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'W',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 1, col: 0 });
    });
    it('gets NW coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'NW',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 0, col: 0 });
    });
    it('gets NE coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'NE',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 0, col: 2 });
    });
    it('gets SE coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'SE',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 2, col: 2 });
    });
    it('gets SW coords', () => {
      const args = {
        height: 3,
        width: 3,
        row: 1,
        col: 1,
        dir: 'SW',
      };
      const actual = getAdjacentCoords(args);
      expect(actual).toEqual({ row: 2, col: 0 });
    });
  });
  describe('getAllAdjacentCoords', () => {
    it('Returns coordinates of N, E, S, W of current in array of strings when no options ', () => {
      const mockData = ['***', '*.*', '***'];
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 0 },
      ];
      expect(getAllAdjacentCoords(mockData, 1, 1)).toEqual(expected);
    });
    it('Returns coordinates of N, E, S, W, NE, SE, SW, NW of current in array of strings when diags allowed', () => {
      const mockData = ['***', '*.*', '***'];
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 0 },
        { row: 0, col: 2 },
        { row: 2, col: 2 },
        { row: 2, col: 0 },
        { row: 0, col: 0 },
      ];
      const opts = {
        allowDiagonals: true,
      };
      expect(getAllAdjacentCoords(mockData, 1, 1, opts)).toEqual(expected);
    });
    it('Returns coordinates of 0s N, E, S, W of current in multidimensional array when no options ', () => {
      const mockData = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 0 },
      ];
      expect(getAllAdjacentCoords(mockData, 1, 1)).toEqual(expected);
    });
    it('Returns empty array when no adjacent coords', () => {
      const mockData = [[1]];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [];
      expect(getAllAdjacentCoords(mockData, 0, 0, opts)).toEqual(expected);
    });
    it('Returns N, E, NE when current is in first col & last row', () => {
      const mockData = [
        [1, 2, 3],
        [0, 0, 6],
        [7, 0, 9],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 1, col: 0 },
        { row: 2, col: 1 },
        { row: 1, col: 1 },
      ];
      expect(getAllAdjacentCoords(mockData, 2, 0, opts)).toEqual(expected);
    });
    it('Returns N, W, NW when current is in last col & last row', () => {
      const mockData = [
        [1, 2, 3],
        [4, 0, 0],
        [7, 0, 9],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 1, col: 1 },
      ];
      expect(getAllAdjacentCoords(mockData, 2, 2, opts)).toEqual(expected);
    });
    it('Returns E, S, SE when current is in first col & first row', () => {
      const mockData = [
        ['.', '*', '.'],
        ['*', '*', '.'],
        ['.', '.', '.'],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ];
      expect(getAllAdjacentCoords(mockData, 0, 0, opts)).toEqual(expected);
    });
    it('Returns W, S, SW when current is in last col & first row', () => {
      const mockData = [
        ['.', '*', '.'],
        ['.', '*', '*'],
        ['.', '.', '.'],
      ];
      const opts = {
        allowDiagonals: true,
      };
      const expected = [
        { row: 1, col: 2 },
        { row: 0, col: 1 },
        { row: 1, col: 1 },
      ];
      expect(getAllAdjacentCoords(mockData, 0, 2, opts)).toEqual(expected);
    });
  });
  describe('getValueFromCoords', () => {
    it('gets coordinates from grid', () => {
      const mockCoords = { row: 1, col: 1 };
      const mockGrid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l'],
      ];
      const actual = getValueFromCoords(mockGrid, mockCoords);
      expect(actual).toEqual('f');
    });
  });
  describe('getCoordinatesForMatch', () => {
    it('returns all coordinates for 1s in an array of numbers', () => {
      const actual = getCoordinatesForMatch([1, 1, 3], 2, 1);
      expect(actual).toEqual([
        { row: 2, col: 0 },
        { row: 2, col: 1 },
      ]);
    });
    it('returns all coordinates for Xs in an array of strings', () => {
      const actual = getCoordinatesForMatch(['X', 'X', 'S'], 2, 'X');
      expect(actual).toEqual([
        { row: 2, col: 0 },
        { row: 2, col: 1 },
      ]);
    });
    it('returns all coordinates for X in a string', () => {
      const actual = getCoordinatesForMatch('XXS', 2, 'X');
      expect(actual).toEqual([
        { row: 2, col: 0 },
        { row: 2, col: 1 },
      ]);
    });
  });
  describe('getCoordinatesForAllMatches', () => {
    it('returns all coordinates for K vals', () => {
      const mockGrid = [
        ['M', 'A', 'K'],
        ['S', 'M', 'A'],
        ['K', 'K', 'M'],
      ];

      const actual = getCoordinatesForAllMatches(mockGrid, 'K');
      expect(actual).toEqual([
        { row: 0, col: 2 },
        { row: 2, col: 0 },
        { row: 2, col: 1 },
      ]);
    });
  });
  describe('checkPointOnSegment', () => {
    it('returns true for point on N=>S vertical line', () => {
      expect(checkPointOnSegment([2, 4], [2, 3], [2, 5])).toBe(true);
    });
    it('returns true for point on E=>W horizontal line', () => {
      expect(checkPointOnSegment([5, 3], [2, 3], [7, 3])).toBe(true);
    });

    it('returns true for point on S=>N vertical line', () => {
      expect(checkPointOnSegment([2, 4], [2, 5], [2, 3])).toBe(true);
    });

    it('returns true for point on W=>E horizontal line', () => {
      expect(checkPointOnSegment([5, 3], [7, 3], [2, 3])).toBe(true);
    });
  });
  describe('checkPointInPolygon', () => {
    const mockPolygon = [
      { x: 7, y: 2 },
      { x: 3, y: 6 },
      { x: 3, y: 12 },
      { x: 6, y: 9 },
      { x: 10, y: 13 },
      { x: 10, y: 5 },
    ];
    const mock2DArrayPolygon = [
      [7, 2],
      [3, 6],
      [3, 12],
      [6, 9],
      [10, 13],
      [10, 5],
    ];

    const mockPointsInPolygon = [
      { x: 6, y: 5 },
      { x: 5, y: 7 },
      { x: 4, y: 10 },
      { x: 9, y: 10 },
      { x: 10, y: 8 },
    ];

    const mockPointsIn2DArrayPolygon = [
      [6, 5],
      [5, 7],
      [4, 10],
      [9, 10],
      [10, 8],
    ];

    const mockPointsOutPolygon = [
      { x: 1, y: 1 },
      { x: 4, y: 2 },
      { x: 2, y: 7 },
      { x: 1, y: 9 },
      { x: 6, y: 10 },
      { x: 2, y: 13 },
      { x: 12, y: 8 },
      { x: 6, y: 14 },
    ];
    const mockPointsOut2DArrayPolygon = [
      [1, 1],
      [4, 2],
      [2, 7],
      [1, 9],
      [6, 10],
      [2, 13],
      [12, 8],
      [6, 14],
    ];
    it('returns true for points inside the polygon', () => {
      for (const point of mockPointsInPolygon) {
        let actual = checkPointInPolygon(point, mockPolygon);
        console.log(`${point.x}, ${point.y}: ${actual}`);
        expect(actual).toBe(true);
      }
    });
    it('returns false for points outside the polygon', () => {
      for (const point of mockPointsOutPolygon) {
        let actual = checkPointInPolygon(point, mockPolygon);
        console.log(`${point.x}, ${point.y}: ${actual}`);
        expect(actual).toBe(false);
      }
    });

    it('returns true for points inside the 2D Array polygon', () => {
      for (const point of mockPointsIn2DArrayPolygon) {
        let actual = checkPointInPolygon(point, mock2DArrayPolygon);
        expect(actual).toBe(true);
      }
    });
    it('returns false for points outside the 2D Array polygon', () => {
      for (const point of mockPointsOut2DArrayPolygon) {
        let actual = checkPointInPolygon(point, mock2DArrayPolygon);
        expect(actual).toBe(false);
      }
    });
    it('returns true for points on vertexes of rectangular polygon', () => {
      const mockInput = [
        [7, 1],
        [11, 1],
        [11, 7],
        [9, 7],
        [9, 5],
        [2, 5],
        [2, 3],
        [7, 3],
      ];

      for (const point of mockInput) {
        let actual = checkPointInPolygon(point, mockInput);
        expect(actual).toBe(true);
      }
    });
    it('returns true for points on vertexes of complex polygon', () => {
      for (const point of mock2DArrayPolygon) {
        let actual = checkPointInPolygon(point, mock2DArrayPolygon);
        expect(actual).toBe(true);
      }
    });
    it('returns true for points on vertical edges of rectangular polygon', () => {
      const mockInput = [
        [7, 1],
        [11, 1],
        [11, 7],
        [9, 7],
        [9, 5],
        [2, 5],
        [2, 3],
        [7, 3],
      ];

      const pointsOnEdge = [
        [2, 4],
        [5, 3],
        [6, 5],
        [9, 1],
      ];

      for (const point of pointsOnEdge) {
        let actual = checkPointInPolygon(point, mockInput);
        expect(actual).toBe(true);
      }
    });
    it('returns true for point on edge of complex polygon', () => {
      const pointsOnEdge = [
        [6, 3],
        [3, 8],
        [5, 10],
        [8, 11],
        [10, 9],
        [9, 4],
      ];

      for (const point of pointsOnEdge) {
        let actual = checkPointInPolygon(point, mock2DArrayPolygon);
        expect(actual).toBe(true);
      }
    });
  });
});
