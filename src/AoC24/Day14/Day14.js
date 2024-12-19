const { getData } = require('../../Utils/globalFunctions.js');
const { parseStringOfInts } = require('../../Utils/parse.js');
const _ = require('lodash');

// https://adventofcode.com/2024/day/14

// DAY=14 npm run 2024

const X_IDX = 0;
const Y_IDX = 1;

exports.formatData = async (filepath) => {
  const data = await getData(filepath);
  const robotStrings = data.split('\n');
  return robotStrings.map((robot) => {
    let splitString = robot.split(' ');
    return {
      p: parseStringOfInts(splitString[X_IDX].replace('p=', ''), ','),
      v: parseStringOfInts(splitString[Y_IDX].replace('v=', ''), ','),
    };
  });
};

// Part One

exports.moveRobot = (robot, width, height) => {
  const startPos = robot.p;
  const velocity = robot.v;

  let newX = startPos[X_IDX] + velocity[X_IDX];
  let newY = startPos[Y_IDX] + velocity[Y_IDX];

  // determine if vertical wrap
  if (newX < 0) {
    newX = width + newX;
  }
  if (newX >= width) {
    newX = newX - width;
  }

  // determine if horiz wrap
  if (newY < 0) {
    newY = height + newY;
  }

  if (newY >= height) {
    newY = newY - height;
  }

  return {
    p: [newX, newY],
    v: velocity,
  };
};

exports.moveRobots = (robots, width, height) => {
  let movedRobots = [];
  for (let i = 0; i < robots.length; i++) {
    const movedRobot = exports.moveRobot(robots[i], width, height);
    movedRobots.push(movedRobot);
  }
  return movedRobots;
};

exports.getRobotPositionsAfterXSeconds = (robots, seconds, width, height) => {
  let currentRobots = [...robots];
  if (seconds > 0) {
    let s = 1;
    while (s <= seconds) {
      const movedRobots = exports.moveRobots(currentRobots, width, height);
      currentRobots = movedRobots;
      s++;
    }
  }

  return currentRobots;
};

exports.getRobotsPerQuadrant = (robots, width, height) => {
  const center = [Math.floor(width / 2), Math.floor(height / 2)];

  const north = _.range(0, center[1]);
  const west = _.range(0, center[0]);
  const south = _.range(center[1] + 1, height);
  const east = _.range(center[0] + 1, width);

  let quadrants = {
    nw: 0,
    ne: 0,
    se: 0,
    sw: 0,
  };

  for (let i = 0; i < robots.length; i++) {
    const rx = robots[i].p[0];
    const ry = robots[i].p[1];

    if (north.includes(ry)) {
      if (west.includes(rx)) {
        quadrants.nw++;
      } else if (east.includes(rx)) {
        quadrants.ne++;
      }
    } else if (south.includes(ry)) {
      if (west.includes(rx)) {
        quadrants.sw++;
      } else if (east.includes(rx)) {
        quadrants.se++;
      }
    }
  }

  return quadrants;
};

exports.partOne = async (input, seconds, width, height) => {
  const movedRobots = exports.getRobotPositionsAfterXSeconds(
    input,
    seconds,
    width,
    height
  );
  const quadrants = exports.getRobotsPerQuadrant(movedRobots, width, height);
  return quadrants.ne * quadrants.nw * quadrants.sw * quadrants.se;
};

// Part Two
exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC24/puzzleInputs/Day14Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData, 100, 101, 103),
      // await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
