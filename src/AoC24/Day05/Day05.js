import { getData } from '../../Utils/globalFunctions.js';
import { parseStringOfInts, unique } from '../../Utils/parse.js';
import _ from 'lodash';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2024/day/05

// DAY=5 npm run 2024
export async function formatData(filepath) {
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
}

// Part One

export function sortingMap(ordering_rules_arr) {
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
}

export function sortUpdate(update, rulesMap) {
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
}

export function getCorrectlyOrderedUpdates(updates, rulesMap) {
  let correctlyOrderedUpdates = [];

  updates.forEach((update) => {
    const sortedUpdate = sortUpdate(update, rulesMap);
    if (_.isEqual(sortedUpdate, update)) {
      correctlyOrderedUpdates.push(update);
    }
  });

  return correctlyOrderedUpdates;
}

export function reorderIncorrectlyOrderedUpdates(updates, rulesMap) {
  let reorderedUpdates = [];

  updates.forEach((update) => {
    const sortedUpdate = sortUpdate(update, rulesMap);
    if (!_.isEqual(sortedUpdate, update)) {
      reorderedUpdates.push(sortedUpdate);
    }
  });

  return reorderedUpdates;
}

export function getMiddleValue(array) {
  const i = Math.floor(array.length / 2);
  return array[i];
}

export function getSumMiddleValues(updates) {
  const middlePages = updates.map((update) => getMiddleValue(update));

  return sum(middlePages);
}

export async function partOne(input) {
  const { ordering_rules, updates } = input;
  const rulesMap = sortingMap(ordering_rules);
  const correctlyOrderedUpdates = getCorrectlyOrderedUpdates(
    updates,
    rulesMap
  );
  return getSumMiddleValues(correctlyOrderedUpdates);
}

// Part Two
export async function partTwo(input) {
  const { ordering_rules, updates } = input;
  const rulesMap = sortingMap(ordering_rules);
  const reorderedUpdates = reorderIncorrectlyOrderedUpdates(
    updates,
    rulesMap
  );
  return getSumMiddleValues(reorderedUpdates);
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day05Input.txt', import.meta.url).pathname;

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
}

solve();
