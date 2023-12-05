const fs = require('fs');
const path = require('path');
const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2022/day/9

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

async function moveHead(commandDir, plank) {
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
  return H;
}

async function moveTail(plankObj) {
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
  return T;
}

async function followDirections(command, planksObj, HcoordArr, TcoordArr) {
  // console.log(command);
  for (let i = 0; i < command[1]; i++) {
    // console.log(`i: ${i}; H: ${HcoordArr}; T: ${TcoordArr}`);
    await moveHead(command[0], planksObj.Head);
    HcoordArr.push(`x${planksObj.Head.x}y${planksObj.Head.y}`);

    await moveTail(planksObj);
    TcoordArr.push(`x${planksObj.Tail.x}y${planksObj.Tail.y}`);
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
function moveKnot(prevKnot, currentKnot) {
  const xDiff = prevKnot.x - currentKnot.x;
  const yDiff = prevKnot.y - currentKnot.y;

  if (Math.abs(xDiff) === 2) {
    if (xDiff === -2) {
      currentKnot.x = currentKnot.x - 1;
    } else {
      currentKnot.x = currentKnot.x + 1;
    }
    if (yDiff > 0) {
      currentKnot.y = currentKnot.y + 1;
    } else if (yDiff < 0) {
      currentKnot.y = currentKnot.y - 1;
    }
  } else if (Math.abs(yDiff) === 2) {
    if (yDiff === -2) {
      currentKnot.y = currentKnot.y - 1;
    } else {
      currentKnot.y = currentKnot.y + 1;
    }
    if (xDiff > 0) {
      currentKnot.x = currentKnot.x + 1;
    } else if (xDiff < 0) {
      currentKnot.x = currentKnot.x - 1;
    }
  }

  return currentKnot;
}
async function partTwo(movesArr, numKnots) {
  let headCoord = {
    x: 0,
    y: 0,
  };
  let knotPositionsArr = [];
  let knotCoordArr = [];
  for (let i = 0; i < numKnots; i++) {
    knotCoordArr.push({
      x: 0,
      y: 0,
    });
    knotPositionsArr.push(['x0y0']);
  }
  const HeadPositions = ['x0y0'];
  const TailPositions = ['x0y0'];

  movesArr.forEach((move) => {
    for (let x = 0; x < move[1]; x++) {
      // move head
      moveHead(move[0], headCoord);
      HeadPositions.push(`x${headCoord.x}y${headCoord.y}`);

      // move first knot
      knotCoordArr[0] = moveKnot(headCoord, knotCoordArr[0]);
      knotPositionsArr[0].push(`x${knotCoordArr[0].x}y${knotCoordArr[0].y}`);

      // move remaining knots, if any
      for (let index = 1; index < knotCoordArr.length; index++) {
        knotCoordArr[index] = moveKnot(
          knotCoordArr[index - 1],
          knotCoordArr[index]
        );
        knotPositionsArr[index].push(
          `x${knotCoordArr[index].x}y${knotCoordArr[index].y}`
        );
      }
      // let tail = knotCoordArr[numKnots - 1];
      // let currentTailPosition = `x${tail.x}y${tail.y}`;
      // if (!TailPositions.includes(currentTailPosition)) {
      //   TailPositions.push(currentTailPosition);
      // }
    }
  });

  let unique = [...new Set(knotPositionsArr[numKnots - 1])];
  return unique.length;
}

async function runDay09() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day09Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData, 9),
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
