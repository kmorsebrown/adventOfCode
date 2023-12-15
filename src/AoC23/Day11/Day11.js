const { getData } = require('../../Utils/globalFunctions.js');
const { sum, sortAscending } = require('../../Utils/maths.js');
const _ = require('lodash');

// https://adventofcode.com/2023/day/11
exports.formatData = async (filepath) => {
  let data = await getData(filepath);
  return data.split('\n');
};

// Part One

exports.getGalaxyCoords = (data) => {
  let galaxies = new Map();

  let currentGalaxyId = 1;

  data.forEach((row, yIdx) => {
    Array.from(row).forEach((char, xIdx) => {
      if (char === '#') {
        galaxies.set(currentGalaxyId, { y: yIdx, x: xIdx });
        currentGalaxyId++;
      }
    });
  });
  return galaxies;
};

exports.expandUniverse = (data, increase) => {
  const universeWidth = data[0].length;
  const universeLength = data.length;

  const galaxies = exports.getGalaxyCoords(data);

  const rowsWithGalaxies = Array.from(galaxies.values()).map((obj) => obj.y);
  const colsWithGalaxies = Array.from(galaxies.values()).map((obj) => obj.x);

  const emptyRows = sortAscending(
    _.difference(_.range(universeLength), rowsWithGalaxies)
  );
  const emptyCols = sortAscending(
    _.difference(_.range(universeWidth), colsWithGalaxies)
  );

  function expand(array, prop) {
    for (let i = array.length - 1; i >= 0; i--) {
      let filteredGalaxies = new Map(
        [...galaxies].filter(([k, v]) => v[prop] > array[i])
      );

      filteredGalaxies.forEach((value, key) => {
        let newValue = value;
        newValue[prop] = value[prop] + increase;
        galaxies.set(key, newValue);
      });
    }
  }

  expand(emptyRows, 'y');
  expand(emptyCols, 'x');

  return galaxies;
};

exports.getDistance = (map, keyA, keyB) => {
  const galaxyA = map.get(keyA);
  const galaxyB = map.get(keyB);

  const horizDist = Math.abs(galaxyA.x - galaxyB.x);
  const vertDist = Math.abs(galaxyA.y - galaxyB.y);

  return horizDist + vertDist;
};
exports.partOne = async (input) => {
  let galaxy = exports.expandUniverse(input, 1);

  let galaxyKeys = Array.from([...galaxy.keys()]);

  let distances = [];

  while (galaxyKeys.length > 1) {
    let keyA = galaxyKeys.shift();
    for (const key of galaxyKeys) {
      distances.push(exports.getDistance(galaxy, keyA, key));
    }
  }

  return sum(distances);
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day11Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      //await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
