const { isNumeric } = require('./maths.js');
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

exports.arrayifyGrid = (arr, delimiter) => {
  return arr.map((row) => {
    let newArray = row.trim().split(delimiter);
    return newArray.map((el) => {
      if (isNumeric(el)) {
        return Number(el);
      } else {
        return el;
      }
    });
  });
};

/**
 *
 * @param {Array[]} two_d_array
 */
exports.flipHoriz = (two_d_array) => {
  for (let row of two_d_array) {
    row.reverse();
  }
  return two_d_array;
};

exports.rotateOneEighty = (two_d_array) => {
  let rotatedGrid = exports.transpose(two_d_array);
  rotatedGrid = exports.flipHoriz(rotatedGrid);
  rotatedGrid = exports.transpose(rotatedGrid);
  rotatedGrid = exports.flipHoriz(rotatedGrid);
  return rotatedGrid;
};

/**
 *
 * @param {string[]} data
 * @param {number} row
 * @param {number} col
 * @param {function} callback
 * @returns boolean
 */
exports.hasAdjacentMatch = (data, row, col, callback) => {
  let numAdjacentMatch = 0;
  const isNotFirstRow = row !== 0;
  const isNotLastRow = row !== data.length - 1;
  const isNotFirstCol = col !== 0;
  const isNotLastCol = col !== data[row].length - 1;

  // checking for values that pass the callback
  // adjacent to data[row][col]

  if (isNotFirstRow) {
    // check above center
    numAdjacentMatch += callback(data[row - 1][col]) ? 1 : 0;

    // check above left
    if (isNotFirstCol) {
      numAdjacentMatch += callback(data[row - 1][col - 1]) ? 1 : 0;
    }

    // check above right
    if (isNotLastCol) {
      numAdjacentMatch += callback(data[row - 1][col + 1]) ? 1 : 0;
    }
  }

  // check left
  if (isNotFirstCol) {
    numAdjacentMatch += callback(data[row][col - 1]) ? 1 : 0;
  }

  // check right
  if (isNotLastCol) {
    numAdjacentMatch += callback(data[row][col + 1]) ? 1 : 0;
  }

  if (isNotLastRow) {
    // check below center
    numAdjacentMatch += callback(data[row + 1][col]) ? 1 : 0;

    // check below left
    if (isNotFirstCol) {
      numAdjacentMatch += callback(data[row + 1][col - 1]) ? 1 : 0;
    }

    // check below right
    if (isNotLastCol) {
      numAdjacentMatch += callback(data[row + 1][col + 1]) ? 1 : 0;
    }
  }
  return numAdjacentMatch > 0;
};

exports.getAdjacentCoords = ({ height, width, row, col, dir }) => {
  const isNotFirstRow = row !== 0;
  const isNotLastRow = row !== height - 1;
  const isNotFirstCol = col !== 0;
  const isNotLastCol = col !== width - 1;

  // retrieving values adjacent to [row][col]

  switch (dir) {
    case 'N':
      if (isNotFirstRow) {
        return { row: row - 1, col: col };
      }
      break;
    case 'S':
      if (isNotLastRow) {
        return { row: row + 1, col: col };
      }
      break;
    case 'E':
      if (isNotLastCol) {
        return { row: row, col: col + 1 };
      }
      break;
    case 'W':
      if (isNotFirstCol) {
        return { row: row, col: col - 1 };
      }
      break;
    case 'NE':
      if (isNotFirstRow && isNotLastCol) {
        return { row: row - 1, col: col + 1 };
      }
      break;
    case 'NW':
      if (isNotFirstRow && isNotFirstCol) {
        return { row: row - 1, col: col - 1 };
      }
      break;
    case 'SE':
      if (isNotLastRow && isNotLastCol) {
        return { row: row + 1, col: col + 1 };
      }
      break;
    case 'SW':
      if (isNotLastRow && isNotFirstCol) {
        return { row: row + 1, col: col - 1 };
      }
      break;
  }
};

exports.getValueFromCoords = (grid, { row, col }) => {
  return grid[row][col];
};
