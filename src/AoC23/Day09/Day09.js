const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2023/day/9
exports.formatData = async (filepath) => {
  let data = await getData(filepath);
  data = data.split('\n');
  data = data.map((row) => parseStringOfInts(row, ' '));
  return data;
};

// For each sequence create a new sequence from the difference between each number in the sequence
// until all numbers are 0
exports.getLastStepHistory = (sequence) => {
  let output = [sequence[sequence.length - 1]];

  const getNextHistory = (seq) => {
    let newSeq = [];
    for (let i = 1; i < seq.length; i++) {
      newSeq.push(seq[i] - seq[i - 1]);
    }
    output.push(newSeq[newSeq.length - 1]);

    if (newSeq[newSeq.length - 1] === 0) {
      return;
    } else {
      getNextHistory(newSeq);
    }
  };
  getNextHistory(sequence);
  return output;
};

// Part One
exports.getNextNumberInSequence = (history) => {
  let revHist = history.reverse();
  let nextNum = 0;
  while (revHist.length > 0) {
    nextNum = nextNum + revHist.shift();
  }
  return nextNum;
};

exports.partOne = async (input) => {
  let lastStepHist = input.map((seq) => exports.getLastStepHistory(seq));
  let nextNums = lastStepHist.map((his) =>
    exports.getNextNumberInSequence(his)
  );
  return sum(nextNums);
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day09Input.txt'
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
