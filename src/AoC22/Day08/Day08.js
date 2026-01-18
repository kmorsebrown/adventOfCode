import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2022/day/8

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data
    .split('\n')
    .map((x) => x.split('').map((i) => Number(i)));
  return splitData;
}

function getTreesAbove(input, x, y) {
  let treesArr = [];
  for (let i = 0; i < y; i++) {
    treesArr.push(input[i][x]);
  }
  return treesArr;
}

function getTreesBelow(input, x, y) {
  let treesArr = [];
  for (let i = y + 1; i < input.length; i++) {
    treesArr.unshift(input[i][x]);
  }
  return treesArr;
}

function getTreesLeft(input, x, y) {
  let treesArr = [];
  for (let i = 0; i < x; i++) {
    treesArr.push(input[y][i]);
  }
  return treesArr;
}

function getTreesRight(input, x, y) {
  let treesArr = [];
  for (let i = x + 1; i < input.length; i++) {
    treesArr.unshift(input[y][i]);
  }
  return treesArr;
}

// Part One

function getIfVisible(treesArr, tree) {
  let i = 0;
  let isVisible = true;

  while (isVisible && i < treesArr.length) {
    isVisible = treesArr[i] < tree;
    i++;
  }
  return isVisible;
}

function countEdgeTrees(input) {
  const edgeTreesVert = input.length * 2;

  // subtract trees already counted on the vertical edges
  const edgeTreesHoriz = (input[0].length - 2) * 2;

  return edgeTreesVert + edgeTreesHoriz;
}

async function partOne(input) {
  const lastIntRow = input.length - 2;
  const lastIntColumn = input[0].length - 2;

  const numEdgeTrees = countEdgeTrees(input);
  let numIntVisibleTrees = 0;

  for (let row = 1; row <= lastIntRow; row++) {
    for (let col = 1; col <= lastIntColumn; col++) {
      const treeHeight = input[row][col];
      const treesAbove = getTreesAbove(input, col, row);
      const treesBelow = getTreesBelow(input, col, row);
      const treesLeft = getTreesLeft(input, col, row);
      const treesRight = getTreesRight(input, col, row);

      const visibleAbove = getIfVisible(treesAbove, treeHeight);
      const visibleBelow = getIfVisible(treesBelow, treeHeight);
      const visibleLeft = getIfVisible(treesLeft, treeHeight);
      const visibleRight = getIfVisible(treesRight, treeHeight);

      if (visibleAbove || visibleBelow || visibleLeft || visibleRight) {
        numIntVisibleTrees++;
      }
    }
  }

  return numIntVisibleTrees + numEdgeTrees;
}

// Part Two

function getDirectionScore(tree, treesArr) {
  let reversed = treesArr.reverse();
  let i = 0;
  let isBlocked = false;

  while (!isBlocked && i < reversed.length) {
    isBlocked = reversed[i] >= tree;
    i++;
  }
  return i;
}

function getScenicScore(input, col, row) {
  const treeHeight = input[row][col];
  const treesAbove = getTreesAbove(input, col, row);
  const treesBelow = getTreesBelow(input, col, row);
  const treesLeft = getTreesLeft(input, col, row);
  const treesRight = getTreesRight(input, col, row);

  const aboveScore = getDirectionScore(treeHeight, treesAbove);
  const belowScore = getDirectionScore(treeHeight, treesBelow);
  const leftScore = getDirectionScore(treeHeight, treesLeft);
  const rightScore = getDirectionScore(treeHeight, treesRight);

  return aboveScore * belowScore * leftScore * rightScore;
}
async function partTwo(input) {
  const scenicScoreArr = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      scenicScoreArr.push(getScenicScore(input, col, row));
    }
  }
  return Math.max(...scenicScoreArr);
}

async function solve() {
  const dataPath = new URL(
    '../puzzleInputs/Day08Input.txt',
    import.meta.url
  ).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export { formatData, countEdgeTrees, getTreesAbove, getTreesBelow, getTreesLeft, getTreesRight, partOne, getDirectionScore, getScenicScore, partTwo, solve };
