import * as path from 'path';

import { getData } from '../../globalFunctions.js';

// https://adventofcode.com/2023/day/2

export type Game = {
  id: number;
  sets: Set[];
};

export type Set = {
  [Cube.Blue]?: number;
  [Cube.Green]?: number;
  [Cube.Red]?: number;
};

export type BlueSet = {
  [Cube.Blue]: number;
  [Cube.Green]?: number;
  [Cube.Red]?: number;
};

export type RedSet = {
  [Cube.Blue]?: number;
  [Cube.Green]?: number;
  [Cube.Red]: number;
};

export type GreenSet = {
  [Cube.Blue]?: number;
  [Cube.Green]: number;
  [Cube.Red]?: number;
};
export enum Cube {
  Blue = 'blue',
  Green = 'green',
  Red = 'red',
}

export function getId(str: string): number {
  return Number(str.replace(/\D/g, ''));
}

export function getSet(str: string): Set {
  const setArr = str.split(',');

  const obj = {};
  setArr.map((x) => {
    const color = x.replace(/\d+/g, '').trim();
    const numb = Number(x.replace(/\D/g, ''));
    obj[color] = numb;
  });
  return obj;
}
export async function formatData(filepath: string) {
  const data = await getData(filepath);
  let stringifiedData = data.split('\n').filter(String);
  let dataArr: Game[] = [];
  stringifiedData.forEach((game) => {
    const gameArr = game.split(':');
    const obj: Game = {
      id: getId(gameArr[0]),
      sets: [],
    };
    gameArr[1].split(';').forEach((set) => {
      obj.sets.push(getSet(set));
    });
    dataArr.push(obj);
  });
  return dataArr;
}

const args = require.resolve('./Day02TestData.txt');
formatData(args);

// Part One

export async function partOne(input) {
  return input;
}

// Part Two
export async function partTwo(input) {
  return input;
}

export async function solve() {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day02Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
