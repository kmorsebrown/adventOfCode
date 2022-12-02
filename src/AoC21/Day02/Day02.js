const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function formatData(filepath) {
  const input = await getData(filepath);
  const dataWithHeader = `direction unitsMoved\n${input}`;

  const arr = dataWithHeader.split(/\r?\n/);

  var jsonObj = [];
  var headers = arr[0].split(' ');

  for (var i = 1; i < arr.length; i++) {
    var data = arr[i].split(' ');
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }

  for (var x = 0; x < jsonObj.length; x++) {
    jsonObj[x].unitsMoved = Number(jsonObj[x].unitsMoved);
  }
  return jsonObj;
}

// Part One

async function getPositionMultiplier(input) {
  let positionHorizontal = 0;
  let positionDepth = 0;

  for (var index = 0; index < input.length; index++) {
    switch (input[index].direction) {
      case 'forward':
        positionHorizontal += input[index].unitsMoved;
        break;
      case 'up':
        positionDepth -= input[index].unitsMoved;
        break;
      case 'down':
        positionDepth += input[index].unitsMoved;
        break;
    }
  }
  return positionDepth * positionHorizontal;
}

// Part Two
async function getPositionMultiplierWithAim(input) {
  let horizPosition = 0;
  let depth = 0;
  let aim = 0;

  for (var index = 0; index < input.length; index++) {
    switch (input[index].direction) {
      case 'forward':
        horizPosition += input[index].unitsMoved;
        depth += aim * input[index].unitsMoved;
        break;
      case 'up':
        aim -= input[index].unitsMoved;
        break;
      case 'down':
        aim += input[index].unitsMoved;
        break;
    }
  }
  return depth * horizPosition;
}

async function runDay02() {
  const dataPath = path.join(__dirname, 'Day02Input.txt');

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await getPositionMultiplier(formattedData),
      await getPositionMultiplierWithAim(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  getPositionMultiplier,
  getPositionMultiplierWithAim,
  runDay02,
};
