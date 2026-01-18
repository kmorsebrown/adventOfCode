import { getData } from '../../Utils/globalFunctions.js';

// https://adventofcode.com/2022/day/2

const shapePoints = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomePoints = {
  loss: 0,
  draw: 3,
  win: 6,
};

async function formatData(filepath) {
  const data = await getData(filepath);
  const arrayOfStrings = data.split('\n').filter(String);
  let formattedData = [];

  arrayOfStrings.forEach((element) => {
    const stringArray = element.trim().split(/\s+/);
    formattedData.push(stringArray);
  });

  return formattedData;
}

// Part One
async function translateMoves(input) {
  const opponentMoves = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
  };

  const playerMoves = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
  };

  const newArr = [];
  input.forEach((element) => {
    const opponent = opponentMoves[element[0]];
    const player = playerMoves[element[1]];
    newArr.push([opponent, player]);
  });
  return newArr;
}

async function calculateScore(input) {
  const gameScoreArr = [];

  input.forEach((element) => {
    const moveScore = shapePoints[element[1]];
    let outcomeScore;

    if (element[0] === element[1]) {
      outcomeScore = 3;
    } else if (element[1] === 'rock') {
      outcomeScore = element[0] === 'scissors' ? 6 : 0;
    } else if (element[1] === 'paper') {
      outcomeScore = element[0] === 'rock' ? 6 : 0;
    } else if (element[1] === 'scissors') {
      outcomeScore = element[0] === 'paper' ? 6 : 0;
    }

    gameScoreArr.push(moveScore + outcomeScore);
  });
  const gameScore = gameScoreArr.reduce((a, b) => a + b, 0);
  return gameScore;
}

// Part Two
async function translateGuide(input) {
  const opponentMoves = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
  };

  const playerMoves = {
    X: 'loss',
    Y: 'draw',
    Z: 'win',
  };

  const newArr = [];
  input.forEach((element) => {
    const opponent = opponentMoves[element[0]];
    const player = playerMoves[element[1]];
    newArr.push([opponent, player]);
  });
  return newArr;
}

async function calculateRealScore(input) {
  const gameScoreArr = [];

  input.forEach((element) => {
    const outcomeScore = outcomePoints[element[1]];
    let moveScore;

    if (element[1] === 'draw') {
      moveScore = shapePoints[element[0]];
    } else if (element[0] === 'rock') {
      moveScore =
        element[1] === 'win' ? shapePoints.paper : shapePoints.scissors;
    } else if (element[0] === 'paper') {
      moveScore =
        element[1] === 'win' ? shapePoints.scissors : shapePoints.rock;
    } else if (element[0] === 'scissors') {
      moveScore = element[1] === 'win' ? shapePoints.rock : shapePoints.paper;
    }
    gameScoreArr.push(moveScore + outcomeScore);
  });
  const gameScore = gameScoreArr.reduce((a, b) => a + b, 0);
  return gameScore;
}

async function solve() {
  const dataPath = new URL(
    '../puzzleInputs/Day02Input.txt',
    import.meta.url
  ).pathname;

  try {
    const formattedData = await formatData(dataPath);
    const translatedMoves = await translateMoves(formattedData);
    const translatedGuide = await translateGuide(formattedData);
    const results = await Promise.all([
      await calculateScore(translatedMoves),
      await calculateRealScore(translatedGuide),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export {
  formatData,
  translateMoves,
  calculateScore,
  translateGuide,
  calculateRealScore,
  solve,
};
