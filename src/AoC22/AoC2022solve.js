const fs = require('fs');
const path = require('path');
const { appendFile } = require('../globalFunctions.js');
const { runDay01 } = require(path.join(__dirname, 'Day01', 'Day01.js'));
const { runDay02 } = require(path.join(__dirname, 'Day02', 'Day02.js'));
const { runDay03 } = require(path.join(__dirname, 'Day03', 'Day03.js'));
const { runDay04 } = require(path.join(__dirname, 'Day04', 'Day04.js'));
const { runDay05 } = require(path.join(__dirname, 'Day05', 'Day05.js'));
const { runDay06 } = require(path.join(__dirname, 'Day06', 'Day06.js'));
const { runDay07 } = require(path.join(__dirname, 'Day07', 'Day07.js'));
const { runDay08 } = require(path.join(__dirname, 'Day08', 'Day08.js'));
async function printResults() {
  const reportFilepath = path.join(
    path.dirname(path.dirname(__dirname)),
    'Results.txt'
  );

  await fs.promises.writeFile(reportFilepath, 'Advent of Code 2022', {
    encoding: 'utf8',
    flag: 'w',
  });

  // Run Day 01
  await appendFile(reportFilepath, '\n\nDay 1: Calorie Counting');
  const day01resultsArr = await runDay01();
  await appendFile(reportFilepath, `\n - Part One: ${day01resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day01resultsArr[1]}`);

  // Run Day 02
  await appendFile(reportFilepath, '\n\nDay 2: Rock Paper Scissors');
  const day02resultsArr = await runDay02();
  await appendFile(reportFilepath, `\n - Part One: ${day02resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day02resultsArr[1]}`);

  // Run Day 03
  await appendFile(reportFilepath, '\n\nDay 3: Rucksack Reorganization');
  const day03resultsArr = await runDay03();
  await appendFile(reportFilepath, `\n - Part One: ${day03resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day03resultsArr[1]}`);

  // Run Day 04
  await appendFile(reportFilepath, '\n\nDay 4: Camp Cleanup');
  const day04resultsArr = await runDay04();
  await appendFile(reportFilepath, `\n - Part One: ${day04resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day04resultsArr[1]}`);

  // Run Day 05
  await appendFile(reportFilepath, '\n\nDay 5: Supply Stacks');
  const day05resultsArr = await runDay05();
  await appendFile(reportFilepath, `\n - Part One: ${day05resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day05resultsArr[1]}`);

  // Run Day 06
  await appendFile(reportFilepath, '\n\nDay 6: Tuning Trouble');
  const day06resultsArr = await runDay06();
  await appendFile(reportFilepath, `\n - Part One: ${day06resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day06resultsArr[1]}`);

  // Run Day 07
  await appendFile(reportFilepath, '\n\nDay 7: No Space Left On Device');
  const day07resultsArr = await runDay07();
  await appendFile(reportFilepath, `\n - Part One: ${day07resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day07resultsArr[1]}`);

  // Run Day 08
  await appendFile(reportFilepath, '\n\nDay 8: Treetop Tree House');
  const day08resultsArr = await runDay08();
  await appendFile(reportFilepath, `\n - Part One: ${day08resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day08resultsArr[1]}`);
}

printResults();
