const { getData, Queue } = require('../../Utils/globalFunctions.js');
const { Readable } = require('stream');
const {
  getCoordinatesForAllMatches,
  getAdjacentCoords,
  getValueFromCoords,
  replaceCharInString,
} = require('../../Utils/grids.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2024/day/15

// DAY=15 npm run 2024

const ROBOT = '@';
const WALL = '#';
const BOX = 'O';
const FREE = '.';

const BOX_L = '[';
const BOX_R = ']';

const DIRS = {
  '^': 'N',
  v: 'S',
  '>': 'E',
  '<': 'W',
};

exports.getMap = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n\n')[0];
  return splitData.split('\n');
};

exports.getMoves = async (filepath) => {
  const data = await getData(filepath);
  const splitData = data.split('\n\n')[1];
  return splitData;
};

// Part One
function createCharacterStream(string) {
  let index = 0;

  return new Readable({
    read() {
      if (index < string.length) {
        this.push(string[index++]);
      } else {
        this.push(null); // Signal end of stream
      }
    },
  });
}

exports.processMoves = (directions, map) => {
  const stringStream = createCharacterStream(directions);
  let newMap = [...map];

  return new Promise((resolve, reject) => {
    stringStream.on('data', (chunk) => {
      const char = chunk.toString();
      if (char !== '\n') {
        exports.moveRobot(char, newMap);
      }
    });

    stringStream.on('end', () => {
      resolve(newMap); // Resolve the final string
    });

    stringStream.on('error', (err) => {
      reject(err); // Reject the promise on error
    });
  });
};

exports.moveRobot = (move, map) => {
  const robot = getCoordinatesForAllMatches(map, ROBOT)[0];

  const robotMove = getAdjacentCoords({
    height: map.length,
    width: map[0].length,
    row: robot.row,
    col: robot.col,
    dir: DIRS[move],
  });

  let nextSpace = getValueFromCoords(map, robotMove);

  // check if box can be pushed
  let boxMove = robotMove;
  let newBoxCoords = [];

  // iterate through moves until boxes can be pushed into a free space, or a wall is hit
  if (nextSpace === BOX) {
    while (nextSpace === BOX) {
      boxMove = getAdjacentCoords({
        height: map.length,
        width: map[0].length,
        row: boxMove.row,
        col: boxMove.col,
        dir: DIRS[move],
      });

      nextSpace = getValueFromCoords(map, boxMove);
      newBoxCoords.push(boxMove);
    }
  }

  // do nothing if the moves would end up  hitting a wall
  if (nextSpace === WALL) {
    return;
  }

  // move robot into free space
  if (nextSpace === FREE) {
    map[robot.row] = replaceCharInString(map[robot.row], robot.col, FREE);
    map[robotMove.row] = replaceCharInString(
      map[robotMove.row],
      robotMove.col,
      ROBOT
    );

    if (newBoxCoords.length > 0) {
      for (let i = 0; i < newBoxCoords.length; i++) {
        map[newBoxCoords[i].row] = replaceCharInString(
          map[newBoxCoords[i].row],
          newBoxCoords[i].col,
          BOX
        );
      }
    }

    return map;
  }
};

exports.getGPSCoords = (map) => {
  const boxes = getCoordinatesForAllMatches(map, BOX);
  const gpsCoords = [];
  boxes.forEach((box) => {
    gpsCoords.push(100 * box.row + box.col);
  });
  return gpsCoords;
};

exports.partOne = async (map, moves) => {
  const updatedMap = await exports.processMoves(moves, map);
  const gpsCoords = exports.getGPSCoords(updatedMap);
  return sum(gpsCoords);
};

// Part Two

exports.doubleMap = (map) => {
  let doubledMap = [];

  for (let i = 0; i < map.length; i++) {
    let newRow = map[i];
    newRow = newRow.replaceAll('#', '##');
    newRow = newRow.replaceAll('O', '[]');
    newRow = newRow.replaceAll('.', '..');
    newRow = newRow.replaceAll('@', '@.');
    doubledMap.push(newRow);
  }

  return doubledMap;
};

