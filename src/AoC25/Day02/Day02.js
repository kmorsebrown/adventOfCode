import { getData, Queue } from '../../Utils/globalFunctions.js';
import { sum, sortAscending } from '../../Utils/maths.js';

// https://adventofcode.com/2025/day/02

// DAY=02 npm run 2025
export async function formatData(filepath) {
  const data = await getData(filepath);
  const formatted = data.split(',').map((range) => {
    return range.trim().split('-');
  });
  return formatted;
}

function* generateRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

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
export function getSubstring(id, n) {
  if (id.length % n != 0) {
    console.error(`Invalid Input: ${id.length} is not divisible by ${n}`);
    return;
  }

  let parts = Math.floor(id.length / n);

  return id.substring(0, parts);
}

const roundUpToEven = (num) => {
  return '1' + '0'.repeat(num.length);
};

const roundDownToEven = (num) => {
  return '9'.repeat(num.length - 1);
};

// https://www.geeksforgeeks.org/dsa/find-all-factors-of-a-natural-number/
export function findDivisors(id) {
  let divisors = [];
  let n = id.length;

  // Note that this loop runs till square root
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      // If divisors are equal, print only one
      if (n / i === i) {
        divisors.push(i);
      }
      // Otherwise print both (except for 1)
      else {
        if (i !== 1) {
          divisors.push(i);
        }
        divisors.push(n / i);
      }
    }
  }
  return sortAscending(divisors);
}

// Part One
export function filterRangesPartOne(ranges) {
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
}

export function findDuplicatesInRangePartOne(range) {
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

  const invalidIdFirstHalves = [
    ...generateRange(parseInt(startIdFirstHalf), parseInt(endIdFirstHalf)),
  ];
  return invalidIdFirstHalves.map((num) => `${num}${num}`);
}

export async function partOne(input) {
  const filteredRanges = filterRangesPartOne(input);

  const invalidIds = filteredRanges
    .map((range) => findDuplicatesInRangePartOne(range))
    .flat();

  return sum(invalidIds);
}

// Part Two

export function filterRangesPartTwo(ranges) {
  let newRanges = [];

  ranges.forEach((range) => {
    const startId = range[0];
    const startIdNumDigits = startId.length;

    const endId = range[1];
    const endIdNumDigits = endId.length;

    if (startIdNumDigits === endIdNumDigits) {
      // single digit IDs cannot be invalid
      if (startIdNumDigits !== 1) {
        newRanges.push(range);
      }
    } else if (isOdd(startIdNumDigits)) {
      // do not push ids that are only 1 digit
      if (startIdNumDigits !== 1) {
        newRanges.push([startId, String(parseInt(roundUpToEven(startId)) - 1)]);
      }
      newRanges.push([roundUpToEven(startId), endId]);
    } else if (isOdd(endIdNumDigits)) {
      newRanges.push([startId, roundDownToEven(endId)]);
      newRanges.push([String(parseInt(roundDownToEven(endId)) + 1), endId]);
    }
  });

  return newRanges;
}
export function findInvalidIds(range) {
  const startId = range[0];
  const endId = range[1];

  const idList = [...generateRange(parseInt(startId), parseInt(endId))];

  const divisors = findDivisors(startId);

  let invalidIds = new Set();

  divisors.forEach((divisor) => {
    const substrings = [
      ...new Set(idList.map((id) => getSubstring(String(id), divisor))),
    ];
    for (const str of substrings) {
      const possibleInvalidId = str.repeat(divisor);

      if (parseInt(possibleInvalidId) < parseInt(startId)) {
        continue;
      }

      if (parseInt(possibleInvalidId) > parseInt(endId)) {
        continue;
      }

      invalidIds.add(possibleInvalidId);
    }
  });
  return [...invalidIds];
}

export async function partTwo(input) {
  const filteredRanges = filterRangesPartTwo(input);

  const invalidIds = filteredRanges
    .map((range) => findInvalidIds(range))
    .flat();

  return sum(invalidIds);
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day02Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log('\n' + 'Day 02');
    console.log(results);
    return results;
  } catch (err) {
    console.error(err);
  }
}

// Only run solve() when this file is executed directly
if (import.meta.url.endsWith(process.argv[1])) {
  solve();
}
