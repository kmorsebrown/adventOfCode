import * as fs from 'fs';
import * as path from 'path';

// DAY=1 npm run 2023

let day: string | undefined = process.env.DAY;

if (day) {
  if (day.length === 1) {
    day = `0${day}`;
  }
  const puzzle = require(`./Day${day}/Day${day}.js`);
  puzzle;
} else {
  const dayList = fs
    .readdirSync(__dirname)
    .filter(
      (filename) => filename.startsWith('Day') && !filename.endsWith('XX')
    );

  dayList.forEach((day) => {
    const dirPath = path.join(__dirname, day);
    console.log(dirPath);
  });
}
