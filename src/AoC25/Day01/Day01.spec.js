const { formatData, rotateDial, partOne, partTwo } = require('./Day01');

// npm test -- src/AoC25/Day01/Day01.spec.js

describe('Day01', () => {
  const mockInput = [
    'L68',
    'L30',
    'R48',
    'L5',
    'R60',
    'L55',
    'L1',
    'L99',
    'R14',
    'L82',
  ];

  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day01TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });

  describe('rotateDial', () => {
    it('Returns a lower number when rotated L w/o passing 0', () => {
      expect(rotateDial(82, 'L30')).toEqual(52);
    });
    it('Handles passing 0 when rotating left', () => {
      expect(rotateDial(50, 'L68')).toEqual(82);
    });
    it('Returns a higher number when rotated R w/o passing 99', () => {
      expect(rotateDial(0, 'R14')).toEqual(14);
    });
    it('Handles passing 99 when rotating right', () => {
      expect(rotateDial(95, 'R60')).toEqual(55);
    });
    it('Passes other tests', () => {
      expect(rotateDial(52, 'R48')).toEqual(0);
      expect(rotateDial(0, 'L5')).toEqual(95);
      expect(rotateDial(55, 'L55')).toEqual(0);
      expect(rotateDial(0, 'L1')).toEqual(99);
      expect(rotateDial(99, 'L99')).toEqual(0);
      expect(rotateDial(14, 'L82')).toEqual(32);
    });
  });

  describe('partOne', () => {
    it('Returns password 3', async () => {
      const args = mockInput;
      const actual = await partOne(args);
      expect(actual).toEqual(3);
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
