const fs = require('fs');
const path = require('path');
const { getData } = require(path.join(
  path.dirname(path.dirname(__dirname)),
  'globalFunctions.js'
));

// https://adventofcode.com/2021/day/4
async function createCalledNumArr(filepath) {
  const rawData = await getData(filepath);
  const arrayifiedRawData = rawData.split('\n');
  const tempArray = arrayifiedRawData[0].split(',');

  for (let i = 0; i < tempArray.length; i++) {
    tempArray[i] = parseInt(tempArray[i]);
  }
  return tempArray;
}

async function createBoardsArr(filepath) {
  const rawData = await getData(filepath);
  const arrayifiedRawData = rawData.split('\n').filter(String);
  const arrayOfStrings = arrayifiedRawData.slice(1);
  let tempArray = [];

  while (arrayOfStrings.length > 0) {
    let arrayElement = arrayOfStrings.splice(0, 5);
    tempArray.push(arrayElement);
  }

  for (var i = 0; i < tempArray.length; i++) {
    for (let x = 0; x < tempArray[i].length; x++) {
      const regex = /\d+/g;
      const arrayElement = tempArray[i][0].match(regex);
      for (let y = 0; y < arrayElement.length; y++) {
        arrayElement[y] = parseInt(arrayElement[y]);
      }
      const newBoard = tempArray[i].slice(1);
      newBoard.push(arrayElement);
      tempArray[i] = newBoard;
    }
  }

  return tempArray;
}

function getNumbersCalledBeforeWin(arrayOfNumbers, index) {
  let checkedNumbers = [];

  for (let i = 0; i <= index; i++) {
    checkedNumbers.push(arrayOfNumbers[i]);
  }
  return checkedNumbers;
}

function getSumOfUnmarked(board, checkedNumbers) {
  // Get sum of unmarked numbers on winning board
  let sumOfUnmarked = 0;
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    //console.log('Checking row ', rowIndex);

    //check each number in the row array
    for (let numIndex = 0; numIndex < board[rowIndex].length; numIndex++) {
      //console.log('    Checking numIndex ', numIndex);
      //console.log('    Checking number ', board[rowIndex][numIndex]);
      if (!checkedNumbers.includes(board[rowIndex][numIndex])) {
        sumOfUnmarked += board[rowIndex][numIndex];
      }
    }
  }
  return sumOfUnmarked;
}

// Part One

async function getWinningBoard(boards, calledNumbers) {
  let winningData = {};
  let currentCalledNumIndex = 0;
  let tempWinLossBoards = [];
  let checkedNumbers = [];

  //Loop until there's a winner
  labelCancelLoops: while (true) {
    let currentCalledNum = calledNumbers[currentCalledNumIndex];
    let winningRow;
    let winningColumn;

    checkedNumbers.push(currentCalledNum);

    //Check each board
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      //create a new board object inside the tempWinLossBoards array if there isn't one already at the current index
      if (!tempWinLossBoards[boardIndex]) {
        const boardTemplate = {
          rowMatches: [0, 0, 0, 0, 0],
          columnMatches: [0, 0, 0, 0, 0],
        };
        tempWinLossBoards.push(JSON.parse(JSON.stringify(boardTemplate)));
      }

      //check each row in the board array
      for (let rowIndex = 0; rowIndex < boards[boardIndex].length; rowIndex++) {
        //check each number in the row array
        if (boards[boardIndex][rowIndex].includes(currentCalledNum)) {
          tempWinLossBoards[boardIndex].rowMatches[rowIndex] += 1;
        }

        //check if the current rowIndex wins
        if (
          tempWinLossBoards[boardIndex].rowMatches[rowIndex] ===
          boards[boardIndex][rowIndex].length
        ) {
          winningRow = rowIndex;
        }
      }

      //check each column in the board array
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        let tempColArray = [];

        //Create a temporary array for the current column
        for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
          tempColArray.push(boards[boardIndex][rowIndex][colIndex]);
        }

        //check each number in the column array
        if (tempColArray.includes(currentCalledNum)) {
          tempWinLossBoards[boardIndex].columnMatches[colIndex] += 1;
        }

        //check if the current colIndex wins
        if (
          tempWinLossBoards[boardIndex].columnMatches[colIndex] ===
          tempColArray.length
        ) {
          winningColumn = colIndex;
        }
      }

      //check each if there's a winner
      if (typeof winningRow === 'number' || typeof winningColumn === 'number') {
        winningData.winningBoardArr = boards[boardIndex];
        winningData.lastNumIndex = currentCalledNumIndex;
        winningData.lastDrawnNum = calledNumbers[currentCalledNumIndex];
        winningData.boardIndex = boardIndex;
        break labelCancelLoops;
      }
    }

    if (!winningData.winningBoardArr) {
      //If no winning board yet, draw a new number
      currentCalledNumIndex++;
    }
  }
  winningData.numCalledBeforeWin = getNumbersCalledBeforeWin(
    calledNumbers,
    winningData.lastNumIndex
  );
  winningData.sumOfUnmarked = getSumOfUnmarked(
    winningData.winningBoardArr,
    winningData.numCalledBeforeWin
  );
  winningData.totalScore = winningData.sumOfUnmarked * winningData.lastDrawnNum;
  return winningData;
}

