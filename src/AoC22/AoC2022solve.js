import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { appendFile } from '../Utils/globalFunctions.js';
import { runDay01 } from './Day01/Day01.js';
import { runDay02 } from './Day02/Day02.js';
import { runDay03 } from './Day03/Day03.js';
import { runDay04 } from './Day04/Day04.js';
import { runDay05 } from './Day05/Day05.js';
import { runDay06 } from './Day06/Day06.js';
import { runDay07 } from './Day07/Day07.js';
import { runDay08 } from './Day08/Day08.js';
import { runDay09 } from './Day09/Day09.js';
import { runDay10 } from './Day10/Day10.js';
import { runDay11 } from './Day11/Day11.js';
// import { runDay12 } from './Day12/Day12.js';
// import { runDay13 } from './Day13/Day13.js';
// import { runDay14 } from './Day14/Day14.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function printResult(title, filepath, resultsArr) {
  await appendFile(filepath, `\n\n${title}`);
  await appendFile(filepath, `\n - Part One: ${resultsArr[0]}`);
  await appendFile(filepath, `\n - Part Two: ${resultsArr[1]}`);
}
async function writeReport() {
  const reportFilepath = path.join(
    path.dirname(path.dirname(__dirname)),
    'Results.txt'
  );

  await fs.promises.writeFile(reportFilepath, 'Advent of Code 2022', {
    encoding: 'utf8',
    flag: 'w',
  });

  // Run Day 01
  const day01resultsArr = await runDay01();
  await printResult('Day 1: Calorie Counting', reportFilepath, day01resultsArr);

  // Run Day 02
  const day02resultsArr = await runDay02();
  await printResult(
    'Day 2: Rock Paper Scissors',
    reportFilepath,
    day02resultsArr
  );

  // Run Day 03
  const day03resultsArr = await runDay03();
  await printResult(
    'Day 3: Rucksack Reorganization',
    reportFilepath,
    day03resultsArr
  );

  // Run Day 04
  const day04resultsArr = await runDay04();
  await printResult('Day 4: Camp Cleanup', reportFilepath, day04resultsArr);

  // Run Day 05
  const day05resultsArr = await runDay05();
  await printResult('Day 5: Supply Stacks', reportFilepath, day05resultsArr);

  // Run Day 06
  const day06resultsArr = await runDay06();
  await printResult('Day 6: Tuning Trouble', reportFilepath, day05resultsArr);

  // Run Day 07
  const day07resultsArr = await runDay07();
  await printResult(
    'Day 7: No Space Left On Device',
    reportFilepath,
    day07resultsArr
  );

  // Run Day 08
  const day08resultsArr = await runDay08();
  await printResult(
    'Day 8: Treetop Tree House',
    reportFilepath,
    day08resultsArr
  );

  // Run Day 09
  const day09resultsArr = await runDay09();
  await printResult('Day 9: Rope Bridge', reportFilepath, day09resultsArr);

  // Run Day 10
  const day10resultsArr = await runDay10();
  await printResult(
    'Day 10: Cathode-Ray Tube',
    reportFilepath,
    day10resultsArr
  );

  // Run Day 11
  const day11resultsArr = await runDay11();
  await printResult(
    'Day 11: Monkey in the Middle',
    reportFilepath,
    day11resultsArr
  );

  // Run Day 12
  // const day12resultsArr = await runDay12();
  // await printResult(
  //   'Day 12: Hill Climbing Algorithm',
  //   reportFilepath,
  //   day12resultsArr
  // );

  // Run Day 13
  // const day13resultsArr = await runDay13();
  // await printResult(
  //   'Day 13: Distress Signal',
  //   reportFilepath,
  //   day13resultsArr
  // );

  // Run Day 14
  // const day14resultsArr = await runDay14();
  // await printResult(
  //   'Day 14: Regolith Reservoir',
  //   reportFilepath,
  //   day14resultsArr
  // );
}

writeReport();
