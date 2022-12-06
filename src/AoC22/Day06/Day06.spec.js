const path = require('path');
const { formatData, partOne, partTwo } = require('./Day06.js');

describe('Day06', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day06TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual('mjqjpqmgbljsphdztnvjfqwrcgsmlb');
    });
  });
  describe('partOne', () => {
    it('Identifies that the first marker is after character 7', async () => {
      const args = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
      const actual = await partOne(args);
      expect(actual).toEqual(7);
    });
    it('Identifies that the first marker is after character 5', async () => {
      const args = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
      const actual = await partOne(args);
      expect(actual).toEqual(5);
    });
    it('Identifies that the first marker is after character 6', async () => {
      const args = 'nppdvjthqldpwncqszvftbrmjlhg';
      const actual = await partOne(args);
      expect(actual).toEqual(6);
    });
    it('Identifies that the first marker is after character 10', async () => {
      const args = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
      const actual = await partOne(args);
      expect(actual).toEqual(10);
    });
    it('Identifies that the first marker is after character 11', async () => {
      const args = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
      const actual = await partOne(args);
      expect(actual).toEqual(11);
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
