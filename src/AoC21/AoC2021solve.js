import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { appendFile } from '../Utils/globalFunctions.js';
import { runDay01 } from './Day01/Day01.js';
import { runDay02 } from './Day02/Day02.js';
import { runDay03 } from './Day03/Day03.js';
import { runDay04 } from './Day04/Day04.js';
import { runDay05 } from './Day05/Day05.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  await appendFile(reportFilepath, '\n\nDay 1: Sonar Sweep');
  const day01resultsArr = await runDay01();
  await appendFile(reportFilepath, `\n - Part One: ${day01resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day01resultsArr[1]}`);

  // Run Day 02
  await appendFile(reportFilepath, '\n\nDay 2: Dive!');
  const day02resultsArr = await runDay02();
  await appendFile(reportFilepath, `\n - Part One: ${day02resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day02resultsArr[1]}`);

  // Run Day 03
  await appendFile(reportFilepath, '\n\nDay 3: Binary Diagnostic');
  const day03resultsArr = await runDay03();
  await appendFile(reportFilepath, `\n - Part One: ${day03resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day03resultsArr[1]}`);

  // Run Day 04
  await appendFile(reportFilepath, '\n\nDay 4: Giant Squid');
  const day04resultsArr = await runDay04();
  await appendFile(reportFilepath, `\n - Part One: ${day04resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day04resultsArr[1]}`);

  // Run Day 05
  await appendFile(reportFilepath, '\n\nDay 5: Hydrothermal Venture');
  const day05resultsArr = await runDay05();
  await appendFile(reportFilepath, `\n - Part One: ${day05resultsArr[0]}`);
  await appendFile(reportFilepath, `\n - Part Two: ${day05resultsArr[1]}`);
}

printResults();
