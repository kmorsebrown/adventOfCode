import { getData } from '../../Utils/globalFunctions.js';
import { sum } from '../../Utils/maths.js';
import { unique } from '../../Utils/parse.js';
import { Readable } from 'stream';

// https://adventofcode.com/2024/day/09

// DAY=9 npm run 2024
export async function formatData(filepath) {
  const data = await getData(filepath);

  return data;
}

export function parseData(dataString) {
  function manipulateStringStream(inputString, manipulationFunction) {
    const inputStream = Readable.from(inputString);
    let result = [];

    return new Promise((resolve, reject) => {
      inputStream.on('data', (chunk) => {
        for (let i = 0; i < chunk.length; i++) {
          result.push(...manipulationFunction(chunk[i], i));
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

  return manipulateStringStream(dataString, decodeCharacter)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
}

export function decodeCharacter(character, index) {
  let numBlocks = parseInt(character, 10);
  // index is even
  if (index % 2 === 0) {
    const id = index / 2;
    return `${id},`
      .repeat(numBlocks)
      .split(',')
      .filter((e) => e !== '');
  } else {
    return '.'.repeat(numBlocks).split('');
  }
}

export function rearrangeBlocks(decodedArray) {
  let rearrangedArray = [...decodedArray];
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
  return rearrangedArray;
}

export function getFilesystemChecksum(rearrangedArray) {
  function arrayStream(inputArray, manipulationFunction) {
    const inputStream = Readable.from(inputArray);
    let result = [];

    return new Promise((resolve, reject) => {
      let i = 0;
      inputStream.on('data', (row) => {
        result.push(manipulationFunction(row, i));
        i++;
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
    if (id !== '.') {
      return parseInt(id, 10) * idx;
    } else {
      return 0;
    }
  }

  return arrayStream(rearrangedArray, idByLoc)
    .then((result) => {
      return sum(result);
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function partOne(input) {
  const parsedData = await parseData(input);
  const rearrangedData = rearrangeBlocks(parsedData);
  const checksum = await getFilesystemChecksum(rearrangedData);
  return checksum;
}

// Part Two
export function parseDataPt2(dataString) {
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

  return manipulateStringStream(dataString, decodeCharacter)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
}
export function rearrangeBlocksPt2(decodedArray) {
  const fileIds = unique(decodedArray.flat())
    .filter((e) => e !== '.')
    .reverse();

  let rearrangedArray = [...decodedArray];

  for (let i = 0; i < fileIds.length; i++) {
    const id = fileIds[i];
    const fileIndex = rearrangedArray.findIndex((e) => e[0] === id);
    const file = [...rearrangedArray[fileIndex]];
    const fileBlockSize = file.length;

    const freeSpaceIndex = rearrangedArray.findIndex(
      (e) => e[0] === '.' && e.length >= fileBlockSize
    );

    // if free space is found to the left of the file
    if (freeSpaceIndex >= 0 && freeSpaceIndex < fileIndex) {
      const freeSpace = [...rearrangedArray[freeSpaceIndex]];
      const freeSpaceSize = rearrangedArray[freeSpaceIndex].length;

      // move file to free space
      rearrangedArray.splice(fileIndex, 1);
      rearrangedArray.splice(freeSpaceIndex, 0, file);

      // reduce free space by file size
      const newFreeSpaceSize = freeSpaceSize - fileBlockSize;

      if (newFreeSpaceSize === 0) {
        // remove used free space from original index
        rearrangedArray.splice(freeSpaceIndex + 1, 1);
        // move used free space to the former index of the moved file
        rearrangedArray.splice(fileIndex, 0, freeSpace);
      } else {
        // reduce leftover free space by the file block size
        rearrangedArray[freeSpaceIndex + 1].splice(0, fileBlockSize);
        // update copied free space to only include the amount that is moving
        freeSpace.splice(0, newFreeSpaceSize);
        // move used free space to the former index of the moved file + 1
        // to account for the leftover free space remaining after the moved file
        rearrangedArray.splice(fileIndex + 1, 0, freeSpace);
      }
    }
  }
  return rearrangedArray.flat();
}
export async function partTwo(input) {
  const parsedData = await parseDataPt2(input);
  const rearrangedData = rearrangeBlocksPt2(parsedData);
  const checksum = await getFilesystemChecksum(rearrangedData);
  return checksum;
}

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day09Input.txt', import.meta.url).pathname;

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

