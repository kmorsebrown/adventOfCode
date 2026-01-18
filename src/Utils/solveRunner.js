import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Generic solve runner for all Advent of Code years
 * Usage: solveRunner(import.meta.url, 'AoC2024')
 *
 * Environment variables:
 * - DAY: Run a specific day (e.g., DAY=1 or DAY=01)
 */
export async function solveRunner(importMetaUrl, yearFolder) {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = path.dirname(__filename);

  let dayNum = process.env.DAY;

  if (dayNum) {
    // Run a specific day
    if (dayNum.length === 1) {
      dayNum = `0${dayNum}`;
    }
    const { solve } = await import(`../${yearFolder}/Day${dayNum}/Day${dayNum}.js`);
    const results = await solve();
    console.log(results);
  } else {
    // Run all days
    const dayList = fs
      .readdirSync(__dirname)
      .filter(
        (filename) => filename.startsWith('Day') && !filename.endsWith('XX')
      );

    for (const day of dayList) {
      console.log(`${day}:`);
      const { solve } = await import(path.join(__dirname, day, `${day}.js`));
      const results = await solve();
      console.log(results);
      console.log('\n');
    }
  }
}
