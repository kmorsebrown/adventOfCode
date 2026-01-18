import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts } from '../../Utils/parse.js';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2023/day/9
export async function formatData(filepath) {
  let data = await getData(filepath);
  data = data.split('\n');
  data = data.map((row) => parseStringOfInts(row, ' '));
  return data;
};

// For each sequence create a new sequence from the difference between each number in the sequence
// until all numbers are 0
export function getLastStepHistory(sequence) {
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
export function getNextNumberInSequence(history) {
  let revHist = history.reverse();
  let nextNum = 0;
  while (revHist.length > 0) {
    nextNum = nextNum + revHist.shift();
  }
  return nextNum;
};

export async function partOne(input) {
  let lastStepHist = input.map((seq) => getLastStepHistory(seq));
  let nextNums = lastStepHist.map((his) =>
    getNextNumberInSequence(his)
  );
  return sum(nextNums);
};

// Part Two

export function getFirstStepHistory(sequence) {
  let output = [sequence[0]];

  const getPrevHistory = (seq) => {
    let newSeq = [];
    for (let i = 1; i < seq.length; i++) {
      newSeq.push(seq[i] - seq[i - 1]);
    }
    output.push(newSeq[0]);

    if (newSeq[newSeq.length - 1] === 0) {
      return;
    } else {
      getPrevHistory(newSeq);
    }
  };
  getPrevHistory(sequence);
  return output;
};
export function getPrevNumberInSequence(history) {
  let revHist = history.reverse();
  let prevNum = 0;
  while (revHist.length > 0) {
    prevNum = revHist.shift() - prevNum;
  }
  return prevNum;
};
export async function partTwo(input) {
  let firstStepHist = input.map((seq) => getFirstStepHistory(seq));
  let prevNums = firstStepHist.map((his) =>
    getPrevNumberInSequence(his)
  );
  return sum(prevNums);
};

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day09Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

solve();
