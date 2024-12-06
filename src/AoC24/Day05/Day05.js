const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts, unique } = require('../../Utils/parse.js');
const _ = require('lodash');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/05

// DAY=5 npm run 2024
exports.formatData = async (filepath) => {
  let data = await getData(filepath);
  data = data.split('\n\n');
  const ordering_rules = data[0]
    .split('\n')
    .map((e) => parseStringOfInts(e, '|'));
  const updates = data[1].split('\n').map((e) => parseStringOfInts(e, ','));
  return {
    ordering_rules,
    updates,
  };
};

// Part One

exports.sortingMap = (ordering_rules_arr) => {
  const unique_vals = unique(ordering_rules_arr.flat());
  let rulesMap = new Map();

  unique_vals.forEach((val) => {
    const filtered_rules = ordering_rules_arr.filter((el) => el[0] === val);
    rulesMap.set(
      val,
      filtered_rules.map((el) => el[1])
    );
  });
  return rulesMap;
};

exports.sortUpdate = (update, rulesMap) => {
  const sortedUpdate = [...update].sort((a, b) => {
    const pagesAfterA = rulesMap.get(a);
    const pagesAfterB = rulesMap.get(b);

    if (pagesAfterA.includes(b)) {
      return -1;
    } else if (pagesAfterB.includes(a)) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedUpdate;
};

exports.getCorrectlyOrderedUpdates = (updates, rulesMap) => {
  let correctlyOrderedUpdates = [];

  updates.forEach((update) => {
    const sortedUpdate = exports.sortUpdate(update, rulesMap);
    if (_.isEqual(sortedUpdate, update)) {
      correctlyOrderedUpdates.push(update);
    }
  });

  return correctlyOrderedUpdates;
};

exports.reorderIncorrectlyOrderedUpdates = (updates, rulesMap) => {
  let reorderedUpdates = [];

  updates.forEach((update) => {
    const sortedUpdate = exports.sortUpdate(update, rulesMap);
    if (!_.isEqual(sortedUpdate, update)) {
      reorderedUpdates.push(sortedUpdate);
    }
  });

  return reorderedUpdates;
};

exports.getMiddleValue = (array) => {
  const i = Math.floor(array.length / 2);
  return array[i];
};

exports.getSumMiddleValues = (updates) => {
  const middlePages = updates.map((update) => exports.getMiddleValue(update));

  return sum(middlePages);
};

exports.partOne = async (input) => {
  const { ordering_rules, updates } = input;
  const rulesMap = exports.sortingMap(ordering_rules);
  const correctlyOrderedUpdates = exports.getCorrectlyOrderedUpdates(
    updates,
    rulesMap
  );
  return exports.getSumMiddleValues(correctlyOrderedUpdates);
};

// Part Two
exports.partTwo = async (input) => {
  const { ordering_rules, updates } = input;
  const rulesMap = exports.sortingMap(ordering_rules);
  const reorderedUpdates = exports.reorderIncorrectlyOrderedUpdates(
    updates,
    rulesMap
  );
  return exports.getSumMiddleValues(reorderedUpdates);
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day05Input.txt'
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
