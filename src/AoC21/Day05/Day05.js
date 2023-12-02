const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

// https://adventofcode.com/2021/day/5

async function formatData(filepath) {
  const input = await getData(filepath);
  const arr = input.split(/\r?\n/);

  const jsonObj = [];
  const headers = ['x1', 'y1', 'x2', 'y2'];

  for (let i = 0; i < arr.length; i++) {
    let data = arr[i].match(/\d+/g);
    const obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = parseInt(data[j].trim());
    }
    jsonObj.push(obj);
  }

  return jsonObj;
}

//Create diagram empty diagram
async function createDiagram(input) {
  //Get number of rows (add the 1 to account for the 0th index)
  const y1max = Math.max.apply(
    Math,
    input.map(function (o) {
      return o.y1;
    })
  );
  const y2max = Math.max.apply(
    Math,
    input.map(function (o) {
      return o.y2;
    })
  );
  const numRows = Math.max(y1max, y2max) + 1;

  //Get number of columns (add the 1 to account for the 0th index)
  const x1max = Math.max.apply(
    Math,
    input.map(function (o) {
      return o.x1;
    })
  );
  const x2max = Math.max.apply(
    Math,
    input.map(function (o) {
      return o.x2;
    })
  );
  const numCols = Math.max(x1max, x2max) + 1;

  //Create grid array of 0s
  let arr = new Array(numRows);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(numCols);
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

async function markHorizLines(diagram, lines) {
  let workingArray = diagram;

  for (let i = 0; i < lines.length; i++) {
    const xStart = Math.min(lines[i].x1, lines[i].x2);
    const xEnd = Math.max(lines[i].x1, lines[i].x2);

    //Only consider horizontal lines
    if (lines[i].y1 === lines[i].y2) {
      for (let xIndex = xStart; xIndex <= xEnd; xIndex++) {
        workingArray[lines[i].y1][xIndex] += 1;
      }
    }
  }

  return workingArray;
}

async function markVertLines(diagram, lines) {
  let workingArray = diagram;

  for (let i = 0; i < lines.length; i++) {
    const yStart = Math.min(lines[i].y1, lines[i].y2);
    const yEnd = Math.max(lines[i].y1, lines[i].y2);

    //Only consider vertical lines
    if (lines[i].x1 === lines[i].x2) {
      for (let yIndex = yStart; yIndex <= yEnd; yIndex++) {
        workingArray[yIndex][lines[i].x1] += 1;
      }
    }
  }
  return workingArray;
}

// Part One
async function partOne(coordinates) {
  //Create diagram array of horizontal and vertical lines
  let gridArr = await createDiagram(coordinates);

  //Mark all the horizontal lines
  gridArr = await markHorizLines(gridArr, coordinates);

  //Mark all vertical lines
  gridArr = await markVertLines(gridArr, coordinates);

  return gridArr
    .reduce((previous, current) => previous.concat(current), [])
    .reduce((a, v) => (v > 1 ? a + 1 : a), 0);
}

// Part Two

async function markDiagLines(diagram, lines) {
  let workingArray = diagram;

  for (let i = 0; i < lines.length; i++) {
    const x1 = lines[i].x1;
    const x2 = lines[i].x2;
    const y1 = lines[i].y1;
    const y2 = lines[i].y2;

    //only consider diagonal lines
    if (x1 != x2 && y1 != y2) {
      for (let j = 0; j <= Math.abs(x1 - x2); j++) {
        let xCur = x1 < x2 ? x1 + j : x1 - j;
        let yCur = y1 < y2 ? y1 + j : y1 - j;

        workingArray[yCur][xCur] += 1;
      }
    }
  }
  return workingArray;
}
async function partTwo(coordinates) {
  //Create diagram array of horizontal and vertical lines
  let gridArr = await createDiagram(coordinates);

  //Mark all the horizontal lines
  gridArr = await markHorizLines(gridArr, coordinates);

  //Mark all vertical lines
  gridArr = await markVertLines(gridArr, coordinates);

  //Mark all diagonal lines
  gridArr = await markDiagLines(gridArr, coordinates);

  //Find the number of points where at least two lines overlap
  return gridArr
    .reduce((previous, current) => previous.concat(current), [])
    .reduce((a, v) => (v > 1 ? a + 1 : a), 0);
}

async function runDay05() {
  const dataPath = require.resolve(
    '../../../src/AoC21/puzzleInputs/Day05Input.txt'
  );

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

module.exports = {
  formatData,
  createDiagram,
  markHorizLines,
  markVertLines,
  markDiagLines,
  partOne,
  partTwo,
  runDay05,
};
