import { getData, Queue } from '../../Utils/globalFunctions.js';
import { parseStringOfInts } from '../../Utils/parse.js';
import {
  sum,
  isEven,
  generateRange,
  combinationRepetitionGenerator,
} from '../../Utils/maths.js';

// https://adventofcode.com/2025/day/10

// DAY=10 npm run 2025
export async function formatData(filepath) {
  const data = await getData(filepath);
  const machines = data.split('\n');

  let formatted = [];

  for (const machine of machines) {
    const firstSplit = machine.indexOf(']');
    const secondSplit = machine.lastIndexOf(')') + 1;
    const lightDiagram = machine.slice(1, firstSplit).split('');
    const buttonSchematics = machine
      .slice(firstSplit + 2, secondSplit)
      .match(/(?<=\().*?(?=\))/g)
      .map((button) => parseStringOfInts(button, ','));
    const joltageRequirement = parseStringOfInts(
      machine.slice(secondSplit + 2, machine.length - 1),
      ','
    );

    formatted.push({ lightDiagram, buttonSchematics, joltageRequirement });
  }
  return formatted;
}

const maskLightDiagram = (diagram) => {
  return diagram.reduce((mask, char, i) => {
    return char === '#' ? mask | (1 << i) : mask;
  }, 0);
}

const maskButtonSchematic = (button) => {
  // start with 0000
  let mask = 0;
  for (const lightIndex of button) {
    // set the bit at lightIndex to 1
    mask |= 1 << lightIndex;
  }
  // console.log(`${JSON.stringify(button)}: ${mask}`);
  return mask;
}

// Part One

const fewestButtonPressesForLights = (lightDiagram, buttonSchematics) => {
  const buttonMasks = buttonSchematics.map((button) =>
    maskButtonSchematic(button)
  );
  const targetMask = maskLightDiagram(lightDiagram);

  const visited = new Map();
  visited.set(0, 0);

  const queue = new Queue();
  queue.enqueue(0);

  while (!queue.isEmpty()) {
    const currentLightState = queue.front();
    const currentNumPresses = visited.get(currentLightState);

    // don't repeat button presses - they cancel each other out
    if (currentNumPresses >= buttonMasks.length) continue;

    for (const button of buttonMasks) {
      // toggle lights
      const nextLightState = currentLightState ^ button;
      const nextNumPresses = currentNumPresses + 1;

      if (nextLightState === targetMask) {
        return nextNumPresses;
      }

      if (!visited.has(nextLightState)) {
        visited.set(nextLightState, nextNumPresses);
        queue.enqueue(nextLightState);
      }
    }
    queue.dequeue();
  }
}

const partOne = async (input) => {
  const buttonPresses = input.map((machine) =>
    fewestButtonPressesForLights(machine.lightDiagram, machine.buttonSchematics)
  );

  return sum(buttonPresses);
}

// Part Two

// https://www.reddit.com/r/adventofcode/comments/1pk87hl/2025_day_10_part_2_bifurcate_your_way_to_victory/

const generatePatterns = (length) => {
  let arr = [Array(length).fill(0)];

  for (let i = 0; i < length; i++) {
    let newArr = [];
    for (const el of arr) {
      let newEl = [...el];
      newEl[i] = 1;
      newArr.push(newEl);
    }
    arr = arr.concat(newArr);
  }
  return arr;
}

const getPatternMap = (length, buttons) => {
  const patterns = generatePatterns(length);

  const combinations = getButtonComboPatterns(length, buttons);

  const patternMap = new Map();

  for (const pattern of patterns) {
    patternMap.set(pattern.join(','), []);
  }

  for (const [combo, cost] of combinations) {
    let comboArr = parseStringOfInts(combo, ',');
    const pattern = comboArr.map((el) => (isEven(el) ? 0 : 1)).join(',');
    let combosForPattern = patternMap
      .get(pattern)
      .concat([[combo, cost]])
      .sort(function (a, b) {
        return a[1] - b[1];
      });
    patternMap.set(pattern, combosForPattern);
  }
  return patternMap;
}

const getButtonComboPatterns = (length, buttons) => {
  let combinations = [];

  for (const numButtonsToPress of generateRange(0, buttons.length)) {
    const newCombinations = Array.from(
      combinationRepetitionGenerator(buttons, numButtonsToPress, false)
    );
    combinations = [...combinations, ...newCombinations];
  }

  let comboPatterns = new Map();
  for (const combo of combinations) {
    let newState = Array(length).fill(0);
    let newComboCost = combo.length;

    for (const button of combo) {
      for (const joltageIdx of button) {
        newState[joltageIdx] += 1;
      }
    }

    const stringifiedCombo = newState.join(',');

    if (comboPatterns.has(stringifiedCombo)) {
      let currentComboCost = comboPatterns.get(stringifiedCombo);
      comboPatterns.set(
        stringifiedCombo,
        Math.min(newComboCost, currentComboCost)
      );
    } else {
      comboPatterns.set(stringifiedCombo, newComboCost);
    }
  }
  return comboPatterns;
}

const getMatchingPatternCombos = (state, combinations) => {
  const pattern = state.map((el) => (isEven(el) ? 0 : 1)).join(',');
  let combos = [...combinations.get(pattern)];
  let filtered = new Map();
  for (const [key, value] of combos) {
    let comboArr = parseStringOfInts(key, ',');
    if (comboArr.every((el, i) => el <= state[i])) {
      filtered.set(key, value);
    }
  }
  return filtered;
}

const fewestButtonPressesForJoltage = (targetJoltage, buttonSchematics) => {
  const buttonComboPatterns = getPatternMap(
    targetJoltage.length,
    buttonSchematics
  );

  const cache = new Map();

  const getNumPresses = (state) => {
    const key = state.join(',');
    if (cache.has(key)) {
      return cache.get(key);
    }

    if (state.every((counter) => counter === 0)) {
      return 0;
    }

    let lowestNumPresses = sum(targetJoltage);

    // all returned combos' odd/even patterns
    // should match state's odd/even pattern
    const combos = getMatchingPatternCombos(state, buttonComboPatterns);

    for (const [combo, cost] of combos) {
      let newState = [...state];
      let comboArr = parseStringOfInts(combo, ',');
      // subtract combo value at the given index, then divide by 2
      // result of subtracting should always be even
      for (let i = 0; i < state.length; i++) {
        newState[i] = (newState[i] - comboArr[i]) / 2;
      }

      lowestNumPresses = Math.min(
        lowestNumPresses,
        cost + 2 * getNumPresses(newState)
      );
    }

    cache.set(key, lowestNumPresses);
    return lowestNumPresses;
  };

  return getNumPresses(targetJoltage);
}

const partTwo = async (input) => {
  return sum(
    input.map((machine) =>
      fewestButtonPressesForJoltage(
        machine.joltageRequirement,
        machine.buttonSchematics
      )
    )
  );
}

const solve = async () => {
  const dataPath = new URL('../../puzzleInputs/Day10Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 10');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();

module.exports = {
  solve,
  formatData,
  fewestButtonPressesForLights,
  maskLightDiagram,
  maskButtonSchematic,
  partOne,
  generatePatterns,
  getPatternMap,
  fewestButtonPressesForJoltage,
  getMatchingPatternCombos,
  getButtonComboPatterns,
  partTwo,
}