exports.moveRobotPt2 = (move, map) => {
  const robot = getCoordinatesForAllMatches(map, ROBOT)[0];

  const robotMove = getAdjacentCoords({
    height: map.length,
    width: map[0].length,
    row: robot.row,
    col: robot.col,
    dir: DIRS[move],
  });

  let nextSpace = getValueFromCoords(map, robotMove);

  // do nothing if the moves would end up  hitting a wall
  if (nextSpace === WALL) {
    return map;
  }

  // move robot into free space
  if (nextSpace === FREE) {
    map[robot.row] = replaceCharInString(map[robot.row], robot.col, FREE);
    map[robotMove.row] = replaceCharInString(
      map[robotMove.row],
      robotMove.col,
      ROBOT
    );
    return map;
  }

  // Push boxes
  if (nextSpace === BOX_L || nextSpace === BOX_R) {
    let newMap;
    switch (DIRS[move]) {
      case 'W':
        map[robot.row] = exports.pushBoxesWest(map[robot.row], robot);
        break;
      case 'E':
        map[robot.row] = exports.pushBoxesEast(map[robot.row], robot);
        break;
      case 'N':
        newMap = exports.pushBoxesNorth(map, robot);
        for (let i = 0; i < map.length; i++) {
          map[i] = newMap[i];
        }
        break;
      case 'S':
        newMap = exports.pushBoxesSouth(map, robot);
        for (let i = 0; i < map.length; i++) {
          map[i] = newMap[i];
        }
        break;
    }
    return map;
  }
};

exports.pushBoxesWest = (rowStr, robot) => {
  const end = robot.col;
  let start = robot.col - 1;
  let boxes;

  while (start >= 0) {
    console.log(`${start} => ${end}`);

    boxes = rowStr.slice(start, end);
    const next = rowStr[start - 1];

    console.log(boxes);
    if (next === '#') {
      console.log('hit a wall');
      return rowStr;
    } else if (next === '.') {
      console.log('push boxes!');
      return (
        rowStr.slice(0, start - 1) +
        boxes +
        '@.' +
        rowStr.slice(end + 1, rowStr.length)
      );
    }

    start--;
  }
};

exports.pushBoxesEast = (rowStr, robot) => {
  const start = robot.col + 1;
  let end = start + 2;
  let boxes;

  while (end < rowStr.length) {
    console.log(`${start} => ${end}`);

    boxes = rowStr.slice(start, end + 1);
    const next = rowStr[end + 1];

    console.log(boxes);
    if (next === '#') {
      console.log('hit a wall');
      return rowStr;
    } else if (next === '.') {
      console.log('push boxes!');
      return (
        rowStr.slice(0, start - 1) +
        '.@' +
        boxes +
        rowStr.slice(end + 2, rowStr.length)
      );
    }

    end += 1;
  }
};

exports.pushBoxesNorth = (map, robot) => {
  let queue = new Queue();
  let boxRanges = [{ row: robot.row, start: robot.col, end: robot.col }];
  let robotPushes = map[robot.row - 1][robot.col];
  let newMap = [...map];

  const firstBox = {
    row: robot.row - 1,
    start: robotPushes === BOX_L ? robot.col : robot.col - 1,
    end: robotPushes === BOX_L ? robot.col + 1 : robot.col,
  };

  boxRanges.push(firstBox);
  queue.enqueue(firstBox);

  while (!queue.isEmpty()) {
    let boxes = queue.front();
    let nextRow = boxes.row - 1;

    let nextBoxes = {
      row: nextRow,
      start:
        map[nextRow][boxes.start] === BOX_R ? boxes.start - 1 : boxes.start,
      end: map[nextRow][boxes.end] === BOX_L ? boxes.end + 1 : boxes.end,
    };

    let nextBoxStr = newMap[nextBoxes.row].slice(
      nextBoxes.start,
      nextBoxes.end + 1
    );

    if (nextBoxStr.includes(WALL)) {
      console.log('Hit a Wall!');
      return newMap;
    } else if (nextBoxStr.includes(BOX_L) || nextBoxStr.includes(BOX_R)) {
      boxRanges.push(nextBoxes);
      queue.enqueue(nextBoxes);
    } else {
      console.log('Push boxes!');
      let rangeToReplace = {
        row: nextBoxes.row,
        start: nextBoxes.start,
        end: nextBoxes.end,
      };

      while (boxRanges.length > 0) {
        let rowStr = newMap[rangeToReplace.row];
        console.log(rangeToReplace);
        console.log(rowStr);

        let pushedBoxes = boxRanges.pop();
        console.log(pushedBoxes);

        let boxesStr = newMap[pushedBoxes.row].slice(
          pushedBoxes.start,
          pushedBoxes.end + 1
        );

        let strToReplace = newMap[rangeToReplace.row].slice(
          rangeToReplace.start,
          rangeToReplace.end + 1
        );

        let newRowStr =
          rowStr.slice(0, rangeToReplace.start) +
          FREE.repeat(strToReplace.length) +
          rowStr.slice(rangeToReplace.end + 1, rowStr.length);

        newRowStr =
          newRowStr.slice(0, pushedBoxes.start) +
          boxesStr +
          newRowStr.slice(pushedBoxes.end + 1, rowStr.length);

        newMap[rangeToReplace.row] = newRowStr;
        rangeToReplace = pushedBoxes;
      }

      let rowStr = newMap[rangeToReplace.row];
      console.log(rangeToReplace);
      console.log(rowStr);

      let strToReplace = newMap[rangeToReplace.row].slice(
        rangeToReplace.start,
        rangeToReplace.end + 1
      );

      let newRowStr =
        rowStr.slice(0, rangeToReplace.start) +
        FREE.repeat(strToReplace.length) +
        rowStr.slice(rangeToReplace.end + 1, rowStr.length);

      newMap[rangeToReplace.row] = newRowStr;
      return newMap;
    }
    queue.dequeue();
  }
};

