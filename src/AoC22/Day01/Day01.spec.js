const path = require('path');
const { Day01Function } = require('./Day01.js');

describe('Day01', () => {
  describe('Day01Function', () => {
    it('Finds the total calories carried by the elf carrying the most calories', async () => {
      const args = path.join(__dirname, 'Day01TestData.txt');
      const actual = await getData(args);
      expect(actual).toEqual(24000);
    });
  });
});
