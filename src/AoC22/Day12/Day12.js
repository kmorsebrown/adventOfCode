const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n').map((row) => {
    let tempArr = [];
    row.split('').forEach((i) => {
      if (i === 'S') {
        tempArr.push(1);
      } else if (i === 'E') {
        tempArr.push(26);
      } else {
        tempArr.push(i.charCodeAt(0) - 96);
      }
    });
    return tempArr;
  });
  return splitData;
}

async function getCoords(filepath, char) {
  const data = await getData(filepath);
  const splitData = data.split('\n');
  let row;
  let col;
  splitData.forEach((str, index) => {
    if (str.includes(char)) {
      row = index;
      col = str.indexOf(char);
    }
  });

  return `x${col}y${row}`;
}

function checkMove(currentElevation, newElevation = 0) {
  if (currentElevation <= newElevation && newElevation - currentElevation < 2) {
    return true;
  } else {
    return false;
  }
}

function getPossibleMoves(currentPosition, data) {
  const x = currentPosition.x;
  const y = currentPosition.y;
  const currentElevation = data[y][x];
  let possibleMoves = [];

  // check left
  if (x > 0 && checkMove(currentElevation, data[y][x - 1])) {
    possibleMoves.push({ x: x - 1, y: y });
  }

  // check right
  if (x + 1 < data[y].length && checkMove(currentElevation, data[y][x + 1])) {
    possibleMoves.push({ x: x + 1, y: y });
  }

  // check up
  if (y > 0 && checkMove(currentElevation, data[y - 1][x])) {
    possibleMoves.push({ x: x, y: y - 1 });
  }

  // check down
  if (y + 1 < data.length && checkMove(currentElevation, data[y + 1][x])) {
    possibleMoves.push({ x: x, y: y + 1 });
  }
  return possibleMoves;
}

// Part One

async function partOne(input, startCoords, endCoords) {
  let prevStep = [startCoords];
  let currentStep = [startCoords];

  let steps = 0;

  let reachedEnd = false;

  while (!reachedEnd) {
    const newLogsArr = [];

    currentStep.forEach((log) => {
      const [x, y] = log
        .split(/\D/g)
        .filter(String)
        .map((x) => Number(x));
      const currentCoords = { x: x, y: y };

      getPossibleMoves(currentCoords, input).forEach((move) => {
        const moveStr = `x${move.x}y${move.y}`;
        if (!prevStep.includes(moveStr)) {
          newLogsArr.push(moveStr);
        }
      });
    });

    prevStep = [...new Set(currentStep)];
    currentStep = [...new Set(newLogsArr)];
    steps++;
    if (currentStep.includes(endCoords)) {
      reachedEnd = true;
      break;
    }
  }
  return steps;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay12() {
  const dataPath = path.join(__dirname, 'Day12Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const start = await getCoords(dataPath, 'S');
    const end = await getCoords(dataPath, 'E');
    const results = await Promise.all([
      await partOne(formattedData, start, end),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getCoords,
  getPossibleMoves,
  partOne,
  partTwo,
  runDay12,
};
