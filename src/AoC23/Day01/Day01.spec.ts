import * as path from 'path';
import {
  formatData,
  extractNumbers,
  getCalibrationValues,
  partOne,
  extractWordAndDigitNumbers,
  partTwo,
} from './Day01';

// npm test src/AoC23/Day01/Day01.spec.ts

describe('Day01', () => {
  describe('formatData', () => {
    it('Formats the data into an array of strings', async () => {
      const args = require.resolve('./Day01Pt1TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        '1abc2',
        'pqr3stu8vwx',
        'a1b2c3d4e5f',
        'treb7uchet',
      ]);
    });
    it('Formats different data into an array of strings', async () => {
      const args = require.resolve('./Day01Pt2TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen',
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
  describe('extractWordAndDigitNumbers', () => {
    it('Converts spelled out numbers into digits', () => {
      expect(extractWordAndDigitNumbers('two1nine')).toEqual('219');
      expect(extractWordAndDigitNumbers('eightwothree')).toEqual('823');
      expect(extractWordAndDigitNumbers('abcone2threexyz')).toEqual('123');
      expect(extractWordAndDigitNumbers('xtwone3four')).toEqual('2134');
      expect(extractWordAndDigitNumbers('4nineeightseven2')).toEqual('49872');
      expect(extractWordAndDigitNumbers('zoneight234')).toEqual('18234');
      expect(extractWordAndDigitNumbers('7pqrstsixteen')).toEqual('76');
    });
    it('return digit characters only if no spelled out numbers', () => {
      expect(extractWordAndDigitNumbers('abc1dfg')).toEqual('1');
      expect(extractWordAndDigitNumbers('123')).toEqual('123');
    });
    it('returns empty string if no digits or spelled out numbers', () => {
      expect(extractWordAndDigitNumbers('abcdfg')).toEqual('');
    });
  });
  describe('partTwo', () => {
    it('returns sum of calibration values', async () => {
      const args = await formatData(require.resolve('./Day01Pt2TestData.txt'));
      const actual = await partTwo(args);
      expect(actual).toEqual(281);
    });
  });
});
