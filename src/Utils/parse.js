exports.parseStringOfInts = (str, seperator) => {
  return str
    .trim()
    .split(seperator)
    .map((n) => parseInt(n, 10))
    .filter((r) => !isNaN(r));
};
