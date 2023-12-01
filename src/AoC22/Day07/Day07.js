const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

// https://adventofcode.com/2022/day/7

const DISC_SPACE = 70000000;
const MIN_SPACE_NEEDED = 30000000;

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n');

  let filesMap = new Map();

  let workingDir = '';
  let workingDirObj = {};
  let line = 0;

  while (line < splitData.length) {
    if (splitData[line].startsWith('$ cd')) {
      let newDir = splitData[line].split(' ').pop();
      let newDirName;
      // Set new dir name to be full filepath
      if (newDir === '/') {
        newDirName = newDir;
      } else if (newDir != '..' && workingDir === '/') {
        newDirName = workingDir + newDir;
      } else if (newDir != '..') {
        newDirName = workingDir + '/' + newDir;
      }
      if (newDir === '..') {
        // set working directory to parent directory
        workingDir = workingDirObj.parentDir;
        workingDirObj = filesMap.get(workingDir);
      } else {
        // set working directory to new directory
        workingDirObj = filesMap.get(newDirName)
          ? filesMap.get(newDirName)
          : { parentDir: workingDir };
        workingDir = newDirName;
      }
      line++;
    } else if (splitData[line].startsWith('$ ls')) {
      let i = line + 1;
      const filesObj = {};
      const dirsArr = [];
      while (splitData[i] && !splitData[i].startsWith('$')) {
        if (splitData[i].startsWith('dir')) {
          if (workingDir === '/') {
            dirsArr.push(workingDir + splitData[i].split(' ').pop());
          } else {
            dirsArr.push(workingDir + '/' + splitData[i].split(' ').pop());
          }
        } else if (splitData[i][0].match(new RegExp(/^\d/)) !== null) {
          const size = Number(splitData[i].split(' ')[0]);
          const filename = splitData[i].split(' ').pop();
          filesObj[filename] = size;
        }
        i++;
      }
      workingDirObj.files = filesObj;
      workingDirObj.dirs = dirsArr;
      filesMap.set(workingDir, workingDirObj);
      line = i;
    }
  }

  return filesMap;
}

// Get the sum of just the files (not sub directories) in a given directory
function getSumFiles(value, key, map) {
  const obj = value;
  obj.sizeFilesOnly = Object.values(value.files).reduce((a, b) => a + b, 0);
  map.set(key, obj);
}

function getLowestLevelDirs(map) {
  return [...map.entries()]
    .filter((value) => value[1].dirs.length < 1)
    .map(([key]) => key);
}

function getParentDirs(map, dirArr) {
  return [
    ...new Set(
      dirArr
        .map((dirName) =>
          [...map.entries()]
            .filter((value) => value[1].dirs.includes(dirName))
            .map(([key]) => key)
        )
        .flat()
    ),
  ];
}

function getChildDirTotal(map, dirName) {
  const childDirs = map.get(dirName).dirs;

  if (
    childDirs.length ===
    childDirs.map((x) => map.get(x).totalSize).filter(Number).length
  ) {
    return childDirs
      .map((childDir) => map.get(childDir).totalSize)
      .reduce((a, b) => a + b, 0);
  }
}

function getCompletedDirs(map) {
  return [...map.entries()]
    .filter((value) => value[1].totalSize)
    .map(([key]) => key);
}

async function getDirTotals(map) {
  map.forEach(getSumFiles);
  getLowestLevelDirs(map).forEach((element) => {
    let dirObj = map.get(element);
    dirObj.totalSize = dirObj.sizeFilesOnly;
    map.set(element, dirObj);
  });

  while ([...map.keys()].length > getCompletedDirs(map).length) {
    const parentDirs = getParentDirs(map, getCompletedDirs(map));
    parentDirs.forEach((entry) => {
      const dataObj = map.get(entry);
      const childDirTotal = getChildDirTotal(map, entry);
      if (childDirTotal && !dataObj.totalSize) {
        dataObj.totalSize = childDirTotal + dataObj.sizeFilesOnly;
        map.set(entry, dataObj);
      }
    });
  }
  return map;
}

// Part One

async function partOne(map) {
  return [...map.values()]
    .filter((x) => x.totalSize < 100000)
    .map((x) => x.totalSize)
    .reduce((a, b) => a + b, 0);
}

// Part Two
function getTopLevelDrSize(map) {
  const dirSizeArr = [...map.values()].map((x) => x.totalSize);
  const largestDir = Math.max(...dirSizeArr);

  return largestDir;
}
function getUnusedSpace(map, usedSpace) {
  return DISC_SPACE - usedSpace;
}
function partTwo(map) {
  const topLevelDirSize = getTopLevelDrSize(map);
  const currentUnusedSpace = getUnusedSpace(map, topLevelDirSize);
  const freeSpaceNeeded = MIN_SPACE_NEEDED - currentUnusedSpace;

  const largeEnoughDirsSizesArr = [...map.entries()]
    .filter((x) => x[1].totalSize >= freeSpaceNeeded)
    .map((x) => x[1].totalSize);

  const smallestLargeEnoughDirSize = Math.min(...largeEnoughDirsSizesArr);

  return smallestLargeEnoughDirSize;
}

async function runDay07() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day07Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    await getDirTotals(formattedData);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getSumFiles,
  getLowestLevelDirs,
  getParentDirs,
  getChildDirTotal,
  getCompletedDirs,
  getDirTotals,
  partOne,
  getTopLevelDrSize,
  getUnusedSpace,
  partTwo,
  runDay07,
};