// Part Two
async function getDataAtBoardWin(boards, boardIndex, calledNumbers) {
  let boardData = {
    boardNum: boardIndex,
    boardArr: boards[boardIndex],
    calledNumbersUntilWin: [],
    rowMatches: [0, 0, 0, 0, 0],
    columnMatches: [0, 0, 0, 0, 0],
  };

  let currentCalledNumIndex = 0;

  //Loop until there's a winner
  labelCancelLoops: while (true) {
    let currentCalledNum = calledNumbers[currentCalledNumIndex];

    boardData.calledNumbersUntilWin.push(currentCalledNum);

    //check each row and column in the board array
    for (let i = 0; i < 5; i++) {
      //check each number in the row array, if it's the same as the current called number, iterate the match
      if (boards[boardIndex][i].includes(currentCalledNum)) {
        boardData.rowMatches[i] += 1;
      }

      //Create a temporary array for the current column
      let tempColArray = [];
      for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        tempColArray.push(boards[boardIndex][rowIndex][i]);
      }

      //check each number in the column array
      if (tempColArray.includes(currentCalledNum)) {
        boardData.columnMatches[i] += 1;
      }
    }

    //check if the board has won yet
    if (
      boardData.rowMatches.includes(5) ||
      boardData.columnMatches.includes(5)
    ) {
      boardData.calledNumIndexAtWin = currentCalledNumIndex;
      boardData.calledNumAtWin = calledNumbers[currentCalledNumIndex];
      break labelCancelLoops;
    } else {
      //If not, draw a new number
      currentCalledNumIndex++;
    }
  }

  //Get sum of uncalled numbers and total score
  boardData.sumOfUnmarked = getSumOfUnmarked(
    boards[boardIndex],
    boardData.calledNumbersUntilWin
  );
  boardData.totalScore = boardData.sumOfUnmarked * boardData.calledNumAtWin;

  return boardData;
}

async function getWinningBoardsArr(boards, calledNumbers) {
  let winningBoardsArr = [];

  for (let index = 0; index < boards.length; index++) {
    let tempBoardData = await getDataAtBoardWin(boards, index, calledNumbers);
    // console.log(tempBoardData);
    winningBoardsArr.push(tempBoardData);
  }

  return winningBoardsArr;
}

async function getBoardWinOrder(boards) {
  let calledNumbersUntilWinLengths = [];

  for (let i = 0; i < boards.length; i++) {
    calledNumbersUntilWinLengths.push(boards[i].calledNumbersUntilWin.length);
  }

  const fewestNumsCalled = Math.min(...calledNumbersUntilWinLengths);
  const mostNumsCalled = Math.max(...calledNumbersUntilWinLengths);

  let winOrderData = {
    firstBoardToWin: calledNumbersUntilWinLengths.indexOf(fewestNumsCalled),
    lastBoardToWin: calledNumbersUntilWinLengths.indexOf(mostNumsCalled),
  };

  return winOrderData;
}

async function getTotalScore(boards, boardIndex) {
  const winningBoard = boards[boardIndex];
  return winningBoard.totalScore;
}
async function runDay04() {
  const dataPath = require.resolve(
    '../../../src/AoC21/puzzleInputs/Day04Input.txt'
  );

  try {
    const calledNumArr = await createCalledNumArr(dataPath);
    const boardsArr = await createBoardsArr(dataPath);
    const winningBoardsArr = await getWinningBoardsArr(boardsArr, calledNumArr);
    const winningBoard = await getWinningBoard(boardsArr, calledNumArr);
    const boardWinOrder = await getBoardWinOrder(winningBoardsArr);
    const results = await Promise.all([
      winningBoard.totalScore,
      await getTotalScore(winningBoardsArr, boardWinOrder.lastBoardToWin),
    ]);

    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createCalledNumArr,
  createBoardsArr,
  getNumbersCalledBeforeWin,
  getSumOfUnmarked,
  getWinningBoard,
  getDataAtBoardWin,
  getWinningBoardsArr,
  getBoardWinOrder,
  getTotalScore,
  runDay04,
};
