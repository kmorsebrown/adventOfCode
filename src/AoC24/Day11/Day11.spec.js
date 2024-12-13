const {
  formatData,
  transformStones,
  blink,
  partOne,
  partTwo,
} = require('./Day11');

// npm test -- src/AoC24/Day11/Day11.spec.js

describe('Day11', () => {
  const mockInput = ['0', '1', '10', '99', '999'];
  const mockInputTwo = ['125', '17'];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day11TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('transformStones', () => {
    it('transforms stones according to the rules', () => {
      const actual = transformStones(mockInput);
      expect(actual).toEqual(['1', '2024', '1', '0', '9', '9', '2021976']);
    });
    it('handles leading zeroes', () => {
      const actual = transformStones(['1000', '100000']);
      expect(actual).toEqual(['10', '0', '100', '0']);
    });
  });
  describe('blink', () => {
    it('transforms stones after 3 blinks', () => {
      const actual = blink(mockInputTwo, 3);
      expect(actual).toEqual(['512072', '1', '20', '24', '28676032']);
    });
    it('transforms stones after 6 blinks', () => {
      const actual = blink(mockInputTwo, 6);
      expect(actual).toEqual([
        '2097446912',
        '14168',
        '4048',
        '2',
        '0',
        '2',
        '4',
        '40',
        '48',
        '2024',
        '40',
        '48',
        '80',
        '96',
        '2',
        '8',
        '6',
        '7',
        '6',
        '0',
        '3',
        '2',
      ]);
    });
  });
  describe('partOne', () => {
    it('Returns the number of stones after 6 blinks', async () => {
      const actual = await partOne(mockInputTwo, 6);
      expect(actual).toEqual(22);
    });
    it('Returns the number of stones after 25 blinks', async () => {
      const actual = await partOne(mockInputTwo, 25);
      expect(actual).toEqual(55312);
    });
  });
  describe('partTwo', () => {
    it('Returns the number of stones after 25 blinks', async () => {
      const actual = await partTwo(mockInputTwo, 25);
      expect(actual).toEqual(55312);
    });
  });
});
