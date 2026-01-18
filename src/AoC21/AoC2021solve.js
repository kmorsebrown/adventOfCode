import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// DAY=1 npm run 2021

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dayNum = process.env.DAY;

async function runDays() {
  if (dayNum) {
    if (dayNum.length === 1) {
      dayNum = `0${dayNum}`;
    }
    const { solve } = await import(`./Day${dayNum}/Day${dayNum}.js`);
    const results = await solve();
    console.log(results);
  } else {
    const dayList = fs
      .readdirSync(__dirname)
      .filter(
        (filename) => filename.startsWith('Day') && !filename.endsWith('XX')
      );

    for (const day of dayList) {
      console.log(`${day}:`);
      const { solve } = await import(path.join(__dirname, path.join(day, `${day}.js`)));
      const results = await solve();
      console.log(results);
      console.log('\n');
    }
  }
}

runDays();
