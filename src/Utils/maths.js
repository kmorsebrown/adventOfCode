const sum = (arr) => {
  arr = arr.map((n) => parseInt(n, 10)).filter((r) => !isNaN(r));
  return arr.reduce((a, b) => a + b);
};

const sortDescending = (arr) => {
  return arr.sort(function (a, b) {
    return b - a;
  });
};

const sortAscending = (arr) => {
  return arr.sort(function (a, b) {
    return a - b;
  });
};

// gcd, lcm, and lcmAll code from Kevin Talley's AoC 2023 Day 09 solution

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
/* 
  https://www.geeksforgeeks.org/program-to-find-gcd-or-hcf-of-two-numbers/
  GCD (greatest common divisor) or HCF (highest common factor) of two numbers is
  the largest number that divides both of them

  Input: a = 20, b = 28
  Output: 4
  Explanation: The factors of 20 are 1, 2, 4, 5, 10 and 20. 
  The factors of 28 are 1, 2, 4, 7, 14 and 28. 
  Among these factors, 1, 2 and 4 are the common factors of both 20 and 28. 
  The greatest among the common factors is 4.
*/

const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (arr) => arr.reduce(lcm, 1);

/* 
  https://www.geeksforgeeks.org/least-common-multiple/
  https://www.geeksforgeeks.org/program-to-find-lcm-of-two-numbers/
  LCM (least common multiple) of two numbers is the smallest number which can be divided by the both numbers 
  (with a remainder of 0)
  Input: a = 4, b = 6
  Output: 12
  Explanation: The multiples of 4 are 4, 8, 12, 14, 20, 24, 28, 32, 36, 40...
  The multiples of 6 are 6, 12, 18, 24, 30, 36, 42, 48, 54, 60...
  Among these multiples, 12, 24, 36, 48 are the common multiples of both 4 and 6
  The least among the common multiples is 12.
*/

const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);

const getDistance = (p, q) => {
  return Math.sqrt(
    (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2
  );
};

// optimized factorial & combinations javascript from
// https://stackoverflow.com/questions/75330679/how-to-implement-the-ncr-algorithm-combination-when-n-167-in-javascript
const factorial = (num, min = 0) => {
  let f = 1;
  for (let i = num; i > min; --i) {
    f = f * i;
  }
  return f;
};

const combinations = (n, r) => {
  if (n < r || n < 0 || r < 0) {
    return 0; // Invalid input
  }
  if (n === r || r === 0) {
    return 1;
  }

  return factorial(n, n - r) / factorial(r, 0);
};

// https://www.geeksforgeeks.org/javascript/find-all-the-combinations-of-the-array-values-in-javascript/
const getCombinations = (arr) => {
  const res = [];
  const total = Math.pow(2, arr.length);

  for (let i = 1; i < total; i++) {
    const comb = [];
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) {
        comb.push(arr[j]);
      }
    }
    res.push(comb);
  }
  return res;
};

// based on www.geeksforgeeks.org/dsa/combinations-with-repetitions/
function* combinationRepetitionGenerator(
  arr,
  r,
  allowRepeats = true,
  start = 0,
  chosen = []
) {
  // Base case: if we've picked 'r' items, yield the current set
  if (chosen.length === r) {
    yield [...chosen];
    return;
  }

  for (let i = start; i < arr.length; i++) {
    chosen.push(arr[i]);
    // Yield all combinations from the next recursive step
    yield* combinationRepetitionGenerator(
      arr,
      r,
      allowRepeats,
      allowRepeats ? i : i + 1,
      chosen
    );
    // Backtrack: remove the last element to try the next one
    chosen.pop();
  }
}

function* generateRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const cartesian = (...a) =>
  // the ...a syntax collects all args into a single array named a
  // allows the function to handle nay number of input sets

  // reduce "collapsed" the list of arrays into a single final result
  // acc: holds the combinations built so far (accumulator)
  // currentSet: next array of items we need to multiply into combinations
  // [[]]: initial value, a single "empty" combination
  a.reduce(
    (acc, currentSet) =>
      // flatMap takes the nested array created in the next step and "flattens" them
      // by one level so that acc says a flat list of combinations
      // rather than a deeply nested tree
      // combined: array of elements picked from previous sets

      acc.flatMap((combined) =>
        // loop through each item in the "new" set
        currentSet.map((item) =>
          // takes the elements of combined and adds item as a new entry at the end
          [...combined, item]
        )
      ),
    [[]]
  );

function* cartesianGenerator(...a) {
  const result = [[]];

  // Yield combinations one by one at the final step
  function* helper(acc, index) {
    if (index === a.length) {
      yield acc;
      return;
    }

    for (const item of a[index]) {
      yield* helper([...acc, item], index + 1);
    }
  }

  yield* helper([], 0);
}

const isEven = (num) => {
  return num % 2 == 0;
};

const isOdd = (num) => {
  return num % 2 == 1;
};

module.exports = {
  sum,
  sortDescending,
  sortAscending,
  gcd,
  lcm,
  lcmAll,
  isNumeric,
  getDistance,
  factorial,
  combinations,
  getCombinations,
  generateRange,
  cartesian,
  cartesianGenerator,
  combinationRepetitionGenerator,
  isEven,
  isOdd,
};
