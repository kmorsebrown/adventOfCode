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
 * returns coordinates for values
 * adjacent to data[row][col]
 * that pass the callback
 *
 * @param {string[] | (number|string)[][]} data
 * @param {number} row
 * @param {number} col
 * @param {function} callback
 * @param {Object} options
 * @returns boolean
 */
exports.getAdjacentMatches = (data, row, col, callback, options = {}) => {
  let adjacentMatches = [];
  const isNotFirstRow = row !== 0;
  const isNotLastRow = row !== data.length - 1;
  const isNotFirstCol = col !== 0;
  const isNotLastCol = col !== data[row].length - 1;

  // check N
  if (isNotFirstRow && callback(data[row - 1][col])) {
    adjacentMatches.push({ row: row - 1, col: col });
  }

  // check E
  if (isNotLastCol && callback(data[row][col + 1])) {
    adjacentMatches.push({ row: row, col: col + 1 });
  }

  // check S
  if (isNotLastRow && callback(data[row + 1][col])) {
    adjacentMatches.push({ row: row + 1, col: col });
  }

  // check W
  if (isNotFirstCol && callback(data[row][col - 1])) {
    adjacentMatches.push({ row: row, col: col - 1 });
  }

  if (options.allowDiagonals) {
    // check NE
    if (isNotFirstRow && isNotLastCol && callback(data[row - 1][col + 1])) {
      adjacentMatches.push({ row: row - 1, col: col + 1 });
    }

    // check SE
    if (isNotLastRow && isNotLastCol && callback(data[row + 1][col + 1])) {
      adjacentMatches.push({ row: row + 1, col: col + 1 });
    }

    // check SW
    if (isNotLastRow && isNotFirstCol && callback(data[row + 1][col - 1])) {
      adjacentMatches.push({ row: row + 1, col: col - 1 });
    }

    // check NW
    if (isNotFirstRow && isNotFirstCol && callback(data[row - 1][col - 1])) {
      adjacentMatches.push({ row: row - 1, col: col - 1 });
    }
  }
  return adjacentMatches;
};

exports.getAllAdjacentCoords = (data, row, col, options = {}) => {
  let adjacentCoords = [];
  const isNotFirstRow = row !== 0;
  const isNotLastRow = row !== data.length - 1;
  const isNotFirstCol = col !== 0;
  const isNotLastCol = col !== data[row].length - 1;

  // get N
  if (isNotFirstRow) {
    adjacentCoords.push({ row: row - 1, col: col });
  }

  // get E
  if (isNotLastCol) {
    adjacentCoords.push({ row: row, col: col + 1 });
  }

  // get S
  if (isNotLastRow) {
    adjacentCoords.push({ row: row + 1, col: col });
  }

  // get W
  if (isNotFirstCol) {
    adjacentCoords.push({ row: row, col: col - 1 });
  }

  if (options.allowDiagonals) {
    // get NE
    if (isNotFirstRow && isNotLastCol) {
      adjacentCoords.push({ row: row - 1, col: col + 1 });
    }

    // get SE
    if (isNotLastRow && isNotLastCol) {
      adjacentCoords.push({ row: row + 1, col: col + 1 });
    }

    // get SW
    if (isNotLastRow && isNotFirstCol) {
      adjacentCoords.push({ row: row + 1, col: col - 1 });
    }

    // get NW
    if (isNotFirstRow && isNotFirstCol) {
      adjacentCoords.push({ row: row - 1, col: col - 1 });
    }
  }
  return adjacentCoords;
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

exports.getCoordinatesForMatch = (row, row_idx, val) => {
  let coordinates = [];

  for (let col_idx = 0; col_idx < row.length; col_idx++) {
    if (row[col_idx] === val) {
      coordinates.push({
        row: row_idx,
        col: col_idx,
      });
    }
  }
  return coordinates;
};

exports.getCoordinatesForAllMatches = (grid, val) => {
  const coordinates = [];
  grid.forEach((row, row_idx) => {
    coordinates.push(...exports.getCoordinatesForMatch(row, row_idx, val));
  });
  return coordinates;
};
