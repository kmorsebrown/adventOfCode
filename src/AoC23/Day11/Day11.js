import { getData } from '../../Utils/globalFunctions.js';
import { sum, sortAscending } from '../../Utils/maths.js';
import _ from 'lodash';

// https://adventofcode.com/2023/day/11
export async function formatData(filepath) {
  let data = await getData(filepath);
  return data.split('\n');
};

export function getGalaxyCoords(data) {
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

export function expandUniverse(data, increase) {
  const universeWidth = data[0].length;
  const universeLength = data.length;

  const galaxies = getGalaxyCoords(data);

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

export function getDistance(map, keyA, keyB) {
  const galaxyA = map.get(keyA);
  const galaxyB = map.get(keyB);

  const horizDist = Math.abs(galaxyA.x - galaxyB.x);
  const vertDist = Math.abs(galaxyA.y - galaxyB.y);

  return horizDist + vertDist;
};

/* 
  The only changes I needed to make for Part 2 were to my "partOne" function,
  which I'm preserving in comments because I'm very proud of myself for 
  correctly guessing the Part 2 twist
*/
export async function getSumOfDistancesBetweenAllGalaxies(input, expansion) {
  // part 1 version of function did not have the "expansion" arg

  // remove the row/col that already exists from the amount the indexes will be increased
  const increase = expansion - 1;
  // above line new for part 2

  let galaxy = expandUniverse(input, increase);
  // part 1 version of expandUniverse() callback had args set as (input, 1)

  let galaxyKeys = Array.from([...galaxy.keys()]);

  let distances = [];

  while (galaxyKeys.length > 1) {
    let keyA = galaxyKeys.shift();
    for (const key of galaxyKeys) {
      distances.push(getDistance(galaxy, keyA, key));
    }
  }

  return sum(distances);
};

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day11Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await getSumOfDistancesBetweenAllGalaxies(formattedData, 2),
      await getSumOfDistancesBetweenAllGalaxies(formattedData, 1000000),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

solve();
