const { getData, Queue } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { BitwiseShape, BitwiseField } = require('../../Utils/bitwise.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/12

// DAY=12 npm run 2025
const formatData = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n\n');
  const regions = splitData.pop().split('\n');
  let formattedShapes = splitData.map((row) =>
    row.replace(/\d:\n/g, '').split('\n')
  );

  let formattedRegions = [];

  for (const region of regions) {
    const regex = /\d*x\d*:/g;
    const dimensions = parseStringOfInts(
      region.match(regex)[0].replace(':', ''),
      'x'
    );
    const gifts = parseStringOfInts(region.replace(regex, ''), ' ');
    formattedRegions.push({
      width: dimensions[0],
      height: dimensions[1],
      gifts,
    });
  }

  return {
    shapes: formattedShapes,
    regions: formattedRegions,
  };
};

// Part One

/*
  presents come in a few standard but weird shapes

  shapes and the regions in which they need to fit are all measured in standard units

  presents need to be placed into the regions in a way that follows a standard 2d unit grid

  cannot stack presents

  presents can be rotated and flipped as necessary to. make them fit

  must be placed perfectly on the grid => no overlaps
*/

const generateShapePermutations = (shape) => {
  const generatedShapes = new Set();

  const rotated = [
    shape,
    shape.rotate90Clockwise(),
    shape.rotate180(),
    shape.rotate90Counterclockwise(),
  ];

  let shapePermutations = [];

  for (const rotatedShape of rotated) {
    const shapeKey = rotatedShape.toString();
    const flippedShape = rotatedShape.flipHorizontal();
    const flippedShapeKey = flippedShape.toString();

    if (!generatedShapes.has(shapeKey)) {
      shapePermutations.push(rotatedShape);
      generatedShapes.add(shapeKey);
    }

    // rotating 180 & flipping horizontally = flipping vertically
    // flipping horizontally = rotating 180 & flipping vertically
    // so no need to do a discreet vertical flip for each rotation
    if (!generatedShapes.has(flippedShapeKey)) {
      shapePermutations.push(flippedShape);
      generatedShapes.add(flippedShapeKey);
    }
  }

  return shapePermutations;
};

const generateShapesToPlaceMap = (shapes, giftsToPlace) => {
  const shapesMap = new Map();

  giftsToPlace.forEach((count, i) => {
    if (count > 0) {
      const permutations = generateShapePermutations(shapes[i]);
      const shapeKey = shapes[i].toString().replaceAll('\n', '_');

      shapesMap.set(shapeKey, {
        permutations,
        num: count,
      });
    }
  });

  return shapesMap;
};

const getAreaShapesToPlace = (shapes, giftsToPlace) => {
  let totalArea = 0;

  for (let i = 0; i < shapes.length; i++) {
    if (giftsToPlace[i] == 0) continue;
    const area = shapes[i].getAllSetBitCoordinates().length;
    totalArea += area * giftsToPlace[i];
  }
  return totalArea;
};

const generateShapesMap = (shapes, recordNum = false) => {
  const shapesMap = new Map();

  for (const shape of shapes) {
    const key = shape.toString();
    if (shapesMap.has(key)) {
      if (recordNum) {
        shapesMap.set(key, shapesMap.get(key) + 1);
      }
      continue;
    } else {
      shapesMap.set(key, recordNum ? 1 : 0);
    }
  }
  return shapesMap;
};

