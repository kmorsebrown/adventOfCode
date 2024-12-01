const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { sortAscending, sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/1
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  let dataArr = data.split('\n').filter(String);

  const left_list = [];
  const right_list = [];

  dataArr.forEach((str) => {
    let ints = parseStringOfInts(str, '   ');
    left_list.push(ints[0]);
    right_list.push(ints[1]);
  });

  return {
    left_list: left_list,
    right_list: right_list,
  };
};

// Part One

// locations listed by location ID
// historians split into two groups, each trying ot create their own complete list of location IDs
// holding up the two lists side by side (puzzle input) they aren't similar
// reconcile the lists

exports.partOne = async (input) => {
  const { left_list, right_list } = input;

  // pair up the smallest number in the left list with the smallest number in the right list
  // then the second-smallest on let w/ second-smallest on right, and so on
  const left_sorted = sortAscending(left_list);
  const right_sorted = sortAscending(right_list);

  // within each pair, figure out how far apart the two numbers are
  const diffs = left_sorted.map((id, i) => {
    return Math.abs(id - right_sorted[i]);
  });

  // find the total distance between the two lists
  return sum(diffs);
};

// Part Two
exports.partTwo = async (input) => {
  const { left_list, right_list } = input;

  // multiply each number on the left list by the number of times it appears on the right list
  // add the results

  let similarity_score = 0;

  left_list.forEach((id) => {
    const occurrences = right_list.filter((r_id) => r_id === id).length;
    similarity_score += id * occurrences;
  });
  return similarity_score;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day01Input.txt'
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
