const {
  formatData,
  getStartCoordinates,
  getPipeFromDir,
  checkConnection,
  getStartingPipe,
  getNextStep,
  partOne,
  partTwo,
} = require('./Day10');

// npm test -- src/AoC23/Day10/Day10.spec.js

describe('Day10', () => {
  const mockDataA = ['-L|F7', '7S-7|', 'L|7||', '-L-J|', 'L|-JF'];
  const mockDataB = ['7-F7-', '.FJ|7', 'SJLL7', '|F--J', 'LJ.LJ'];
  const NORTH = 'NORTH';
  const SOUTH = 'SOUTH';
  const EAST = 'EAST';
  const WEST = 'WEST';
  describe('formatData', () => {
    it('Formats the data A', async () => {
      const args = require.resolve('./Day10TestDataA.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockDataA);
    });
    it('Formats the data B', async () => {
      const args = require.resolve('./Day10TestDataB.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockDataB);
    });
  });
  describe('getStartCoordinates', () => {
    it('gets the start coordinates for mockDataA', () => {
      expect(getStartCoordinates(mockDataA)).toEqual({ xIdx: 1, yIdx: 1 });
    });
    it('gets the start coordinates for mockDataB', () => {
      expect(getStartCoordinates(mockDataB)).toEqual({ xIdx: 0, yIdx: 2 });
    });
  });
  describe('getPipeFromDir', () => {
    //getPipeFromDir = (data, coordinates, directionFromCurrent)
    it('gets pipe to north when current is not first row', () => {
      const coordinates = { xIdx: 1, yIdx: 1 };
      const directionFromCurrent = NORTH;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toEqual({ coords: { xIdx: 1, yIdx: 0 }, type: 'L' });
    });
    it('gets pipe to south when current is not last row', () => {
      const coordinates = { xIdx: 1, yIdx: 1 };
      const directionFromCurrent = SOUTH;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toEqual({ coords: { xIdx: 1, yIdx: 2 }, type: '|' });
    });
    it('gets pipe to east when current is not first column', () => {
      const coordinates = { xIdx: 1, yIdx: 1 };
      const directionFromCurrent = EAST;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toEqual({ coords: { xIdx: 2, yIdx: 1 }, type: '-' });
    });
    it('gets pipe to west when current is not last column', () => {
      const coordinates = { xIdx: 1, yIdx: 1 };
      const directionFromCurrent = WEST;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toEqual({ coords: { xIdx: 0, yIdx: 1 }, type: '7' });
    });
    it('returns undefined when getting pipe to north and current is first row', () => {
      const coordinates = { xIdx: 0, yIdx: 0 };
      const directionFromCurrent = NORTH;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toBeUndefined();
    });
    it('returns undefined when getting pipe to south and current is last row', () => {
      const coordinates = { xIdx: 4, yIdx: 4 };
      const directionFromCurrent = SOUTH;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toBeUndefined();
    });
    it('returns undefined when getting pipe to east and current is last column', () => {
      const coordinates = { xIdx: 4, yIdx: 4 };
      const directionFromCurrent = EAST;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toBeUndefined();
    });
    it('returns undefined when getting pipe to west and current is first column', () => {
      const coordinates = { xIdx: 0, yIdx: 0 };
      const directionFromCurrent = WEST;
      expect(
        getPipeFromDir(mockDataA, coordinates, directionFromCurrent)
      ).toBeUndefined();
    });
  });
  describe('checkConnection', () => {
    // checkConnection = (pipe, directionFromCurrent)
    it('returns true if connecting to north and northern pipe connects south', () => {
      expect(checkConnection('7', NORTH)).toEqual(true);
      expect(checkConnection('F', NORTH)).toEqual(true);
      expect(checkConnection('|', NORTH)).toEqual(true);
    });
    it('returns true if connecting to south and southern pipe connects north', () => {
      expect(checkConnection('L', SOUTH)).toEqual(true);
      expect(checkConnection('J', SOUTH)).toEqual(true);
      expect(checkConnection('|', SOUTH)).toEqual(true);
    });
    it('returns true if connecting to east and eastern pipe connects west', () => {
      expect(checkConnection('-', EAST)).toEqual(true);
      expect(checkConnection('J', EAST)).toEqual(true);
      expect(checkConnection('7', EAST)).toEqual(true);
    });
    it('returns true if connecting to west and western pipe connects east', () => {
      expect(checkConnection('-', WEST)).toEqual(true);
      expect(checkConnection('L', WEST)).toEqual(true);
      expect(checkConnection('F', WEST)).toEqual(true);
    });
    it('returns false if connecting to north and northern pipe does not connect sourth', () => {
      expect(checkConnection('-', NORTH)).toEqual(false);
      expect(checkConnection('J', NORTH)).toEqual(false);
    });
    it('returns false if connecting to south and southern pipe does not connect north', () => {
      expect(checkConnection('-', SOUTH)).toEqual(false);
      expect(checkConnection('F', SOUTH)).toEqual(false);
    });
    it('returns false if connecting to east and eastern pipe does not connect west', () => {
      expect(checkConnection('|', EAST)).toEqual(false);
      expect(checkConnection('F', EAST)).toEqual(false);
    });
    it('returns false if connecting to west and western pipe does not connect east', () => {
      expect(checkConnection('|', WEST)).toEqual(false);
      expect(checkConnection('J', WEST)).toEqual(false);
    });
  });
  describe('getStartingPipe', () => {
    it('returns the starting pipe type for mock data A', () => {
      expect(getStartingPipe(mockDataA)).toEqual({
        type: 'F',
        coords: { xIdx: 1, yIdx: 1 },
      });
    });
    it('returns the starting pipe type for mock data B', () => {
      expect(getStartingPipe(mockDataB)).toEqual({
        type: 'F',
        coords: { xIdx: 0, yIdx: 2 },
      });
    });
  });
  describe('getNextStep', () => {
    it('gets next step for F pipe connecting east to - pipe', () => {
      const mockStep = {
        direction: EAST,
        pipe: {
          type: 'F',
          coords: { xIdx: 1, yIdx: 1 },
        },
      };
      expect(getNextStep(mockDataA, mockStep)).toEqual({
        direction: EAST,
        pipe: {
          type: '-',
          coords: { xIdx: 2, yIdx: 1 },
        },
      });
    });
    it('gets next step for - pipe connecting east to 7 pipe', () => {
      const mockStep = {
        direction: EAST,
        pipe: {
          type: '-',
          coords: { xIdx: 2, yIdx: 1 },
        },
      };
      expect(getNextStep(mockDataA, mockStep)).toEqual({
        direction: SOUTH,
        pipe: {
          type: '7',
          coords: { xIdx: 3, yIdx: 1 },
        },
      });
    });
    it('gets next step for | pipe connecting south to J pipe', () => {
      const mockStep = {
        direction: SOUTH,
        pipe: {
          type: '|',
          coords: { xIdx: 3, yIdx: 2 },
        },
      };
      expect(getNextStep(mockDataA, mockStep)).toEqual({
        direction: WEST,
        pipe: {
          type: 'J',
          coords: { xIdx: 3, yIdx: 3 },
        },
      });
    });
  });
  describe('partOne', () => {
    it('Returns the number of steps to get to point in loop farthest from start data A', async () => {
      const actual = await partOne(mockDataA);
      expect(actual).toEqual(4);
    });
    it('Returns the number of steps to get to point in loop farthest from start data B', async () => {
      const actual = await partOne(mockDataB);
      expect(actual).toEqual(8);
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
