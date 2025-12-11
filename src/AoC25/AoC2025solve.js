import * as fs from 'fs';
import * as path from 'path';

// DAY=1 npm run 2025

let dayNum = process.env.DAY;

if (dayNum) {
  if (dayNum.length === 1) {
    dayNum = `0${dayNum}`;
  }
  require(`./Day${dayNum}/Day${dayNum}.js`);
} else {
  const dayList = fs
    .readdirSync(__dirname)
    .filter(
      (filename) => filename.startsWith('Day') && !filename.endsWith('XX')
    );

  dayList.forEach((day) => {
    require(path.join(__dirname, path.join(day, `${day}.js`)));
  });
}
