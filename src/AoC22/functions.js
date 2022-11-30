const fs = require('fs');

async function getData(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

const data = await getData(
  '/Users/kelseymorse-brown/develop/adventOfCode/src/AoC22/testData.txt'
);
console.log(data);
