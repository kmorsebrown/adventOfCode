exports.isFirst = (Idx) => {
  return Idx === 0;
};

exports.isLast = (Idx, array) => {
  return Idx === array.length - 1;
};

// from https://www.30secondsofcode.org/js/s/transpose-matrix/
exports.transpose = (arr) => arr[0].map((col, i) => arr.map((row) => row[i]));

exports.transposeArrStr = (arr) => {
  const arrayifiedGrid = arr.map((row) => {
    let string = row.trim();
    return string.split('');
  });

  return exports.transpose(arrayifiedGrid).map((row) => row.join(''));
};
