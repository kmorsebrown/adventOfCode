const fs = require('fs');

// key consts
const PART1_KEY = 'Part1';
const PART2_KEY = 'Part2';

async function getData(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

const appendFile = async (filePath, newLine) => {
  try {
    await fs.promises.readFile(filePath);
    await fs.promises.appendFile(filePath, newLine);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  getData,
  appendFile,
  PART1_KEY,
  PART2_KEY,
};
