const { getData, Queue } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { sum, combinationRepetitionGenerator } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/10

// DAY=10 npm run 2025
const formatData = async (filepath) => {
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
};

const maskLightDiagram = (diagram) => {
  return diagram.reduce((mask, char, i) => {
    return char === '#' ? mask | (1 << i) : mask;
  }, 0);
};

const maskButtonSchematic = (button) => {
  // start with 0000
  let mask = 0;
  for (const lightIndex of button) {
    // set the bit at lightIndex to 1
    mask |= 1 << lightIndex;
  }
  return mask;
};

// Part One

const fewestButtonPressesForLights = (lightDiagram, buttonSchematics) => {
  const buttonMasks = buttonSchematics.map((button) =>
    maskButtonSchematic(button)
  );
  const targetMask = maskLightDiagram(lightDiagram);

  // {lightState: numPresses}
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
};

const partOne = async (input) => {
  const buttonPresses = input.map((machine) =>
    fewestButtonPressesForLights(machine.lightDiagram, machine.buttonSchematics)
  );

  return sum(buttonPresses);
};

// Part Two

const buttonMap = (buttonSchematics, joltageRequirement) => {
  const numCounters = joltageRequirement.length;
  const buttonsPerCounter = new Map();

  for (let i = 0; i < numCounters; i++) {
    buttonsPerCounter.set(
      i,
      buttonSchematics.filter((button) => button.includes(i))
    );
  }
  return buttonsPerCounter;
};

const sortJoltageByIndex = (joltageRequirement) => {
  return joltageRequirement
    .map((_value, index) => index)
    .sort((a, b) => joltageRequirement[a] - joltageRequirement[b]);
};

const joltageTargetMet = (targetJoltage, state) => {
  return JSON.stringify(targetJoltage) === JSON.stringify(state);
};

const joltageTargetExceeded = (targetJoltage, state) => {
  let overTarget = false;

  for (let i = 0; i < targetJoltage.length; i++) {
    if (state[i] > targetJoltage[i]) {
      overTarget = true;
      break;
    }
  }
  return overTarget;
};

const processCombos = (
  currentState,
  currentNumPresses,
  numToPress,
  buttons
) => {
  let result = [];

  // get combos
  for (const combo of combinationRepetitionGenerator(buttons, numToPress)) {
    let newState = [...currentState];

    // get how many of each button in combo
    const buttonCountMap = combo.reduce((acc, curr) => {
      acc.set(curr, (acc.get(curr) || 0) + 1);
      return acc;
    }, new Map());

    // press button
    for (const [button, count] of buttonCountMap) {
      for (const i of button) {
        newState[i] = newState[i] + count;
      }
    }

    result.push({
      state: newState,
      numButtonPresses: currentNumPresses + numToPress,
    });
  }
  return result;
};

const fewestButtonPressesForJoltage = (targetJoltage, buttonSchematics) => {
  const targetJoltageIndexAsc = sortJoltageByIndex(targetJoltage);
  const buttonsByJoltIdx = buttonMap(buttonSchematics, targetJoltage);

  let queue = new Queue();

  queue.enqueue({
    currentState: Array(targetJoltage.length).fill(0),
    numButtonPresses: 0,
    nextIndex: 0,
  });

  let lowestNumButtonsToPress = sum(targetJoltage);

  while (!queue.isEmpty()) {
    const { currentState, numButtonPresses, nextIndex } = queue.front();
    const currentIndex = nextIndex;

    queue.dequeue();

    const targetJoltageIndex = targetJoltageIndexAsc[currentIndex];

    const buttonsAtIdx = buttonsByJoltIdx.get(targetJoltageIndex);

    if (!buttonsAtIdx) continue;

    // filter out buttons for indexes you've already reached max of
    const availableButtons = buttonsByJoltIdx
      .get(targetJoltageIndex)
      .filter((button) => button.every((num) => num >= targetJoltageIndex));

    // diff b/t target & current state at target index
    const numToPress =
      targetJoltage[targetJoltageIndex] - currentState[targetJoltageIndex];

    if (numToPress <= 0) {
      // If this index is already satisfied, move to next
      if (currentIndex + 1 < targetJoltageIndexAsc.length) {
        queue.enqueue({
          currentState,
          numButtonPresses,
          nexIndex: currentIndex + 1,
        });
      } else if (joltageTargetMet(targetJoltage, currentState)) {
        if (lowestNumButtonsToPress > numButtonPresses) {
          lowestNumButtonsToPress = numButtonPresses;
        }
      }
      continue;
    }

    for (const combo of processCombos(
      currentState,
      numButtonPresses,
      numToPress,
      availableButtons
    )) {
      if (joltageTargetMet(targetJoltage, combo.state)) {
        if (lowestNumButtonsToPress > combo.numButtonPresses) {
          lowestNumButtonsToPress = combo.numButtonPresses;
        }
      } else if (
        !joltageTargetExceeded(targetJoltage, combo.state) &&
        currentIndex + 1 < targetJoltageIndexAsc.length
      ) {
        queue.enqueue({
          currentState: combo.state,
          numButtonPresses: combo.numButtonPresses,
          nextIndex: currentIndex + 1,
        });
      }
    }
  }
};

const partTwo = async (input) => {
  return input;
};

const solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day10Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      // await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 10');
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

solve();

module.exports = {
  solve,
  formatData,
  fewestButtonPressesForLights,
  maskLightDiagram,
  maskButtonSchematic,
  partOne,
  buttonMap,
  sortJoltageByIndex,
  processCombos,
  fewestButtonPressesForJoltage,
  partTwo,
};
