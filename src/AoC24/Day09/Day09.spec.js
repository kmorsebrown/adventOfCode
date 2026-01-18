import {
  formatData,
  decodeCharacter,
  parseData,
  rearrangeBlocks,
  getFilesystemChecksum,
  partOne,
  parseDataPt2,
  rearrangeBlocksPt2,
  partTwo,
} from './Day09.js';

// npm test -- src/AoC24/Day09/Day09.spec.js

describe('Day09', () => {
  const mockInputLong = '2333133121414131402';
  const mockParsedShort = [
    '0',
    '.',
    '.',
    '1',
    '1',
    '1',
    '.',
    '.',
    '.',
    '.',
    '2',
    '2',
    '2',
    '2',
    '2',
  ];
  const mockParsedLong = [
    '0',
    '0',
    '.',
    '.',
    '.',
    '1',
    '1',
    '1',
    '.',
    '.',
    '.',
    '2',
    '.',
    '.',
    '.',
    '3',
    '3',
    '3',
    '.',
    '4',
    '4',
    '.',
    '5',
    '5',
    '5',
    '5',
    '.',
    '6',
    '6',
    '6',
    '6',
    '.',
    '7',
    '7',
    '7',
    '.',
    '8',
    '8',
    '8',
    '8',
    '9',
    '9',
  ];
  const mockRearrangedShort = [
    '0',
    '2',
    '2',
    '1',
    '1',
    '1',
    '2',
    '2',
    '2',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
  ];
  const mockRearrangedLong = [
    '0',
    '0',
    '9',
    '9',
    '8',
    '1',
    '1',
    '1',
    '8',
    '8',
    '8',
    '2',
    '7',
    '7',
    '7',
    '3',
    '3',
    '3',
    '6',
    '4',
    '4',
    '6',
    '5',
    '5',
    '5',
    '5',
    '6',
    '6',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
    '.',
  ];
  const mockParsedShortPt2 = [
    ['0'],
    ['.', '.'],
    ['1', '1', '1'],
    ['.', '.', '.', '.'],
    ['2', '2', '2', '2', '2'],
  ];
  const mockParsedLongPt2 = [
    ['0', '0'],
    ['.', '.', '.'],
    ['1', '1', '1'],
    ['.', '.', '.'],
    ['2'],
    ['.', '.', '.'],
    ['3', '3', '3'],
    ['.'],
    ['4', '4'],
    ['.'],
    ['5', '5', '5', '5'],
    ['.'],
    ['6', '6', '6', '6'],
    ['.'],
    ['7', '7', '7'],
    ['.'],
    ['8', '8', '8', '8'],
    [],
    ['9', '9'],
  ];
  const mockRearrangedPt2 = [
    '0',
    '0',
    '9',
    '9',
    '2',
    '1',
    '1',
    '1',
    '7',
    '7',
    '7',
    '.',
    '4',
    '4',
    '.',
    '3',
    '3',
    '3',
    '.',
    '.',
    '.',
    '.',
    '5',
    '5',
    '5',
    '5',
    '.',
    '6',
    '6',
    '6',
    '6',
    '.',
    '.',
    '.',
    '.',
    '.',
    '8',
    '8',
    '8',
    '8',
    '.',
    '.',
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day09TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInputLong);
    });
  });
  describe('decodeCharacter', () => {
    it('Decodes a 5 at index 4 into a 5-block file with ID 2', () => {
      const actual = decodeCharacter('5', 4);
      expect(actual).toEqual(['2', '2', '2', '2', '2']);
    });
    it('Decodes a 4 at index 3 into a 4 blocks of free space', () => {
      const actual = decodeCharacter('4', 3);
      expect(actual).toEqual(['.', '.', '.', '.']);
    });
    it('Decodes a 2 at index 22 into a 2-block file with ID 11', () => {
      const actual = decodeCharacter('2', 22);
      expect(actual).toEqual(['11', '11']);
    });
  });
  describe('parseData', () => {
    it('decodes a short string of data', async () => {
      const actual = await parseData('12345');
      expect(actual).toEqual(mockParsedShort);
    });
    it('decodes a medium string of data', async () => {
      const actual = await parseData(mockInputLong);
      expect(actual).toEqual(mockParsedLong);
    });
  });
  describe('rearrangeBlocks', () => {
    it('rearranges the blocks', () => {
      const actual = rearrangeBlocks(mockParsedShort);
      expect(actual).toEqual(mockRearrangedShort);
    });
    it('rearranges the blocks for longer input', () => {
      const actual = rearrangeBlocks(mockParsedLong);
      expect(actual).toEqual(mockRearrangedLong);
    });
    it('rearranges the blocks for double digit IDs', () => {
      const actual = rearrangeBlocks([
        '8',
        '.',
        '9',
        '.',
        '.',
        '10',
        '.',
        '11',
        '11',
      ]);
      expect(actual).toEqual(['8', '11', '9', '11', '10', '.', '.', '.', '.']);
    });
  });
  describe('getFilesystemChecksum', () => {
    it('returns checksum', async () => {
      const actual = await getFilesystemChecksum(mockRearrangedLong);
      expect(actual).toEqual(1928);
    });
  });
  describe('partOne', () => {
    it('returns checksum', async () => {
      const actual = await partOne(mockInputLong);
      expect(actual).toEqual(1928);
    });
  });
  describe('parseDataPt2', () => {
    it('decodes a short string of data', async () => {
      const actual = await parseDataPt2('12345');
      expect(actual).toEqual(mockParsedShortPt2);
    });
    it('decodes a medium string of data', async () => {
      const actual = await parseDataPt2(mockInputLong);
      expect(actual).toEqual(mockParsedLongPt2);
    });
  });
  describe('rearrangeBlocksPt2', () => {
    it('rearranges whole file blocks together', () => {
      const actual = rearrangeBlocksPt2(mockParsedLongPt2);
      expect(actual).toEqual(mockRearrangedPt2);
    });
  });
  describe('partTwo', () => {
    it('returns checksum', async () => {
      const actual = await partTwo(mockInputLong);
      expect(actual).toEqual(2858);
    });
  });
});
