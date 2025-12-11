exports.parseStringOfInts = (str, separator) => {
  return str
    .trim()
    .split(separator)
    .map((n) => parseInt(n, 10))
    .filter((r) => !isNaN(r));
};

exports.unique = (arr) => {
  return arr.filter((value, index, array) => array.indexOf(value) === index);
};

// https://www.geeksforgeeks.org/dsa/merging-intervals/
exports.mergeOverlap = (arr) => {
  if (arr.length === 0) return [];

  // Sort intervals based on start values
  const sorted = [...arr].sort((a, b) => a[0] - b[0]);

  const res = [];
  res.push(sorted[0]);

  for (let i = 1; i < sorted.length; i++) {
    const last = res[res.length - 1];
    const curr = sorted[i];

    // If current interval overlaps with last, merge them
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      res.push(curr);
    }
  }

  return res;
};
