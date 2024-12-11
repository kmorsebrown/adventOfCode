const { getData } = require('../../Utils/globalFunctions.js');
const { sum } = require('../../Utils/maths.js');
const { Readable } = require('stream');

// https://adventofcode.com/2024/day/09

// DAY=9 npm run 2024
exports.formatData = async (filepath) => {
  const data = await getData(filepath);

  return data;
};

exports.parseData = (dataString) => {
  function manipulateStringStream(inputString, manipulationFunction) {
    const inputStream = Readable.from(inputString);
    let result = '';

    return new Promise((resolve, reject) => {
      inputStream.on('data', (chunk) => {
        for (let i = 0; i < chunk.length; i++) {
          result += manipulationFunction(chunk[i], i);
        }
      });

      inputStream.on('end', () => {
        resolve(result);
      });

      inputStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  return manipulateStringStream(dataString, exports.decodeCharacter)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.decodeCharacter = (character, index) => {
  let numBlocks = parseInt(character, 10);
  // index is even
  if (index % 2 === 0) {
    const id = index / 2;
    return `${id}`.repeat(numBlocks);
  } else {
    return '.'.repeat(numBlocks);
  }
};

exports.rearrangeBlocks = (decodedString) => {
  let rearrangedArray = decodedString.split('');
  for (let i = 0; i < rearrangedArray.length; i++) {
    if (rearrangedArray[i] === '.') {
      for (let j = rearrangedArray.length - 1; j > i; j--) {
        if (rearrangedArray[j] !== '.') {
          const block = rearrangedArray[j];
          rearrangedArray.splice(i, 1, block);
          rearrangedArray.splice(j, 1, '.');
          break;
        }
      }
    }
  }
  return rearrangedArray.join('');
};

exports.getFilesystemChecksum = (rearrangedString) => {
  function manipulateStringStream(inputString, manipulationFunction) {
    const inputStream = Readable.from(inputString);
    let result = [];

    return new Promise((resolve, reject) => {
      inputStream.on('data', (chunk) => {
        for (let i = 0; i < chunk.length; i++) {
          result.push(manipulationFunction(chunk[i], i));
        }
      });

      inputStream.on('end', () => {
        resolve(result);
      });

      inputStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  function idByLoc(id, idx) {
    return parseInt(id, 10) * idx;
  }

  return manipulateStringStream(rearrangedString, idByLoc)
    .then((result) => {
      return sum(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.partOne = async (input) => {
  const parsedData = await exports.parseData(input);
  const rearrangedData = exports.rearrangeBlocks(parsedData);
  const checksum = await exports.getFilesystemChecksum(rearrangedData);
  return checksum;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day09Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      // await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
