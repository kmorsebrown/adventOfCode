import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2022/day/11

// Unifinished WIP

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data
    .split('\n')
    .filter(String)
    .map((element) => element.trim());
  const monkeyMap = new Map();
  const monkeyArr = splitData
    .filter((element) => element.startsWith('Monkey'))
    .map(
      (element) =>
        'monkey' +
        element.slice(element.indexOf(' '), element.indexOf(':')).trim()
    );
  const startingItemsArr = splitData
    .filter((element) => element.startsWith('Starting'))
    .map((element) =>
      element.slice(element.indexOf(':') + 1, element.length).trim()
    );

  const operationArr = splitData
    .filter((element) => element.startsWith('Operation'))
    .map((element) =>
      element.slice(element.indexOf('d') + 1, element.length).trim()
    );

  const testArr = splitData
    .filter((element) => element.startsWith('Test'))
    .map((element) =>
      element.slice(element.indexOf('by') + 2, element.length).trim()
    );

  const trueArr = splitData
    .filter((element) => element.startsWith('If true'))
    .map((element) =>
      element.slice(element.indexOf('ey') + 2, element.length).trim()
    );

  const falseArr = splitData
    .filter((element) => element.startsWith('If false'))
    .map((element) =>
      element.slice(element.indexOf('ey') + 2, element.length).trim()
    );

  monkeyArr.forEach((monkey, index) => {
    let monkeyObj = {
      items: startingItemsArr[index].split(', ').map((num) => Number(num)),
      operation: operationArr[index].split(' '),
      test: Number(testArr[index]),
      isTrue: 'monkey' + trueArr[index],
      isFalse: 'monkey' + falseArr[index],
      totalItems: 0,
    };
    monkeyMap.set(monkey, monkeyObj);
  });
  return monkeyMap;
}

/**
 * Changes the worry level of the item as the moneky inspects it
 * @param {number} item current worry level for the item being inspected
 * @param {Array[string]} operation how your worry level changes as that monkey inspects an item. Index 0 is always the operator and index 1 is always the operand
 * @returns {number} new worry level for the item that was just inspected
 */
async function getWorryWhileInspect(item, operation) {
  /**@type {number} the operand value as a number*/
  let operand = operation[1] === 'old' ? Number(item) : Number(operation[1]);

  if (operation[0] === '+') {
    return item + operand;
  } else {
    // operator is '*'
    return item * operand;
  }
}

/**
 * Changes the worry level to reflect your relief there was no damage after monkey inspects an item but before it tests your worry level
 * @param {number} item current worry level for the item has been inspected
 * @param {string} operator the operator for managing your worry level
 * @param {number} operand the operand for managing yoru worry level
 * @returns {number} the new, managed, worry level for the item
 */
async function manageWorryLevels(item, operator, operand) {
  let newLevel;
  switch (operator) {
    case '+':
      newLevel = Math.floor(item + operand);
      break;
    case '-':
      newLevel = Math.floor(item - operand);
      break;
    case '*':
      newLevel = Math.floor(item - operand);
      break;
    case '/':
      newLevel = Math.floor(item / operand);
      break;
  }

  return newLevel;
}

/**
 *
 * @param {number} item the current worry level for the item being inspected
 * @param {Object} monkeyStats stats for the monkey currently inspecting the item
 * @returns {string} the monkey the item is thrown to
 */
async function getTestResult(item, monkeyStats) {
  if (Number.isInteger(item / monkeyStats.test)) {
    return monkeyStats.isTrue;
  } else {
    return monkeyStats.isFalse;
  }
}

// Part One

async function partOne(monkeys, numRounds) {
  for (let round = 1; round <= numRounds; round++) {
    for (const [monkey, stats] of monkeys) {
      let newStats = JSON.parse(JSON.stringify(stats));
      while (newStats.items.length > 0) {
        let item = newStats.items.shift();
        const worryWhileInspect = await getWorryWhileInspect(
          item,
          stats.operation
        );
        newStats.totalItems++;
        const worryNoDamage = await manageWorryLevels(
          worryWhileInspect,
          '/',
          3
        );
        const nextMonkey = await getTestResult(worryNoDamage, stats);
        const nextMonkeyStats = monkeys.get(nextMonkey);
        nextMonkeyStats.items.push(worryNoDamage);
        monkeys.set(nextMonkey, nextMonkeyStats);
      }
      monkeys.set(monkey, newStats);
    }
  }
  const totalItems = [...monkeys.values()].map((obj) => obj.totalItems);
  const mostActive = Math.max(...totalItems);
  totalItems.splice(totalItems.indexOf(mostActive), 1);
  const secondMostActive = Math.max(...totalItems);

  return mostActive * secondMostActive;
}

// Part Two

/**
 *
 * @param {Map} monkeys stats for each monkey
 * @param {number} numRounds number of rounds
 * @param {string} operator the operator to be passed into the manageWorryLevels function
 * @param {number} operand the operand to be passed into the manageWorryLevels function
 * @returns {Array} an array of the total items each monkey inspected
 */
async function getInspectedTotal(monkeys, numRounds, operator, operand) {
  for (let round = 1; round <= numRounds; round++) {
    for (const [monkey, stats] of monkeys) {
      let newStats = JSON.parse(JSON.stringify(stats));
      while (newStats.items.length > 0) {
        let item = newStats.items.shift();
        const worryWhileInspect = await getWorryWhileInspect(
          item,
          stats.operation
        );
        newStats.totalItems++;
        const worryNoDamage = await manageWorryLevels(
          worryWhileInspect,
          operator,
          operand
        );
        const nextMonkey = await getTestResult(worryNoDamage, stats);
        const nextMonkeyStats = monkeys.get(nextMonkey);
        nextMonkeyStats.items.push(worryNoDamage);
        monkeys.set(nextMonkey, nextMonkeyStats);
      }
      monkeys.set(monkey, newStats);
    }
  }
  const totalItems = [...monkeys.values()].map((obj) => obj.totalItems);
  // const mostActive = Math.max(...totalItems);
  // totalItems.splice(totalItems.indexOf(mostActive), 1);
  // const secondMostActive = Math.max(...totalItems);

  return totalItems;
}

/**
 * Finds the two most active monkeys and multiplies the number of items they each  inspected together
 * @param {Array} inspectedTotalArr output of getInspectedTotal
 * @returns {number} the level of monkey business
 */
async function partTwo(inspectedTotalArr) {
  const mostActive = Math.max(...inspectedTotalArr);
  inspectedTotalArr.splice(inspectedTotalArr.indexOf(mostActive), 1);
  const secondMostActive = Math.max(...inspectedTotalArr);

  return mostActive * secondMostActive;
}

async function solve() {
  const dataPath = new URL(
    '../puzzleInputs/Day11Input.txt',
    import.meta.url
  ).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData, 20),
      // await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export { formatData, getWorryWhileInspect, getTestResult, partOne, getInspectedTotal, partTwo, solve };
