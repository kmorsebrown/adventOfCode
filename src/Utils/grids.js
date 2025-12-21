const { isNumeric } = require('./maths.js');
const isFirst = (Idx) => {
  return Idx === 0;
};

const isLast = (Idx, array) => {
  return Idx === array.length - 1;
};

// from https://www.30secondsofcode.org/js/s/transpose-matrix/
const transpose = (arr) => arr[0].map((col, i) => arr.map((row) => row[i]));

const transposeRagged = (arr) => {
  let colLengths = arr.map((el) => el.length);
  let maxCols = Math.max(...colLengths);

  let result = [];

  for (let i = 0; i < maxCols; ++i) {
    result[i] = [];

    for (let j = 0; j < arr.length; ++j) {
      result[i][j] = arr[j][i];
    }
  }

  return result.map((el) => el.filter(Boolean));
};

const transposeArrStr = (arr) => {
  const arrayifiedGrid = arr.map((row) => {
    let string = row.trim();
    return string.split('');
  });

  return transpose(arrayifiedGrid).map((row) => row.join(''));
};

const arrayifyGrid = (arr, delimiter) => {
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
const flipHoriz = (two_d_array) => {
  for (let row of two_d_array) {
    row.reverse();
  }
  return two_d_array;
};

const rotateOneEighty = (two_d_array) => {
  let rotatedGrid = transpose(two_d_array);
  rotatedGrid = flipHoriz(rotatedGrid);
  rotatedGrid = transpose(rotatedGrid);
  rotatedGrid = flipHoriz(rotatedGrid);
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
const getAdjacentMatches = (data, row, col, callback, options = {}) => {
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

const getAllAdjacentCoords = (data, row, col, options = {}) => {
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

const getAdjacentCoords = ({ height, width, row, col, dir }) => {
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

const getValueFromCoords = (grid, { row, col }) => {
  return grid[row][col];
};

const getCoordinatesForMatch = (row, row_idx, val) => {
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

const getCoordinatesForAllMatches = (grid, val) => {
  const coordinates = [];
  grid.forEach((row, row_idx) => {
    coordinates.push(...getCoordinatesForMatch(row, row_idx, val));
  });
  return coordinates;
};

// Helper to normalize [x, y] or {x: a, y: b} into a consistent object
const normalizeXY = (p) => {
  const x = typeof p.x !== 'undefined' ? p.x : p[0];
  const y = typeof p.y !== 'undefined' ? p.y : p[1];
  return { x, y };
};

// https://codingtechroom.com/question/how-to-check-if-a-point-is-within-a-line-segment-in-javascript

/*
  Function to check if a point lies on a line segment:

  - if cross product is close to 0, then the 3 points form a straight line
  - if dot product >= 0, then point is not "behind" the lineStart (point is at or past the start of the segment)
  - if dot prouduct <= length squared, then point is not "beyond" lineEnd (point is at or before the end of the segment)
*/

const checkPointOnSegment = (point, lineStart, lineEnd) => {
  const p = normalizeXY(point);
  const a = normalizeXY(lineStart);
  const b = normalizeXY(lineEnd);

  // The cross product of two vectors in 2D tells you the area of the parallelogram they form.
  // If the area is 0, the vectors are parallel
  let crossProduct = (p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y);
  if (Math.abs(crossProduct) > Number.EPSILON) return false; // Not collinear

  // The Dot Product measures how much one vector "projects" onto another
  let dotProduct = (p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y);

  if (dotProduct < 0) return false; // point is behind point a

  /*
    Calculating the actual length of a line requires Math.sqrt(),
    which is a "heavy" (slow) operation for a computer.
    Comparing the dot product to the squared length
    produces the exact same result but the code runs much faster
    because it only uses basic multiplication and addition.

    If DistanceA > DistanceB, then DistanceA ** 2 > DistanceB ** 2

    Calc with traditional length (the square root): dotProduct / lengthAB <= lengthAB
    Identical but more performant calc without: dotProduct <= lengthAB * lengthAB
  */
  let squaredLength = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  return dotProduct <= squaredLength; // Check if within AB
};

// https://www.geeksforgeeks.org/dsa/how-to-check-if-a-given-point-lies-inside-a-polygon/

/*
  Ray Casting Algorithm:
  Counts how many times a ray starting from a point (x,y)
  and extending infinitely to the right
  crosses the edges of the polygon:
  - Odd number of crossings: The point is inside.
  - Even number of crossings: The point is outside.

  shortcomings: doesn't always handle vertexes or boundaries well
*/
const checkPointInPolygon = (point, polygon) => {
  const num_vertices = polygon.length;
  const normalizedPoint = normalizeXY(point);
  const x = normalizedPoint.x;
  const y = normalizedPoint.y;
  let inside = false;

  let p1 = normalizeXY(polygon[0]);
  let p2;

  for (let i = 1; i <= num_vertices; i++) {
    p2 = normalizeXY(polygon[i % num_vertices]);

    // short circuit check for if the point is on the segment
    if (checkPointOnSegment(point, p1, p2)) {
      return true;
    }

    if (y > Math.min(p1.y, p2.y)) {
      if (y <= Math.max(p1.y, p2.y)) {
        if (x <= Math.max(p1.x, p2.x)) {
          // x_intersection is the exact x-coordinate that a horizontal ray
          // starting from x and extending infinitely to the right
          // intersects with the specific edge of the polygon being tested
          // code here is a rearrangement of the standard equation for a line (the "Slope Equation")
          const x_intersection =
            ((y - p1.y) * (p2.x - p1.x)) / (p2.y - p1.y) + p1.x;

          if (p1.x === p2.x || x <= x_intersection) {
            inside = !inside;
          }
        }
      }
    }

    p1 = p2;
  }

  return inside;
};

// https://www.xjavascript.com/blog/check-if-polygon-is-inside-a-polygon/

/**
 *
 * @param {*} line1Start
 * @param {*} line1End
 * @param {*} line2Start
 * @param {*} line2End
 * @param {*} proper set to true if you want to ignore collinear overlaps and shared vertices
 * @returns
 */
const checkSegmentsIntersect = (
  line1Start,
  line1End,
  line2Start,
  line2End,
  proper = false
) => {
  const a = normalizeXY(line1Start);
  const b = normalizeXY(line1End);
  const c = normalizeXY(line2Start);
  const d = normalizeXY(line2End);

  // compute orientations of key point triplets
  // 0 (collinear), 1 (clockwise), 2 (counterclockwise)
  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);

  if (proper) {
    // Proper intersection: endpoints of each segment are on
    // opposite sides of the other segment.
    // (1 and 2 represent Clockwise and Counter-Clockwise)
    return (
      ((o1 === 1 && o2 === 2) || (o1 === 2 && o2 === 1)) &&
      ((o3 === 1 && o4 === 2) || (o3 === 2 && o4 === 1))
    );
  }

  // segments intersect in their interiors
  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  // a, b, c colinear && c on segment a, b
  if (o1 === 0 && checkPointOnSegment(c, a, b)) {
    return true;
  }

  // a, b, d colinear && d on segment a, b
  if (o2 === 0 && checkPointOnSegment(d, a, b)) {
    return true;
  }

  // c, d, a colinear && a on segment c, d
  if (o3 === 0 && checkPointOnSegment(a, c, d)) {
    return true;
  }

  // c, d, b colinear && b on segment b, d
  if (o4 && checkPointOnSegment(b, c, d)) {
    return true;
  }

  return false;
};

/**
 * checks if two segments lie on the same infinite line
 * @param {*} line1Start
 * @param {*} line1End
 * @param {*} line2Start
 * @param {*} line2End
 * @returns boolean
 */
const checkSegmentsColinear = (line1Start, line1End, line2Start, line2End) => {
  const a = normalizeXY(line1Start);
  const b = normalizeXY(line1End);
  const c = normalizeXY(line2Start);
  const d = normalizeXY(line2End);

  // If both orientations of C and D relative to AB are 0 (colinear),
  // then all four points must be on the same line.
  return orientation(a, b, c) === 0 && orientation(a, b, d) === 0;
};

/**
 * Helper: orientation of triplet (p, q, r)
 * @param {*} p [x,y] or {x, y}
 * @param {*} q [x,y] or {x, y}
 * @param {*} r [x,y] or {x, y}
 * @returns 0 (collinear), 1 (clockwise), 2 (counterclockwise)
 */
const orientation = (p, q, r) => {
  const Pxy = normalizeXY(p);
  const Qxy = normalizeXY(q);
  const Rxy = normalizeXY(r);

  const result =
    (Qxy.y - Pxy.y) * (Rxy.x - Qxy.x) - (Qxy.x - Pxy.x) * (Rxy.y - Qxy.y);
  if (result == 0) {
    return 0;
  }

  return result > 0 ? 1 : 2;
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

module.exports = {
  isFirst,
  isLast,
  transpose,
  transposeArrStr,
  flipHoriz,
  rotateOneEighty,
  getAdjacentMatches,
  arrayifyGrid,
  transposeRagged,
  getAdjacentCoords,
  getAllAdjacentCoords,
  getValueFromCoords,
  getCoordinatesForMatch,
  getCoordinatesForAllMatches,
  checkPointOnSegment,
  checkPointInPolygon,
  checkSegmentsIntersect,
  checkSegmentsColinear,
  orientation,
  Point,
};
