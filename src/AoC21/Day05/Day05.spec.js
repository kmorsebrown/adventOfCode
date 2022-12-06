const path = require('path');
const {
  formatData,
  createDiagram,
  markHorizLines,
  markVertLines,
  markDiagLines,
  partOne,
  partTwo,
} = require('./Day05.js');

const formattedTestData = [
  {
    x1: 0,
    x2: 5,
    y1: 9,
    y2: 9,
  },
  {
    x1: 8,
    x2: 0,
    y1: 0,
    y2: 8,
  },
  {
    x1: 9,
    x2: 3,
    y1: 4,
    y2: 4,
  },
  {
    x1: 2,
    x2: 2,
    y1: 2,
    y2: 1,
  },
  {
    x1: 7,
    x2: 7,
    y1: 0,
    y2: 4,
  },
  {
    x1: 6,
    x2: 2,
    y1: 4,
    y2: 0,
  },
  {
    x1: 0,
    x2: 2,
    y1: 9,
    y2: 9,
  },
  {
    x1: 3,
    x2: 1,
    y1: 4,
    y2: 4,
  },
  {
    x1: 0,
    x2: 8,
    y1: 0,
    y2: 8,
  },
  {
    x1: 5,
    x2: 8,
    y1: 5,
    y2: 2,
  },
];
describe('Day05', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day05TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(formattedTestData);
    });
  });
  describe('createDiagram', () => {
    it('Generate empty 10 x 10 grid when x and y values both range from 0 to 9', async () => {
      const args = formattedTestData;
      const actual = await createDiagram(args);
      expect(actual).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    });
  });
  describe('markHorizLines', () => {
    it('Marks horizontal lines on grid', async () => {
      const grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const actual = await markHorizLines(grid, formattedTestData);
      expect(actual).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
      ]);
    });
  });
  describe('markVertLines', () => {
    it('Mark vertical lines on grid without altering previous markers', async () => {
      const grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
      ];
      const actual = await markVertLines(grid, formattedTestData);
      expect(actual).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
      ]);
    });
  });
  describe('markDiagLines', () => {
    it('Mark diagonal lines on grid without altering previous markers', async () => {
      const grid = [
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
      ];
      const actual = await markDiagLines(grid, formattedTestData);
      expect(actual).toEqual([
        [1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0, 2, 0, 0],
        [0, 0, 2, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 2, 0, 2, 0, 0],
        [0, 1, 1, 2, 3, 1, 3, 2, 1, 1],
        [0, 0, 0, 1, 0, 2, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
      ]);
    });
  });
  describe('partOne', () => {
    it('Returns the number of points at which at least two lines overlap, considering only horiz and vert', async () => {
      const args = formattedTestData;
      const actual = await partOne(args);
      expect(actual).toEqual(5);
    });
  });
  describe('partTwo', () => {
    it('Returns the number of points at which at least two lines overlap, considering horiz, vert, and diag', async () => {
      const args = formattedTestData;
      const actual = await partTwo(args);
      expect(actual).toEqual(12);
    });
  });
});
