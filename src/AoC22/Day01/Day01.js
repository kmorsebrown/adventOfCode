const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

async function Day01Function(filepath) {
  const data = await getData(filepath);
  return data;
}

async function runDay01() {
  const filepath = path.join(__dirname, 'Day01Input.txt');
  const result = await Day01Function(filepath);
  console.log(result);
}

runDay01();

module.exports = {
  Day01Function,
};
