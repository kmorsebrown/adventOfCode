const {
  formatData,
  decodeCharacter,
  parseData,
  rearrangeBlocks,
  getFilesystemChecksum,
  partOne,
  partTwo,
} = require('./Day09');

// npm test -- src/AoC24/Day09/Day09.spec.js

describe('Day09', () => {
  const mockInputLong = '2333133121414131402';
  const mockParsedShort = '0..111....22222';
  const mockParsedLong = '00...111...2...333.44.5555.6666.777.888899';
  const mockRearrangedShort = '022111222......';
  const mockRearrangedLong = '0099811188827773336446555566..............';
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day09TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInputLong);
    });
  });
  describe('decodeCharacter', () => {
    it('Decodes a 5 at index 4 into a 5-block file with ID 2', () => {
      const actual = decodeCharacter('5', 4);
      expect(actual).toEqual('22222');
    });
    it('Decodes a 4 at index 3 into a 4 blocks of free space', () => {
      const actual = decodeCharacter('4', 3);
      expect(actual).toEqual('....');
    });
  });
  describe('parseData', () => {
    it('decodes a short string of data', async () => {
      const actual = await parseData('12345');
      expect(actual).toEqual(mockParsedShort);
    });
    it('decodes a medium string of data', async () => {
      const actual = await parseData('2333133121414131402');
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
  });
  describe('getFilesystemChecksum', () => {
    it('gets checksum', async () => {
      const actual = await getFilesystemChecksum(mockRearrangedLong);
      expect(actual).toEqual(1928);
    });
  });
  describe('partOne', () => {
    it('gets updated checksum', async () => {
      const actual = await partOne(mockInputLong);
      expect(actual).toEqual(1928);
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
