const parseStringOfInts = (str, separator) => {
  return str
    .trim()
    .split(separator)
    .map((n) => parseInt(n, 10))
    .filter((r) => !isNaN(r));
};

const unique = (arr) => {
  const seen = new Set();
  return arr.filter((value) => {
    // typeof null is 'object'
    const type = value === null ? 'null' : typeof value;

    let key;

    if (type === 'number' || type === 'string' || type === 'boolean') {
      key = `${type}:${value}`;
    } else {
      key = `${type}:${JSON.stringify(value)}`;
    }

    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// https://www.geeksforgeeks.org/dsa/merging-intervals/
const mergeOverlap = (arr) => {
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

export { parseStringOfInts, unique, mergeOverlap };
