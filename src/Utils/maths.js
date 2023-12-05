exports.sum = (arr) => {
  arr = arr.map((n) => parseInt(n, 10)).filter((r) => !isNaN(r));
  return arr.reduce((a, b) => a + b);
};
