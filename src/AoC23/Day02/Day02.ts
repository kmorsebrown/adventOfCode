import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2023/day/2

export type Game = {
  id: number;
  sets: Set[];
};

export type Set = {
  [Cube.Red]: number;
  [Cube.Green]: number;
  [Cube.Blue]: number;
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

  const obj = {
    [Cube.Red]: 0,
    [Cube.Green]: 0,
    [Cube.Blue]: 0,
  };
  setArr.map((x) => {
    const color = x.replace(/\d+/g, '').trim();
    const numb = Number(x.replace(/\D/g, ''));
    switch (color) {
      case Cube.Red:
        obj[Cube.Red] = numb;
        break;
      case Cube.Green:
        obj[Cube.Green] = numb;
        break;
      case Cube.Blue:
        obj[Cube.Blue] = numb;
        break;
      default:
        break;
    }
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

// Part One
export function checkIfGamePossible(
  game: Game,
  { redCubes = 0, greenCubes = 0, blueCubes = 0 }
) {
  let numPossibleSets = 0;
  game.sets.forEach((set) => {
    if (
      set.red <= redCubes &&
      set.green <= greenCubes &&
      set.blue <= blueCubes
    ) {
      numPossibleSets += 1;
    }
  });
  return numPossibleSets === game.sets.length;
}
export async function partOne(
  input: Game[],
  { redCubes = 0, greenCubes = 0, blueCubes = 0 }
) {
  const possibleGameIds: number[] = input.map((game) => {
    if (checkIfGamePossible(game, { redCubes, greenCubes, blueCubes })) {
      return game.id;
    } else {
      return 0;
    }
  });
  if (possibleGameIds.length > 1) {
    return possibleGameIds.reduce((a, b) => a + b);
  }
}

// Part Two
export function getMinCubesForGame(game: Game): Set {
  let minCubeSet: Set = {
    [Cube.Red]: 0,
    [Cube.Green]: 0,
    [Cube.Blue]: 0,
  };

  game.sets.forEach((set) => {
    if (set[Cube.Red] > minCubeSet[Cube.Red]) {
      minCubeSet[Cube.Red] = set[Cube.Red];
    }

    if (set[Cube.Green] > minCubeSet[Cube.Green]) {
      minCubeSet[Cube.Green] = set[Cube.Green];
    }

    if (set[Cube.Blue] > minCubeSet[Cube.Blue]) {
      minCubeSet[Cube.Blue] = set[Cube.Blue];
    }
  });

  return minCubeSet;
}
export function getMinCubeSetPower(set: Set): number {
  if (
    typeof set[Cube.Red] === 'number' &&
    typeof set[Cube.Green] === 'number' &&
    typeof set[Cube.Blue] === 'number'
  ) {
    return set[Cube.Red] * set[Cube.Green] * set[Cube.Blue];
  } else {
    return 0;
  }
}
export async function partTwo(input: Game[]): Promise<number> {
  const minCubeSets: Set[] = input.map((game) => getMinCubesForGame(game));
  const setPowers: number[] = minCubeSets.map((set) => getMinCubeSetPower(set));
  return setPowers.reduce((a, b) => a + b);
}

export async function solve() {
  const dataPath = new URL('../../puzzleInputs/Day02Input.txt', import.meta.url).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData, {
        redCubes: 12,
        greenCubes: 13,
        blueCubes: 14,
      }),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();