exports.pushBoxesSouth = (map, robot) => {
  let queue = new Queue();
  let boxRanges = [{ row: robot.row, start: robot.col, end: robot.col }];
  let robotPushes = map[robot.row + 1][robot.col];
  let newMap = [...map];

  const firstBox = {
    row: robot.row + 1,
    start: robotPushes === BOX_L ? robot.col : robot.col - 1,
    end: robotPushes === BOX_L ? robot.col + 1 : robot.col,
  };

  boxRanges.push(firstBox);
  queue.enqueue(firstBox);

  while (!queue.isEmpty()) {
    let boxes = queue.front();
    let nextRow = boxes.row + 1;

    let nextBoxes = {
      row: nextRow,
      start:
        map[nextRow][boxes.start] === BOX_R ? boxes.start - 1 : boxes.start,
      end: map[nextRow][boxes.end] === BOX_L ? boxes.end + 1 : boxes.end,
    };

    let nextBoxStr = newMap[nextBoxes.row].slice(
      nextBoxes.start,
      nextBoxes.end + 1
    );

    if (nextBoxStr.includes(WALL)) {
      console.log('Hit a Wall!');
      return newMap;
    } else if (nextBoxStr.includes(BOX_L) || nextBoxStr.includes(BOX_R)) {
      boxRanges.push(nextBoxes);
      queue.enqueue(nextBoxes);
    } else {
      console.log('Push boxes!');
      let rangeToReplace = {
        row: nextBoxes.row,
        start: nextBoxes.start,
        end: nextBoxes.end,
      };

      while (boxRanges.length > 0) {
        let rowStr = newMap[rangeToReplace.row];
        console.log(rangeToReplace);
        console.log(rowStr);

        let pushedBoxes = boxRanges.pop();
        console.log(pushedBoxes);

        let boxesStr = newMap[pushedBoxes.row].slice(
          pushedBoxes.start,
          pushedBoxes.end + 1
        );

        let strToReplace = newMap[rangeToReplace.row].slice(
          rangeToReplace.start,
          rangeToReplace.end + 1
        );

        let newRowStr =
          rowStr.slice(0, rangeToReplace.start) +
          FREE.repeat(strToReplace.length) +
          rowStr.slice(rangeToReplace.end + 1, rowStr.length);

        newRowStr =
          newRowStr.slice(0, pushedBoxes.start) +
          boxesStr +
          newRowStr.slice(pushedBoxes.end + 1, rowStr.length);

        newMap[rangeToReplace.row] = newRowStr;
        rangeToReplace = pushedBoxes;
      }

      let rowStr = newMap[rangeToReplace.row];
      console.log(rangeToReplace);
      console.log(rowStr);

      let strToReplace = newMap[rangeToReplace.row].slice(
        rangeToReplace.start,
        rangeToReplace.end + 1
      );

      let newRowStr =
        rowStr.slice(0, rangeToReplace.start) +
        FREE.repeat(strToReplace.length) +
        rowStr.slice(rangeToReplace.end + 1, rowStr.length);

      newMap[rangeToReplace.row] = newRowStr;
      return newMap;
    }
    queue.dequeue();
  }
};

exports.processMovesPt2 = (directions, map) => {
  const stringStream = createCharacterStream(directions);
  let newMap = [...map];

  return new Promise((resolve, reject) => {
    stringStream.on('data', (chunk) => {
      const char = chunk.toString();
      if (char !== '\n') {
        exports.moveRobotPt2(char, newMap);
      }
    });

    stringStream.on('end', () => {
      resolve(newMap); // Resolve the final string
    });

    stringStream.on('error', (err) => {
      reject(err); // Reject the promise on error
    });
  });
};

exports.getGPSCoordsPt2 = (map) => {
  const boxes = getCoordinatesForAllMatches(map, BOX_L);
  const gpsCoords = [];
  boxes.forEach((box) => {
    gpsCoords.push(100 * box.row + box.col);
  });
  return gpsCoords;
};

exports.partTwo = async (map, moves) => {
  return;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day15Input.txt'
  );

  try {
    const map = await exports.getMap(dataPath);
    const moves = await exports.getMoves(dataPath);
    const results = await Promise.all([
      await exports.partOne(map, moves),
      // await exports.partTwo(map, moves),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
