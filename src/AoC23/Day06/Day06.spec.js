import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData,
  getMinMaxHoldTimeToWin,
  formatDataPart2,
  partOne,
  partTwo,
} from './Day06.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC23/Day06/Day06.spec.js

describe('Day06', () => {
  const formattedDataPartOne = [
    {
      time: 7,
      recordDist: 9,
    },
    {
      time: 15,
      recordDist: 40,
    },
    {
      time: 30,
      recordDist: 200,
    },
  ];
  const formattedDataPartTwo = {
    time: 71530,
    recordDist: 940200,
  };
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day06TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(formattedDataPartOne);
    });
  });
  describe('getMinMaxHoldTimeToWin', () => {
    it('Hold button for at least 2 ms and no more than 5 ms to beat 9 mm record in 7 ms race', () => {
      expect(getMinMaxHoldTimeToWin(formattedDataPartOne[0])).toEqual([2, 5]);
    });
    it('Hold button for at least 4 ms and no more than 11 ms to beat 40 mm record in 15 ms race', () => {
      expect(getMinMaxHoldTimeToWin(formattedDataPartOne[1])).toEqual([4, 11]);
    });
    it('Hold button for at least 11 ms and no more than 19 ms to beat 200 mm record in 30 ms race', () => {
      expect(getMinMaxHoldTimeToWin(formattedDataPartOne[2])).toEqual([11, 19]);
    });
  });
  describe('partOne', () => {
    it('multiply the number of ways you can beat the record in each race together', async () => {
      const actual = await partOne(formattedDataPartOne);
      expect(actual).toEqual(288);
    });
  });
  describe('formatDataPart2', () => {
    it('formats data for part 2', async () => {
      const args = new URL('./Day06TestData.txt', import.meta.url).pathname;
      const actual = await formatDataPart2(args);
      expect(actual).toEqual(formattedDataPartTwo);
    });
  });
  describe('partTwo', () => {
    it('Get number of ways to win a race', async () => {
      const actual = await partTwo(formattedDataPartTwo);
      expect(actual).toEqual(71503);
    });
  });
});
