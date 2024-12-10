const { getData } = require('../../Utils/globalFunctions.js');
const { unique } = require('../../Utils/parse.js');

// https://adventofcode.com/2024/day/08

// DAY=8 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n').map((e) => e.split(''));
  return splitData;
};

// Part One
exports.generateAntennaMap = (input) => {
  const height = input.length;
  const width = input[0].length;
  const frequencies = unique(input.flat()).filter((e) => e != '.');
  const antenna = new Map();

  frequencies.forEach((e) => antenna.set(e, []));

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (antenna.has(input[row][col])) {
        const coords = antenna.get(input[row][col]);
        coords.push({ r: row, c: col });
      }
    }
  }

  return antenna;
};

exports.getDiffs = (value, diffsMap) => {
  for (let i = 0; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      const diffsKey = [value[i], value[j]];
      const diffObj = {
        r_diff: value[i].r - value[j].r,
        c_diff: value[i].c - value[j].c,
      };
      diffsMap.set(diffsKey, diffObj);
    }
  }
};

exports.generateDiffsMap = (antennaMap) => {
  const diffsMap = new Map();

  [...antennaMap.values()].forEach((value) =>
    exports.getDiffs(value, diffsMap)
  );

  return diffsMap;
};

exports.plotAntinodes = (antennas, diff, height, width, antinodesSet) => {
  const { r_diff, c_diff } = diff;
  const A = antennas[0];
  const B = antennas[1];

  const antiNodeA = { r: A.r + r_diff, c: A.c + c_diff };
  const antiNodeB = { r: B.r - r_diff, c: B.c - c_diff };

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < height && col < width;
  }

  if (inBounds(antiNodeA.r, antiNodeA.c)) {
    antinodesSet.add(JSON.stringify(antiNodeA));
  }

  if (inBounds(antiNodeB.r, antiNodeB.c)) {
    antinodesSet.add(JSON.stringify(antiNodeB));
  }
};

exports.partOne = async (input) => {
  const antinodes = new Set();
  const antennaMap = exports.generateAntennaMap(input);
  const diffsMap = exports.generateDiffsMap(antennaMap);

  diffsMap.forEach((value, key) => {
    exports.plotAntinodes(key, value, input.length, input[0].length, antinodes);
  });

  return antinodes.size;
};

// Part Two
exports.plotAntinodesPt2 = (antennas, diff, height, width, antinodesSet) => {
  const { r_diff, c_diff } = diff;
  const A = antennas[0];
  const B = antennas[1];

  const A_antinodes = [];
  const B_antinodes = [];

  let Ar = A.r;
  let Ac = A.c;

  do {
    A_antinodes.push({ r: Ar, c: Ac });
    Ar += r_diff;
    Ac += c_diff;
  } while (inBounds(Ar, Ac));

  let Br = B.r;
  let Bc = B.c;

  do {
    B_antinodes.push({ r: Br, c: Bc });
    Br -= r_diff;
    Bc -= c_diff;
  } while (inBounds(Br, Bc));

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < height && col < width;
  }

  A_antinodes.forEach((antiNode) => antinodesSet.add(JSON.stringify(antiNode)));
  B_antinodes.forEach((antiNode) => antinodesSet.add(JSON.stringify(antiNode)));
};
exports.partTwo = async (input) => {
  const antinodes = new Set();
  const antennaMap = exports.generateAntennaMap(input);
  const diffsMap = exports.generateDiffsMap(antennaMap);

  diffsMap.forEach((value, key) => {
    exports.plotAntinodesPt2(
      key,
      value,
      input.length,
      input[0].length,
      antinodes
    );
  });

  return antinodes.size;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day08Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
