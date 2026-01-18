import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts } from '../../Utils/parse.js';
import { combinations } from '../../Utils/maths.js';
import {
  checkPointInPolygon,
  checkSegmentsIntersect,
  checkSegmentsColinear,
} from '../../Utils/grids.js';

// https://adventofcode.com/2025/day/9

// DAY=9 npm run 2025
export async function formatData(filepath) {
  const data = await getData(filepath);
  return data.split('\n').map((str) => parseStringOfInts(str, ','));
}

const getArea = (t1, t2) => {
  const length = Math.abs(t1[1] - t2[1]) + 1;
  const width = Math.abs(t1[0] - t2[0]) + 1;
  return length * width;
}

// Part One

const partOne = async (input) => {
  const areas = new Map();
  let largestArea = 0;

  const totalCombinations = combinations(input.length, 2);

  for (const [i1, t1] of input.entries()) {
    if (areas.size === totalCombinations) {
      break;
    }
    for (const [i2, t2] of input.entries()) {
      if (areas.size === totalCombinations) {
        break;
      }

      if (i1 === i2) {
        continue;
      }

      if (areas.has(`${i1},${i2}`) || areas.has(`${i2},${i1}`)) {
        continue;
      }

      const area = getArea(t1, t2);
      areas.set(`${i1},${i2}`, area);

      if (area > largestArea) {
        largestArea = area;
      }
    }
  }

  return largestArea;
}

// Part Two

// https://www.xjavascript.com/blog/check-if-polygon-is-inside-a-polygon/

/**
 * Rectangle inside the polygon only if
 * all 4 vertices pass the PiP test
 * no rectangle edge intersects any polygon edge
 * @param {*} p1
 * @param {*} p2
 * @param {*} polygon
 * @returns
 */

const checkIfRectangleInPolygon = (p1, p2, polygon) => {
  // actual 4 sided rectangle
  const x_min = Math.min(p1[0], p2[0]);
  const x_max = Math.max(p1[0], p2[0]);
  const y_min = Math.min(p1[1], p2[1]);
  const y_max = Math.max(p1[1], p2[1]);

  // rectangle vertices
  const bl = [x_min, y_min]; //Bottom-left
  const br = [x_max, y_min]; //Bottom-right
  const tr = [x_max, y_max]; //Top-right
  const tl = [x_min, y_max]; //Top-left

  // if any of the vertices are not in the polygon
  // rectangle not in the polygon
  for (const vertex of [bl, br, tr, tl]) {
    if (!checkPointInPolygon(vertex, polygon)) {
      return false;
    }
  }

  // check if rectangle is "flat"
  if (p1[0] === p2[0] || p1[1] === p2[1]) {
    for (let i = 0; i < polygon.length; i++) {
      let pEdge = polygon[i + 1]
        ? [polygon[i], polygon[i + 1]]
        : [polygon[i], polygon[0]];

      const intersect = checkSegmentsIntersect(p1, p2, pEdge[0], pEdge[1]);
      const collinear = checkSegmentsColinear(p1, p2, pEdge[0], pEdge[1]);

      // flat rectangles will always overlapping with the polygon edge
      if (intersect && collinear) {
        return true;
      }
    }
    return false;
  } else {
    const rectangleEdges = [
      [tl, tr],
      [bl, br],
      [bl, tl],
      [br, tr],
    ];

    // Check if any of the rectangles edges intersect with any of the polygon's edges
    for (let i = 0; i < polygon.length; i++) {
      let pEdge = polygon[i + 1]
        ? [polygon[i], polygon[i + 1]]
        : [polygon[i], polygon[0]];

      for (const rEdge of rectangleEdges) {
        if (
          checkSegmentsIntersect(rEdge[0], rEdge[1], pEdge[0], pEdge[1], true)
        ) {
          // only fail if it it's a real intersection
          // not just touching/overlapping
          return false;
        }
      }
    }
    return true;
  }
}

const partTwo = async (input) => {
  const areas = new Map();
  let largestArea = 0;

  const totalCombinations = combinations(input.length, 2);

  for (const [i1, t1] of input.entries()) {
    if (areas.size === totalCombinations) {
      break;
    }
    for (const [i2, t2] of input.entries()) {
      if (areas.size === totalCombinations) {
        // we've calculated all possible areas
        break;
      }

      if (i1 === i2) {
        // both points are the same
        continue;
      }

      if (areas.has(`${i1},${i2}`) || areas.has(`${i2},${i1}`)) {
        // rectangle has already been evaluated
        continue;
      }

      if (!checkIfRectangleInPolygon(t1, t2, input)) {
        // rectangle is not fully within the polygon
        continue;
      }

      const area = getArea(t1, t2);
      areas.set(`${i1},${i2}`, area);

      if (area > largestArea) {
        largestArea = area;
      }
    }
  }

  return largestArea;
}

const solve = async () => {
  const dataPath = new URL('../../puzzleInputs/Day09Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 09');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

// Only run solve() when this file is executed directly
if (import.meta.url.endsWith(process.argv[1])) {
  solve();
}

export {
  solve,
  partOne,
  partTwo,
  getArea,
  checkIfRectangleInPolygon,
};
