const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

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
// Part One

async function getWorryWhileInspect(item, operation) {
  const oldLevel = item;
  let operand2 =
    operation[1] === 'old' ? Number(oldLevel) : Number(operation[1]);

  if (operation[0] === '+') {
    return oldLevel + operand2;
  } else {
    // operator is '*'
    return oldLevel * operand2;
  }
}

async function getWorryNoDamage(item) {
  return Math.floor(item / 3);
}

async function getTestResult(item, monkeyStats) {
  if (Number.isInteger(item / monkeyStats.test)) {
    return monkeyStats.isTrue;
  } else {
    return monkeyStats.isFalse;
  }
}

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
        const worryNoDamage = await getWorryNoDamage(worryWhileInspect);
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
async function partTwo(input) {
  return input;
}

async function runDay11() {
  const dataPath = path.join(__dirname, 'Day11Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData, 20),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getWorryWhileInspect,
  getWorryNoDamage,
  getTestResult,
  partOne,
  partTwo,
  runDay11,
};
