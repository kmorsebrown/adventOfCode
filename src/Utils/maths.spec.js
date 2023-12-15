const {
  sum,
  sortDescending,
  sortAscending,
  gcd,
  lcm,
  lcmAll,
} = require('./maths.js');
// npm test -- src/Utils/maths.spec.js

describe('maths', () => {
  describe('sum', () => {
    it('sums an array of numbers', () => {
      expect(sum([1, 2, 3, 4])).toEqual(10);
    });
    it('sums an array of strings', () => {
      expect(sum(['01', ' 2', '3', '4', 'a'])).toEqual(10);
    });
  });
  describe('sortDescending', () => {
    it('returns array of numbers sorted in descending order', () => {
      expect(sortDescending([104, 140000, 99])).toEqual([140000, 104, 99]);
    });
  });
  describe('sortAscending', () => {
    it('returns array of numbers sorted in descending order', () => {
      expect(sortAscending([104, 140000, 99])).toEqual([99, 104, 140000]);
    });
  });
  describe('gcd', () => {
    it('returns gcd of 98 and 56', () => {
      expect(gcd(98, 56)).toEqual(14);
    });
    it('returns gcd of 20 and 28', () => {
      expect(gcd(20, 28)).toEqual(4);
    });
  });
  describe('lcm', () => {
    it('returns the lcm of 2 and 3', () => {
      expect(lcm(2, 3)).toEqual(6);
    });
    it('returns the lcm of 15 and 20', () => {
      expect(lcm(15, 20)).toEqual(60);
    });
    it('returns the lcm of 5 and 7', () => {
      expect(lcm(5, 7)).toEqual(35);
    });
  });
  describe('lcmAll', () => {
    it('returns lcm for 2 numbers', () => {
      expect(lcmAll([2, 3])).toEqual(6);
    });
    it('returns lcm for 4 numbers', () => {
      expect(lcmAll([5, 10, 15, 25])).toEqual(150);
    });
    it('returns lcm for 6 numbers', () => {
      expect(lcmAll([12, 18, 7, 15, 20, 24, 28])).toEqual(2520);
    });
  });
});
