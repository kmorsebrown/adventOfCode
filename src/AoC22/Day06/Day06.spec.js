const path = require('path');
const { formatData, getNumCharactersProcessed } = require('./Day06.js');

describe('Day06', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day06TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual('mjqjpqmgbljsphdztnvjfqwrcgsmlb');
    });
  });
  describe('getNumCharactersProcessed', () => {
    it('Returns 7 if the marker type is startOfPacket', async () => {
      const data = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
      const type = 'startOfPacket';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(7);
    });
    it('Returns 5 if the marker type is startOfPacket', async () => {
      const data = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
      const type = 'startOfPacket';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(5);
    });
    it('Returns 6 if the marker type is startOfPacket', async () => {
      const data = 'nppdvjthqldpwncqszvftbrmjlhg';
      const type = 'startOfPacket';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(6);
    });
    it('Returns 10 if the marker type is startOfPacket', async () => {
      const data = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
      const type = 'startOfPacket';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(10);
    });
    it('Returns 11 if the marker type is startOfPacket', async () => {
      const data = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
      const type = 'startOfPacket';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(11);
    });
    it('Returns 19 if the marker type is startOfMessage', async () => {
      const data = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
      const type = 'startOfMessage';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(19);
    });
    it('Returns 23 if the marker type is startOfMessage', async () => {
      const data = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
      const type = 'startOfMessage';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(23);
    });
    it('Returns 23 if the marker type is startOfMessage', async () => {
      const data = 'nppdvjthqldpwncqszvftbrmjlhg';
      const type = 'startOfMessage';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(23);
    });
    it('Returns 29 if the marker type is startOfMessage', async () => {
      const data = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
      const type = 'startOfMessage';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(29);
    });
    it('Returns 26 if the marker type is startOfMessage', async () => {
      const data = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
      const type = 'startOfMessage';
      const actual = await getNumCharactersProcessed(data, type);
      expect(actual).toEqual(26);
    });
  });
});
