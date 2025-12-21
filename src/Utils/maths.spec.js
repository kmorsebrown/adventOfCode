const {
  sum,
  sortDescending,
  sortAscending,
  gcd,
  lcm,
  lcmAll,
  cartesian,
  getCombinations,
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
  describe('getCombinations', () => {
    it('returns all possible combinations of array of numbers', () => {
      const actual = getCombinations([1, 2, 3]);
      const expected = [[1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];
      expect(actual).toEqual(expected);
    });
    it('returns all possible combinations of array of arrays', () => {
      const actual = getCombinations([
        ['a', 'b'],
        ['@', '!', '.'],
        [1, 2],
      ]);
      const expected = [
        [['a', 'b']],
        [['@', '!', '.']],
        [
          ['a', 'b'],
          ['@', '!', '.'],
        ],
        [[1, 2]],
        [
          ['a', 'b'],
          [1, 2],
        ],
        [
          ['@', '!', '.'],
          [1, 2],
        ],
        [
          ['a', 'b'],
          ['@', '!', '.'],
          [1, 2],
        ],
      ];
      expect(actual).toEqual(expected);
    });
  });
  describe('cartesian', () => {
    it('returns the cartesian product of three different arrays', () => {
      const arr1 = ['a', 'b'];
      const arr2 = [1, 2];
      const arr3 = ['@', '!', '.'];

      const expected = [
        ['a', 1, '@'],
        ['a', 1, '!'],
        ['a', 1, '.'],
        ['a', 2, '@'],
        ['a', 2, '!'],
        ['a', 2, '.'],
        ['b', 1, '@'],
        ['b', 1, '!'],
        ['b', 1, '.'],
        ['b', 2, '@'],
        ['b', 2, '!'],
        ['b', 2, '.'],
      ];

      expect(cartesian(arr1, arr2, arr3)).toEqual(expected);
    });
    it('returns the cartesian product of three identical arrays', () => {
      const arr = [1, 2, 3];

      const expected = [
        [1, 1, 1],
        [1, 1, 2],
        [1, 1, 3],
        [1, 2, 1],
        [1, 2, 2],
        [1, 2, 3],
        [1, 3, 1],
        [1, 3, 2],
        [1, 3, 3],
        [2, 1, 1],
        [2, 1, 2],
        [2, 1, 3],
        [2, 2, 1],
        [2, 2, 2],
        [2, 2, 3],
        [2, 3, 1],
        [2, 3, 2],
        [2, 3, 3],
        [3, 1, 1],
        [3, 1, 2],
        [3, 1, 3],
        [3, 2, 1],
        [3, 2, 2],
        [3, 2, 3],
        [3, 3, 1],
        [3, 3, 2],
        [3, 3, 3],
      ];

      expect(cartesian(...Array(3).fill(arr))).toEqual(expected);
    });
    it('returns the cartesian product of 3 2D arrays', () => {
      const arr = [[1, 2], [3, 4, 5], [6]];

      const expected = [
        [
          [1, 2],
          [1, 2],
        ],
        [
          [1, 2],
          [3, 4, 5],
        ],
        [[1, 2], [6]],
        [
          [3, 4, 5],
          [1, 2],
        ],
        [
          [3, 4, 5],
          [3, 4, 5],
        ],
        [[3, 4, 5], [6]],
        [[6], [1, 2]],
        [[6], [3, 4, 5]],
        [[6], [6]],
      ];

      expect(cartesian(...Array(2).fill(arr))).toEqual(expected);
    });
  });
});
