const path = require('path');
const { formatData, sumCalories, getHighestTotal } = require('./Day01.js');

describe('Day01', () => {
  describe('formatData', () => {
    it('Formats the data into an array of arrays', async () => {
      const args = path.join(__dirname, 'Day01TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        [1000, 2000, 3000],
        [4000],
        [5000, 6000],
        [7000, 8000, 9000],
        [10000],
      ]);
    });
  });
  describe('sumCalories', () => {
    it('Sums each array', async () => {
      const args = [
        [1000, 2000, 3000],
        [4000],
        [5000, 6000],
        [7000, 8000, 9000],
        [10000],
      ];
      const actual = await sumCalories(args);
      expect(actual).toEqual([6000, 4000, 11000, 24000, 10000]);
    });
  });
  describe('getHighestTotal', () => {
    it('Finds the total calories carried by the elf carrying the most calories', async () => {
      const args = [6000, 4000, 11000, 24000, 10000];
      const actual = await getHighestTotal(args);
      expect(actual).toEqual(24000);
    });
  });
});
