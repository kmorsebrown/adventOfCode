import * as path from 'path';
import {
  formatData,
  extractNumbers,
  getCalibrationValues,
  partOne,
  partTwo,
} from './Day01';

// npm test src/AoC23/Day01/Day01.spec.ts

describe('Day01', () => {
  describe('formatData', () => {
    it('Formats the data into an array of strings', async () => {
      //const args = path.join(__dirname, 'Day01TestData.txt');
      const args = require.resolve('./Day01TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        '1abc2',
        'pqr3stu8vwx',
        'a1b2c3d4e5f',
        'treb7uchet',
      ]);
    });
  });
  describe('extractNumbers', () => {
    it('extracts numbers from a string', () => {
      expect(extractNumbers('1abc2')).toEqual('12');
      expect(extractNumbers('pqr3stu8vwx')).toEqual('38');
      expect(extractNumbers('a1b2c3d4e5f')).toEqual('12345');
      expect(extractNumbers('treb7uchet')).toEqual('7');
    });
    it('returns empty string if string contains no numbers', () => {
      expect(extractNumbers('abgd')).toEqual('');
    });
  });
  describe('getCalibrationValues', () => {
    it('returns 0 when string is empty', () => {
      expect(getCalibrationValues('')).toEqual(0);
    });
    it('returns 77 when string is "7"', () => {
      expect(getCalibrationValues('7')).toEqual(77);
    });
    it('returns 38 when string is "38"', () => {
      expect(getCalibrationValues('38')).toEqual(38);
    });
    it('returns 15 when string is "12345"', () => {
      expect(getCalibrationValues('12345')).toEqual(15);
    });
  });
  describe('partOne', () => {
    it('returns sum of calibration values', async () => {
      const actual = await partOne([
        '1abc2',
        'pqr3stu8vwx',
        'a1b2c3d4e5f',
        'treb7uchet',
      ]);
      expect(actual).toEqual(142);
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
