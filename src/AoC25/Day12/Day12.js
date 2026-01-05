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

const generateShapes = (shapes) => {
  let bitwiseShapes = [];
  for (const shape of shapes) {
    bitwiseShapes.push(BitwiseShape.fromData(shape, '#'));
  }
  return bitwiseShapes;
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

const generateShapeArrays = (shapes, giftsToPlace) => {
  let shapesArray = [];

  for (let i = 0; i < shapes.length; i++) {
    if (giftsToPlace[i] == 0) continue;
    const permutations = generateShapePermutations(shapes[i]);
    for (let j = giftsToPlace[i]; j > 0; j--) {
      shapesArray.push(permutations);
    }
  }
  return shapesArray;
};

const generateShapesToPlaceMap = (shapes, giftsToPlace) => {
  const shapesMap = new Map();

  for (let i = 0; i < shapes.length; i++) {
    if (giftsToPlace[i] == 0) continue;
    const permutations = generateShapePermutations(shapes[i]);
    const shapeKey = shapes[i].toString().replaceAll('\n', '_');
    shapesMap.set(shapeKey, {
      permutations,
      num: giftsToPlace[i],
    });
  }
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

/**
 *
 * @param {*} region BitwiseField instance
 * @param {*} giftsToPlace array of numbers
 * @param {*} shapes array of BitwiseShape instances
 */
const placeGifts = (region, shapes) => {
  const shapesToPlaceMap = generateShapesToPlaceMap(shapes, region.gifts);
  const placedShapesMap = new Map();

  for (const value of shapesToPlaceMap.values()) {
    for (const permutation of value.permutations) {
      const shapeKey = permutation.toString().replaceAll('\n', '_');
      placedShapesMap.set(shapeKey, 0);
    }
  }

  let initialState = new BitwiseField(region.width, region.height);

  const cache = new Map();

  const regionArea = region.width * region.height;

  const placeGift = (state, giftsToPlace, placedGifts) => {
    const key =
      'placed:' +
      [...placedGifts.entries()]
        .filter((gift) => gift[1] > 0)
        .map((gift) => gift[0])
        .join(';') +
      ';toPlace:' +
      [...giftsToPlace.entries()]
        .map((gift) => [gift[0], gift[1].num])
        .filter((gift) => gift[1] > 0)
        .join(';') +
      ';state:' +
      state.rows.join('_');

    if (cache.has(key)) {
      return cache.get(key);
    }

    // if no more gifts to place, return true
    if (giftsToPlace.size === 0) {
      return true;
    }

    const availableArea = state.getAllUnSetBitCoordinates().length;
    const giftsToPlaceValues = [...giftsToPlace.values()];
    const giftsToPlaceArea = sum(
      giftsToPlaceValues.map((gift) => {
        const { num, permutations } = gift;
        const set = permutations[0].getAllSetBitCoordinates();
        return num * set.length;
      })
    );

    // if area of remaining gifts to place larger than available area, return false
    if (availableArea < giftsToPlaceArea) {
      cache.set(key, false);
      return false;
    }

    // get the next gift to place
    const [giftKey] = giftsToPlace.keys();
    const gift = giftsToPlace.get(giftKey);
    const giftArea = gift.permutations[0].getAllSetBitCoordinates().length;

    // get all clusters of empty coordinates in the region where a gift can be placed
    const availableClusters = state
      .getAllClusters(0)
      .filter((cluster) => cluster.length >= giftArea);

    // if no empty clusters large enough, return false
    if (availableClusters.length === 0) {
      cache.set(key, false);
      return false;
    }

    let borderSpots = [];
    const regionArea = state.width * state.height;
    if (availableArea < regionArea) {
      borderSpots = state.getUnsetNeighbors(false);
    }

    const availableSpots = availableClusters.flat().filter((coord) => {
      const { x, y } = coord;
      // filter out coordinates that are too close to the edges to place a gift
      // all gifts are 3 x 3
      if (x + 3 <= state.width && y + 3 <= state.height) {
        // at least one piece has been placed
        if (availableArea < regionArea) {
          if (
            borderSpots.length > 0 &&
            borderSpots.filter((spot) => spot.x === x && spot.y === y).length >
              0
          ) {
            // spot borders existing shape
            return true;
          } else {
            // not bordering existing piece
            return false;
          }
        }
        return true;
      }
      return false;
    });

    let allShapesFit = false;

    const numGiftsPlaced = sum([...placedGifts.values()]);

    if (numGiftsPlaced === 0) {
      debugger;
    }

    // for each permutation of the gift
    for (const permutation of gift.permutations) {
      // don't continue to test permutations if already succeeded
      if (allShapesFit) {
        break;
      }

      const permutationKey = permutation.toString().replaceAll('\n', '_');

      // for each empty coordinate in the region
      for (const spot of availableSpots) {
        const { x, y } = spot;

        // don't continue to test available spots if already succeeded
        if (allShapesFit) {
          break;
        }

        if (permutationKey === '###_##._##.') {
          if (x === 4 && y === 0) {
            debugger;
          }
        }

        // try to place the gift
        const newState = state.tryPlace(permutation, x, y);

        // continue to next available spot if gift cannot be placed
        if (newState === null) continue;

        const newStateString = newState.toString();

        // dup the placedGifts and record permutation as placed
        const newPlacedGifts = new Map([...placedGifts.entries()]);
        newPlacedGifts.set(
          permutationKey,
          newPlacedGifts.get(permutationKey) + 1
        );

        // dup the giftsToPlace and record gift as placed
        const newGiftsToPlace = new Map([...giftsToPlace.entries()]);
        newGiftsToPlace.set(giftKey, {
          permutations: gift.permutations,
          num: gift.num - 1,
        });

        // Remove gift from map if no more to place
        if (newGiftsToPlace.get(giftKey).num === 0) {
          newGiftsToPlace.delete(giftKey);
        }

        // try placing the next gift
        allShapesFit = placeGift(newState, newGiftsToPlace, newPlacedGifts);
      }
    }
    cache.set(key, allShapesFit);
    if (allShapesFit) {
      debugger;
    }
    return allShapesFit;
  };

  return placeGift(initialState, shapesToPlaceMap, placedShapesMap);
};

// how many of the regions can fit all of the presents listed?
const partOne = async (input) => {
  const shapes = generateShapes(input.shapes);
  let num = 0;

  for (const region of input.regions) {
    const fitsGifts = placeGifts(region, shapes);
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

solve();

module.exports = {
  solve,
  formatData,
  generateShapes,
  placeGifts,
  generateShapePermutations,
  generateShapeArrays,
  generateShapesToPlaceMap,
  generateShapesMap,
  getAreaShapesToPlace,
  partOne,
  partTwo,
};
