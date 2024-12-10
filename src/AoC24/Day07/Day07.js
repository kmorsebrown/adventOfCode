const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/07

// DAY=7 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n').filter(String);
  const formattedData = splitData.map((line) => {
    const splitLine = line.split(': ');
    const objectifiedLine = {
      testValue: Number(splitLine[0]),
      operands: parseStringOfInts(splitLine[1], ' '),
    };
    return objectifiedLine;
  });
  return formattedData;
};

// Part One

// Operators are always evaluated left-to-right, not according to precedence rules
// numbers in the equations cannot be rearranged
// Operators: * and +
// Find: sum of the test values from just the equations that could possibly be true

exports.combinations = (ops, results, i, r) => {
  if (i === r) {
    return results;
  } else {
    const newResults = [];
    if (i === 0) {
      ops.forEach((op) => {
        newResults.push([op]);
      });
    } else {
      results.forEach((res) => {
        ops.forEach((op) => {
          let arr = [...res];
          newResults.push([...res, op]);
        });
      });
    }
    return exports.combinations(ops, newResults, i + 1, r);
  }
};

exports.isEquationTrue = (expected, equationArr, optsArr) => {
  let result = 0;
  for (let i = 0; i < optsArr.length; i++) {
    if (i === 0) {
      result =
        optsArr[i] === '||'
          ? eval(`${equationArr[i]}${equationArr[i + 1]}`)
          : eval(`${equationArr[i]}${optsArr[i]}${equationArr[i + 1]}`);
    } else {
      result =
        optsArr[i] === '||'
          ? eval(`${result}${equationArr[i + 1]}`)
          : eval(`${result}${optsArr[i]}${equationArr[i + 1]}`);
    }
  }
  return expected === result;
};

exports.canEquationBeTrue = (equationObj, operators) => {
  const { testValue, operands } = equationObj;
  const combinations = exports.combinations(
    operators,
    [],
    0,
    operands.length - 1
  );

  for (let i = 0; i < combinations.length; i++) {
    const passes = exports.isEquationTrue(testValue, operands, combinations[i]);
    if (passes) {
      return true;
    }
  }
  return false;
};

exports.partOne = async (input) => {
  let validTestValues = [];

  for (let i = 0; i < input.length; i++) {
    if (exports.canEquationBeTrue(input[i], ['+', '*'])) {
      validTestValues.push(input[i].testValue);
    }
  }

  return sum(validTestValues);
};

// Part Two
exports.partTwo = async (input) => {
  let validTestValues = [];

  for (let i = 0; i < input.length; i++) {
    if (exports.canEquationBeTrue(input[i], ['+', '*', '||'])) {
      validTestValues.push(input[i].testValue);
    }
  }

  return sum(validTestValues);
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day07Input.txt'
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
