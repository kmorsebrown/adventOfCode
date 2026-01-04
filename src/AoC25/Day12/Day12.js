const { getData, Queue } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { BitwiseShape, BitwiseField } = require('../../Utils/bitwise.js');
const { cartesianGenerator } = require('../../Utils/maths.js');

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

/**
 *
 * @param {*} region BitwiseField instance
 * @param {*} giftsToPlace array of numbers
 * @param {*} shapes array of BitwiseShape instances
 */
const placeGifts = async (region, shapes) => {
  const shapeArrays = generateShapeArrays(shapes, region.gifts);
  let initialState = new BitwiseField(region.width, region.height);

  let allShapesFit = false;

  const placeGift = (gifts, state) => {
    const newGifts = [...gifts];
    const gift = newGifts.pop();

    const availableSpots = state.getAllUnSetBitCoordinates();

    for (const spot of availableSpots) {
      const { x, y } = spot;
      const newState = state.tryPlace(gift, x, y);

      if (newState === null) continue;

      if (newGifts.length > 0) {
        return placeGift(newGifts, newState);
      } else {
        return true;
      }
    }
    return false;
  };

  for (const permutation of cartesianGenerator(...shapeArrays)) {
    if (allShapesFit) {
      break;
    }

    allShapesFit = placeGift(permutation, initialState);
  }

  return allShapesFit;
};

// how many of the regions can fit all of the presents listed?
const partOne = async (input) => {
  return input;
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
    const shapes = generateShapes(formattedData.shapes);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 12');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

// solve();

module.exports = {
  solve,
  formatData,
  generateShapes,
  placeGifts,
  generateShapePermutations,
  generateShapeArrays,
  partOne,
  partTwo,
};
