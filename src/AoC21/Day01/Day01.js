const path = require('path');
const { getData } = require(path.join(path.dirname(path.dirname(__dirname)), 'globalFunctions.js'))

async function test() {
  const filepath = path.join(__dirname, 'testData.txt');
  const data = await getData(filepath);
  console.log(data);
}

test()