const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2023/day/8
exports.getDirections = async (filepath) => {
  const data = await getData(filepath);
  return data.split('\n\n').shift();
};
1;
exports.formatData = async (filepath) => {
  let data = await getData(filepath);
  data = data.split('\n\n').pop();
  data = data.replace(/[()]+/g, '').split('\n');

  let formattedData = {};
  data.forEach((e) => {
    let [key, value] = e.split('=');
    let [L, R] = value.split(',');
    formattedData[key.trim()] = { L: L.trim(), R: R.trim() };
  });
  return formattedData;
};

// Part One

exports.partOne = async (instrux, nodes) => {
  let currentNode = 'AAA';
  let steps = 0;
  let i = 0;

  while (currentNode != 'ZZZ') {
    // if you run out of left/right instructions, repeat whole sequence as necessary
    if (i === instrux.length) {
      i = 0;
    }

    currentNode = nodes[currentNode][instrux[i]];
    i++;
    steps++;
  }

  return steps;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day08Input.txt'
  );

  try {
    const directions = await exports.getDirections(dataPath);
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(directions, formattedData),
      //await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
