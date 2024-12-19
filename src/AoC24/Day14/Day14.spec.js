const {
  formatData,
  moveRobot,
  moveRobots,
  getRobotPositionsAfterXSeconds,
  getRobotsPerQuadrant,
  partOne,
  partTwo,
} = require('./Day14');

// npm test -- src/AoC24/Day14/Day14.spec.js

describe('Day14', () => {
  const mockInput = [
    { p: [0, 4], v: [3, -3] },
    { p: [6, 3], v: [-1, -3] },
    { p: [10, 3], v: [-1, 2] },
    { p: [2, 0], v: [2, -1] },
    { p: [0, 0], v: [1, 3] },
    { p: [3, 0], v: [-2, -2] },
    { p: [7, 6], v: [-1, -3] },
    { p: [3, 0], v: [-1, -2] },
    { p: [9, 3], v: [2, 3] },
    { p: [7, 3], v: [-1, 2] },
    { p: [2, 4], v: [2, -3] },
    { p: [9, 5], v: [-3, -3] },
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day14TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('moveRobot', () => {
    it('Moves the robot to the right & up', () => {
      const mockRobot = { p: [2, 4], v: [2, -3] };
      const actual = moveRobot(mockRobot, 11, 7);
      expect(actual).toEqual({ p: [4, 1], v: [2, -3] });
    });
    it('Wraps the robot vertically', () => {
      const mockRobot = { p: [4, 1], v: [2, -3] };
      const actual = moveRobot(mockRobot, 11, 7);
      expect(actual).toEqual({ p: [6, 5], v: [2, -3] });
    });
    it('Wraps the robot horizontally', () => {
      const mockRobot = { p: [10, 6], v: [2, -3] };
      const actual = moveRobot(mockRobot, 11, 7);
      expect(actual).toEqual({ p: [1, 3], v: [2, -3] });
    });
    it('Moves the robot to the left & down', () => {
      const mockRobot = { p: [10, 3], v: [-1, 2] };
      const actual = moveRobot(mockRobot, 11, 7);
      expect(actual).toEqual({ p: [9, 5], v: [-1, 2] });
    });
  });
  describe('moveRobots', () => {
    it('Moves the robots once', () => {
      const result = [
        { p: [3, 1], v: [3, -3] },
        { p: [5, 0], v: [-1, -3] },
        { p: [9, 5], v: [-1, 2] },
        { p: [4, 6], v: [2, -1] },
        { p: [1, 3], v: [1, 3] },
        { p: [1, 5], v: [-2, -2] },
        { p: [6, 3], v: [-1, -3] },
        { p: [2, 5], v: [-1, -2] },
        { p: [0, 6], v: [2, 3] },
        { p: [6, 5], v: [-1, 2] },
        { p: [4, 1], v: [2, -3] },
        { p: [6, 2], v: [-3, -3] },
      ];

      const actual = moveRobots(mockInput, 11, 7);
      expect(actual).toEqual(result);
    });
  });
  describe('getRobotPositionsAfterXSeconds', () => {
    it('Gets robot position after one second', () => {
      const result = [
        { p: [3, 1], v: [3, -3] },
        { p: [5, 0], v: [-1, -3] },
        { p: [9, 5], v: [-1, 2] },
        { p: [4, 6], v: [2, -1] },
        { p: [1, 3], v: [1, 3] },
        { p: [1, 5], v: [-2, -2] },
        { p: [6, 3], v: [-1, -3] },
        { p: [2, 5], v: [-1, -2] },
        { p: [0, 6], v: [2, 3] },
        { p: [6, 5], v: [-1, 2] },
        { p: [4, 1], v: [2, -3] },
        { p: [6, 2], v: [-3, -3] },
      ];

      const actual = getRobotPositionsAfterXSeconds(mockInput, 1, 11, 7);
      expect(actual).toEqual(result);
    });
    it('Gets robot position after 2 seconds', () => {
      const result = [
        { p: [6, 5], v: [3, -3] },
        { p: [4, 4], v: [-1, -3] },
        { p: [8, 0], v: [-1, 2] },
        { p: [6, 5], v: [2, -1] },
        { p: [2, 6], v: [1, 3] },
        { p: [10, 3], v: [-2, -2] },
        { p: [5, 0], v: [-1, -3] },
        { p: [1, 3], v: [-1, -2] },
        { p: [2, 2], v: [2, 3] },
        { p: [5, 0], v: [-1, 2] },
        { p: [6, 5], v: [2, -3] },
        { p: [3, 6], v: [-3, -3] },
      ];

      const actual = getRobotPositionsAfterXSeconds(mockInput, 2, 11, 7);
      expect(actual).toEqual(result);
    });
    it('Gets robot position after 100 seconds', () => {
      const result = [
        { p: [3, 5], v: [3, -3] },
        { p: [5, 4], v: [-1, -3] },
        { p: [9, 0], v: [-1, 2] },
        { p: [4, 5], v: [2, -1] },
        { p: [1, 6], v: [1, 3] },
        { p: [1, 3], v: [-2, -2] },
        { p: [6, 0], v: [-1, -3] },
        { p: [2, 3], v: [-1, -2] },
        { p: [0, 2], v: [2, 3] },
        { p: [6, 0], v: [-1, 2] },
        { p: [4, 5], v: [2, -3] },
        { p: [6, 6], v: [-3, -3] },
      ];

      const actual = getRobotPositionsAfterXSeconds(mockInput, 100, 11, 7);
      expect(actual).toEqual(result);
    });
  });
  describe('getRobotsPerQuadrant', () => {
    it('returns the number of robots in each quadrant', () => {
      const robots = [
        { p: [3, 5], v: [3, -3] },
        { p: [5, 4], v: [-1, -3] },
        { p: [9, 0], v: [-1, 2] },
        { p: [4, 5], v: [2, -1] },
        { p: [1, 6], v: [1, 3] },
        { p: [1, 3], v: [-2, -2] },
        { p: [6, 0], v: [-1, -3] },
        { p: [2, 3], v: [-1, -2] },
        { p: [0, 2], v: [2, 3] },
        { p: [6, 0], v: [-1, 2] },
        { p: [4, 5], v: [2, -3] },
        { p: [6, 6], v: [-3, -3] },
      ];
      const result = {
        nw: 1,
        ne: 3,
        se: 1,
        sw: 4,
      };

      const actual = getRobotsPerQuadrant(robots, 11, 7);

      expect(actual).toEqual(result);
    });
  });
  describe('partOne', () => {
    it('Returns the safety factor', async () => {
      const actual = await partOne(mockInput, 100, 11, 7);
      expect(actual).toEqual(12);
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
