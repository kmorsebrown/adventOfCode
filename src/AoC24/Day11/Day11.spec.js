import {
  formatData,
  transformStone,
  transformStones,
  blink,
  partOne,
  partTwo,
} from './Day11.js';

// npm test -- src/AoC24/Day11/Day11.spec.js

describe('Day11', () => {
  const mockInput = new Map([
    ['0', 1],
    ['1', 1],
    ['10', 1],
    ['99', 1],
    ['999', 1],
  ]);
  const mockInputTwo = new Map([
    ['125', 1],
    ['17', 1],
  ]);
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day11TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('transformStone', () => {
    it('transforms a 0 into a 1', () => {
      expect(transformStone('0')).toEqual(['1']);
    });
    it('transforms a number with an even number of digits into two numbers', () => {
      expect(transformStone('23')).toEqual(['2', '3']);
    });
    it('multiplies a stone with an odd number of digits by 2024', () => {
      expect(transformStone('999')).toEqual(['2021976']);
    });
    it('handles leading zeros', () => {
      expect(transformStone('100000')).toEqual(['100', '0']);
    });
  });
  describe('transformStones', () => {
    it('transforms stones according to the rules', () => {
      const actual = transformStones(mockInput);
      expect(actual).toEqual(
        new Map([
          ['1', 2],
          ['2024', 1],
          ['0', 1],
          ['9', 2],
          ['2021976', 1],
        ])
      );
    });
  });
  describe('blink', () => {
    it('transforms stones after 3 blinks', () => {
      const actual = blink(mockInputTwo, 3);
      expect(actual).toEqual(
        new Map([
          ['512072', 1],
          ['1', 1],
          ['20', 1],
          ['24', 1],
          ['28676032', 1],
        ])
      );
    });
    it('transforms stones after 6 blinks', () => {
      const actual = blink(mockInputTwo, 6);
      expect(actual).toEqual(
        new Map([
          ['2097446912', 1],
          ['14168', 1],
          ['4048', 1],
          ['2', 4],
          ['0', 2],
          ['4', 1],
          ['40', 2],
          ['48', 2],
          ['2024', 1],
          ['80', 1],
          ['96', 1],
          ['8', 1],
          ['6', 2],
          ['7', 1],
          ['3', 1],
        ])
      );
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
