const { sum } = require('./maths.js');

describe('maths', () => {
  describe('sum', () => {
    it('sums an array of numbers', () => {
      expect(sum([1, 2, 3, 4])).toEqual(10);
    });
    it('sums an array of strings', () => {
      expect(sum(['01', ' 2', '3', '4', 'a'])).toEqual(10);
    });
  });
});