// based on
// https://github.com/Salman964/PentoSolve/blob/main/client/src/lib/pentomino.ts
const placeGifts = (region, shapes) => {
  const shapesToPlaceMap = generateShapesToPlaceMap(shapes, region.gifts);

  // Flatten the map into a list of specific gift instances to place.
  const giftsList = [];
  for (const [key, data] of shapesToPlaceMap) {
    // We add one entry per required count
    for (let i = 0; i < data.num; i++) {
      giftsList.push({
        permutations: data.permutations,
        name: key,
        area: data.permutations[0].area, // Assume all rotations have same area
      });
    }
  }

  // Sort by Area Descending (Largest/Hardest pieces first)
  // help fail fast if large piece doesn't fit
  giftsList.sort((a, b) => b.area - a.area);

  const regionArea = region.width * region.height;

  // AREA PRUNING:
  // all gifts fit in 3x3 grid
  const numGiftsWillDefFit = (region.width / 3) * (region.height / 3);

  // SUCCESS: if Num Gifts that would fit if laid side by side >= gifts to place
  // ALWAYS POSSIBLE => no need to check placement
  if (numGiftsWillDefFit >= sum(region.gifts)) {
    return true;
  }

  // FAILURE: Gift Area > Region Area => ALWAYS IMPOSSIBLE
  const totalRequiredArea = getAreaShapesToPlace(shapes, region.gifts);
  if (totalRequiredArea > regionArea) {
    return false;
  }

  let initialState = new BitwiseField(region.width, region.height);
  const cache = new Map();

  const minGiftArea = Math.min([...giftsList.values()].map((g) => g.area));

  // Helper to check if all gifts are placed without looping
  let totalGiftsLeft = sum(region.gifts);

  // Recursive puzzle placement
  const placeGift = (giftIndex, state, currentAreaFilled) => {
    // SUCCESS: No more gifts to place
    if (totalGiftsLeft === 0) {
      return true;
    }

    // MEMOIZATION
    const stateKey = `${state.rows.join('_')}|${giftIndex}`;

    if (cache.has(stateKey)) {
      return cache.get(stateKey);
    }

    // AREA PRUNING: Is there enough empty space left to fit remaining gift area?
    const availableEmptyCells = regionArea - currentAreaFilled;
    const remainingGiftsArea = totalRequiredArea - currentAreaFilled;
    if (availableEmptyCells < remainingGiftsArea) {
      cache.set(stateKey, false);
      return false;
    }

    const currentGift = giftsList[giftIndex];

    // try to cover this specific cell with every available gift
    for (const [giftKey, giftData] of shapesToPlaceMap) {
      if (giftData.num === 0) continue;

      // for each permutation of the gift
      for (const permutation of giftData.permutations) {
        // One of the bits in the shape MUST land on (x, y)
        for (const offset of permutation.offsets) {
          const startX = x - offset.x;
          const startY = y - offset.y;

          const newState = state.tryPlace(permutation, startX, startY);

          // continue to next offset if gift cannot be placed at current offset
          if (newState === null) continue;

          // mutation for recursion
          giftData.num--;
          totalGiftsLeft--;

          // Move to targetIndex + 1 because we know 'targetIndex' is now filled
          if (
            placeGift(
              newState,
              targetIndex + 1,
              currentAreaFilled + permutation.area
            )
          ) {
            return true;
          }

          // BACKTRACK
          totalGiftsLeft++;
          giftData.num++;
        }
      }
    }

    // Leave this cell empty if solution couldn't be reached by filling with a piece
    // We only try this if the current cell isn't filled by a piece
    // and if we have "extra" space
    if (availableEmptyCells > remainingGiftsArea) {
      const result = placeGift(state, targetIndex + 1, currentAreaFilled);
      if (result) {
        cache.set(stateKey, true);
        return true;
      }
    }

    cache.set(stateKey, false);
    return false;
  };

  return placeGift(initialState, 0, 0);
};

// how many of the regions can fit all of the presents listed?
const partOne = async (input) => {
  let bitwiseShapes = [];
  for (const shape of input.shapes) {
    bitwiseShapes.push(BitwiseShape.fromData(shape, '#'));
  }

  let num = 0;

  for (const region of input.regions) {
    const fitsGifts = placeGifts(region, bitwiseShapes);
    num += fitsGifts ? 1 : 0;
  }
  return num;
};

// Part Two
const partTwo = async (input) => {
  return input;
};

const solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day12Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      // await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 12');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

//solve();

module.exports = {
  solve,
  formatData,
  placeGifts,
  generateShapePermutations,
  generateShapesToPlaceMap,
  generateShapesMap,
  getAreaShapesToPlace,
  partOne,
  partTwo,
};
