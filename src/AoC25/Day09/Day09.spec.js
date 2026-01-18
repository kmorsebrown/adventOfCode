import {
  formatData,
  partOne,
  partTwo,
  getArea,
  checkIfRectangleInPolygon,
} from './Day09.js';

// npm test -- src/AoC25/Day09/Day09.spec.js

describe('Day09', () => {
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
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day09TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('getArea', () => {
    it('Returns the area of a rectangle with red corners at 2,5 and 9,7', async () => {
      const actual = await getArea([2, 5], [9, 7]);
      expect(actual).toEqual(24);
    });
    it('Returns the area of a rectangle with red corners at 7,1 and 11,7', async () => {
      const actual = await getArea([7, 1], [11, 7]);
      expect(actual).toEqual(35);
    });
    it('Returns the area of a rectangle with red corners at 7,3 and 2,3', async () => {
      const actual = await getArea([7, 3], [2, 3]);
      expect(actual).toEqual(6);
    });
    it('Returns the area of a rectangle with red corners at 2,5 and 11,1', async () => {
      const actual = await getArea([2, 5], [11, 1]);
      expect(actual).toEqual(50);
    });
  });
  describe('partOne', () => {
    it('Returns the area of the largest possible rectangle', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(50);
    });
  });
  describe('checkIfRectangleInPolygon', () => {
    const mockRectanglesInPolygon = [
      [
        [7, 1],
        [11, 1],
      ],
      [
        [7, 1],
        [9, 5],
      ],
      [
        [7, 1],
        [7, 3],
      ],
      [
        [11, 1],
        [11, 7],
      ],
      [
        [11, 1],
        [9, 7],
      ],
      [
        [11, 1],
        [9, 5],
      ],
      [
        [11, 1],
        [7, 3],
      ],
      [
        [11, 7],
        [9, 7],
      ],
      [
        [11, 7],
        [9, 5],
      ],
      [
        [9, 7],
        [9, 5],
      ],
      [
        [9, 5],
        [2, 5],
      ],
      [
        [9, 5],
        [2, 3],
      ],
      [
        [9, 5],
        [7, 3],
      ],
      [
        [2, 5],
        [2, 3],
      ],
      [
        [2, 5],
        [7, 3],
      ],
      [
        [2, 3],
        [7, 3],
      ],
    ];

    const mockRectanglesNotInPolygon = [
      [
        [7, 1],
        [11, 7],
      ],
      [
        [7, 1],
        [9, 7],
      ],
      [
        [7, 1],
        [2, 5],
      ],
      [
        [7, 1],
        [2, 3],
      ],
      [
        [11, 1],
        [2, 5],
      ],
      [
        [11, 1],
        [2, 3],
      ],
      [
        [11, 7],
        [2, 5],
      ],
      [
        [11, 7],
        [2, 3],
      ],
      [
        [11, 7],
        [7, 3],
      ],
      [
        [9, 7],
        [2, 5],
      ],
      [
        [9, 7],
        [2, 3],
      ],
      [
        [9, 7],
        [7, 3],
      ],
    ];
    it('returns false for rectangle not in polygon', () => {
      for (const corners of mockRectanglesNotInPolygon) {
        const actual = checkIfRectangleInPolygon(
          corners[0],
          corners[1],
          mockInput
        );
        expect(actual).toBe(false);
      }
    });
    it('returns true for rectangle in polygon', () => {
      for (const corners of mockRectanglesInPolygon) {
        const actual = checkIfRectangleInPolygon(
          corners[0],
          corners[1],
          mockInput
        );
        expect(actual).toBe(true);
      }
    });
  });
  describe('partTwo', () => {
    it('Calculate the largest possible rectangle inside the polygon', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(24);
    });
  });
});
