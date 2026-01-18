import {
  sum,
  sortDescending,
  sortAscending,
  gcd,
  lcm,
  lcmAll,
  cartesian,
  cartesianGenerator,
  getCombinations,
  combinationRepetitionGenerator,
} from './maths.js';
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
  describe('combinationRepetitionGenerator', () => {
    it('should return all combinations of size 2 from a 3-element array', () => {
      const input = ['A', 'B', 'C'];
      const r = 2;
      const result = [...combinationRepetitionGenerator(input, r)];

      const expected = [
        ['A', 'A'],
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'B'],
        ['B', 'C'],
        ['C', 'C'],
      ];

      expect(result).toEqual(expected);
      expect(result.length).toBe(6);
    });

    it('should handle r = 1 correctly', () => {
      const input = [1, 2, 3];
      const result = [...combinationRepetitionGenerator(input, 1)];

      expect(result).toEqual([[1], [2], [3]]);
    });

    it('should return an empty array if r is 0', () => {
      const input = [1, 2, 3];
      const result = [...combinationRepetitionGenerator(input, 0)];

      // The generator yields once (the empty set []) then finishes
      expect(result).toEqual([[]]);
    });

    it('should handle a single element array with multiple repetitions', () => {
      const input = ['Z'];
      const result = [...combinationRepetitionGenerator(input, 3)];

      expect(result).toEqual([['Z', 'Z', 'Z']]);
    });

    it('should work with different data types (numbers and strings)', () => {
      const input = [1, 'A'];
      const result = [...combinationRepetitionGenerator(input, 2, true)];

      expect(result).toEqual([
        [1, 1],
        [1, 'A'],
        ['A', 'A'],
      ]);
    });
    it('should work with 2D arrays', () => {
      const input = [
        [1, 2],
        [3, 4],
      ];
      const result = [...combinationRepetitionGenerator(input, 2, true)];

      expect(result).toEqual([
        [
          [1, 2],
          [1, 2],
        ],
        [
          [1, 2],
          [3, 4],
        ],
        [
          [3, 4],
          [3, 4],
        ],
      ]);
    });

    it('should be lazy and allow partial iteration', () => {
      const input = [1, 2, 3, 4, 5];
      const gen = combinationRepetitionGenerator(input, 3, true);

      // We only take the first result manually
      const firstValue = gen.next().value;

      expect(firstValue).toEqual([1, 1, 1]);
      // The generator hasn't finished, proving it didn't calculate all 35 combinations yet
    });

    it('should not allow repeats when allowRepeats is false', () => {
      const input = ['A', 'B', 'C'];
      const r = 2;
      const result = [...combinationRepetitionGenerator(input, r, false)];

      const expected = [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
      ];

      expect(result).toEqual(expected);
      expect(result.length).toBe(3);
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
  describe('cartesianGenerator', () => {
    it('should return an empty array wrapped in a generator if no arguments are passed', () => {
      const gen = cartesianGenerator();
      const result = Array.from(gen);
      expect(result).toEqual([[]]);
    });

    it('should handle a single array input', () => {
      const gen = cartesianGenerator([1, 2]);
      const result = Array.from(gen);
      expect(result).toEqual([[1], [2]]);
    });

    it('should calculate the Cartesian product of two arrays', () => {
      const gen = cartesianGenerator([1, 2], ['a', 'b']);
      const result = Array.from(gen);

      expect(result).toEqual([
        [1, 'a'],
        [1, 'b'],
        [2, 'a'],
        [2, 'b'],
      ]);
    });

    it('should handle arrays of different lengths', () => {
      const gen = cartesianGenerator([1], ['a', 'b'], [true]);
      const result = Array.from(gen);

      expect(result).toEqual([
        [1, 'a', true],
        [1, 'b', true],
      ]);
    });

    it('should yield values lazily', () => {
      const gen = cartesianGenerator([1, 2], ['a', 'b']);

      // Manually trigger next()
      expect(gen.next().value).toEqual([1, 'a']);
      expect(gen.next().value).toEqual([1, 'b']);

      // Ensure it isn't finished yet
      const third = gen.next();
      expect(third.value).toEqual([2, 'a']);
      expect(third.done).toBe(false);

      gen.next(); // [2, 'b']
      expect(gen.next().done).toBe(true);
    });

    it('should work correctly within a for...of loop', () => {
      const gen = cartesianGenerator(['red', 'blue'], ['large']);
      const gatheredResults = [];

      // The generator should allow standard iteration
      for (const combination of gen) {
        gatheredResults.push(combination);
      }

      expect(gatheredResults).toHaveLength(2);
      expect(gatheredResults[0]).toEqual(['red', 'large']);
      expect(gatheredResults[1]).toEqual(['blue', 'large']);
    });
  });
});
