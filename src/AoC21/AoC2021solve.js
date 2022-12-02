const fs = require('fs');
const path = require('path');
const { getData, appendFile } = require(path.join(
  path.dirname(__dirname),
  'globalFunctions.js'
));
const { runDay01 } = require(path.join(__dirname, 'Day01', 'Day01.js'));
const { runDay02 } = require(path.join(__dirname, 'Day02', 'Day02.js'));

async function printResults() {
  const reportFilepath = path.join(
    path.dirname(path.dirname(__dirname)),
    'Results.txt'
  );

  await fs.promises.writeFile(reportFilepath, 'Advent of Code 2021', {
    encoding: 'utf8',
    flag: 'w',
  });

  // Run Day 01
  await appendFile(reportFilepath, '\n\nDay One');
  const day01resultsArr = await runDay01();
  await appendFile(reportFilepath, `\n - Part One: ${day01resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day01resultsArr[1]}`);

  // Run Day 02
  await appendFile(reportFilepath, '\n\nDay Two');
  const day02resultsArr = await runDay02();
  await appendFile(reportFilepath, `\n - Part One: ${day02resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day02resultsArr[1]}`);
}

printResults();
