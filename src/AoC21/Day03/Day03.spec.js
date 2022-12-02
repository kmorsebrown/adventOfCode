const path = require('path');
const {
  formatData,
  getPowerConsumption,
  getLifeSupportRating,
} = require('./Day03.js');

describe('Day03', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day03TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010',
      ]);
    });
  });
  describe('getPowerConsumption', () => {
    it('Multiplies gamma and epislon rates to get power consumption', async () => {
      const args = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010',
      ];
      const actual = await getPowerConsumption(args);
      expect(actual).toEqual(198);
    });
  });
  describe('getLifeSupportRating', () => {
    it('Multiplies oxygen and C02 rating to get the life support rating', async () => {
      const args = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010',
      ];
      const actual = await getLifeSupportRating(args);
      expect(actual).toEqual(230);
    });
  });
});
