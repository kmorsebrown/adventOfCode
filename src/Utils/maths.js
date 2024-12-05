exports.sum = (arr) => {
  arr = arr.map((n) => parseInt(n, 10)).filter((r) => !isNaN(r));
  return arr.reduce((a, b) => a + b);
};

exports.sortDescending = (arr) => {
  return arr.sort(function (a, b) {
    return b - a;
  });
};

exports.sortAscending = (arr) => {
  return arr.sort(function (a, b) {
    return a - b;
  });
};

// gcd, lcm, and lcmAll code from Kevin Talley's AoC 2023 Day 09 solution

exports.gcd = (a, b) => (b == 0 ? a : exports.gcd(b, a % b));
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

exports.lcm = (a, b) => (a / exports.gcd(a, b)) * b;
exports.lcmAll = (arr) => arr.reduce(exports.lcm, 1);

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

exports.isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
