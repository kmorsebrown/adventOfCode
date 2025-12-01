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
