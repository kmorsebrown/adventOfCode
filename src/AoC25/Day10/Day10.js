const { getData, Queue } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { sum } = require('../../Utils/maths.js');

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

const fewestButtonPresses = (lightDiagram, buttonSchematics) => {
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
    fewestButtonPresses(machine.lightDiagram, machine.buttonSchematics)
  );

  return sum(buttonPresses);
};

// Part Two
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
  fewestButtonPresses,
  maskLightDiagram,
  maskButtonSchematic,
  partOne,
  partTwo,
};
