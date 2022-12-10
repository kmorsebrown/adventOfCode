const fs = require('fs');
const path = require('path');
const { getData } = require('../../globalFunctions.js');

async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n').map((x) => {
    const tempArr = x.split(' ');
    const tempNum = Number(tempArr.pop());
    tempArr.push(tempNum);
    return tempArr;
  });
  return splitData;
}

// Part One

async function moveHead(commandDir, plank, HcoordArr) {
  let H = plank;
  switch (commandDir) {
    case 'U':
      H.y = H.y + 1;
      break;
    case 'D':
      H.y = H.y - 1;
      break;
    case 'R':
      H.x = H.x + 1;
      break;
    case 'L':
      H.x = H.x - 1;
      break;
    default:
    // do nothing
  }
  HcoordArr.push(`x${H.x}y${H.y}`);
  return H;
}

async function moveTail(plankObj, TcoordArr) {
  let H = plankObj.Head;
  let T = plankObj.Tail;
  const xDiff = H.x - T.x;
  const yDiff = H.y - T.y;

  switch (xDiff) {
    case -2:
      T.x = T.x - 1;
      T.y = H.y;
      break;
    case 2:
      T.x = T.x + 1;
      T.y = H.y;
      break;
    default:
    // no change
  }

  switch (yDiff) {
    case -2:
      T.y = T.y - 1;
      T.x = H.x;
      break;
    case 2:
      T.y = T.y + 1;
      T.x = H.x;
      break;
    default:
    // no change
  }

  TcoordArr.push(`x${T.x}y${T.y}`);
  return T;
}

async function followDirections(command, planksObj, HcoordArr, TcoordArr) {
  // console.log(command);
  for (let i = 0; i < command[1]; i++) {
    // console.log(`i: ${i}; H: ${HcoordArr}; T: ${TcoordArr}`);
    await moveHead(command[0], planksObj.Head, HcoordArr);
    await moveTail(planksObj, TcoordArr);
  }
  return planksObj;
}

async function partOne(input) {
  let plank = {
    Head: {
      x: 0,
      y: 0,
    },
    Tail: {
      x: 0,
      y: 0,
    },
  };

  const Hcoords = ['x0y0'];
  const Tcoords = ['x0y0'];

  for (let i = 0; i < input.length; i++) {
    //console.log(input[i])
    await followDirections(input[i], plank, Hcoords, Tcoords);
  }
  let unique = [...new Set(Tcoords)];

  return unique.length;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay09() {
  const dataPath = path.join(__dirname, 'Day09Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      //await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  moveHead,
  moveTail,
  followDirections,
  partOne,
  partTwo,
  runDay09,
};
