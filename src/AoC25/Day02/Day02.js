const { getData } = require('../../Utils/globalFunctions.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2025/day/02

// DAY=02 npm run 2025
exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const formatted = data.split(',').map((range) => {
    return range.trim().split('-');
  });
  return formatted;
};

const isEven = (num) => {
  return num % 2 == 0;
};

const isOdd = (num) => {
  return num % 2 == 1;
};

const splitId = (id) => {
  if (isEven(id.length)) {
    const firstHalf = id.slice(0, id.length / 2);
    const secondHalf = id.slice(id.length / 2, id.length);
    return [parseInt(firstHalf), parseInt(secondHalf)];
  }
};

const roundUpToEven = (num) => {
  return '1' + '0'.repeat(num.length);
};

const roundDownToEven = (num) => {
  return '9'.repeat(num.length - 1);
};

// Part One

exports.filterRanges = (ranges) => {
  return ranges
    .map((range) => {
      const startId = range[0];
      const startIdNumDigits = startId.length;

      const endId = range[1];
      const endIdNumDigits = endId.length;

      // if both the start id and the end id have an odd number of digits
      // and they are both the same number of digits
      // it is impossible for the range to contain invalid IDs

      if (
        isOdd(startIdNumDigits) &&
        isOdd(endIdNumDigits) &&
        startIdNumDigits === endIdNumDigits
      ) {
        return;
      }

      // verified separately that (endId.length - startId.length) === 0 or 1
      // filter out ids with an odd number of digits from start & end of ranges
      let newStartId = isEven(startIdNumDigits)
        ? startId
        : roundUpToEven(startId);

      let newEndId = isEven(endIdNumDigits) ? endId : roundDownToEven(endId);

      const splitStartId = splitId(newStartId);
      const splitEndId = splitId(newEndId);

      if (splitStartId[0] === splitEndId[0]) {
        if (splitStartId[0] < splitStartId[1]) {
          return;
        }
        if (splitEndId[0] > splitEndId[1]) {
          return;
        }
      }

      return [newStartId, newEndId];
    })
    .filter(Boolean);
};

exports.findDuplicatesInRange = (range) => {
  const startId = range[0];
  const splitStartId = splitId(startId);

  const endId = range[1];
  const splitEndId = splitId(endId);

  // start of range => first possible invalid id
  // 9575 => 9595: id[0] >= id[1] ? id[0]
  // 9598 => 9696: id[0] < id[1] ? id[0] + 1
  const startIdFirstHalf =
    splitStartId[0] >= splitStartId[1] ? splitStartId[0] : splitStartId[0] + 1;

  // end of range => last possible invalid id
  // 9896 => 9696: id[0] >= id[1] ? id[0] - 1
  // 9899 => 9898: id[0] < id[1] ? id[0]
  const endIdFirstHalf =
    splitEndId[0] <= splitEndId[1] ? splitEndId[0] : splitEndId[0] - 1;

  // generate range from new start to new end
  // then all your bad IDs are those new numbers repeated
  function* generateRange(start, end) {
    yield start;
    if (start === end) return;
    yield* generateRange(start + 1, end);
  }

  const invalidIdFirstHalves = [
    ...generateRange(parseInt(startIdFirstHalf), parseInt(endIdFirstHalf)),
  ];
  return invalidIdFirstHalves.map((num) => `${num}${num}`);
};

exports.partOne = async (input) => {
  const filteredRanges = exports.filterRanges(input);

  const invalidIds = filteredRanges
    .map((range) => exports.findDuplicatesInRange(range))
    .flat();

  return sum(invalidIds);
};

// Part Two
exports.partTwo = async (input) => {
  return undefined;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC25/puzzleInputs/Day02Input.txt'
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
