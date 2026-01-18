import path from 'path';
import { fileURLToPath } from 'url';
import {
  createCalledNumArr,
  createBoardsArr,
  getBoardWinOrder,
  getWinningBoard,
  getWinningBoardsArr,
  getTotalScore,
} from './Day04.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Day04', () => {
  const calledNumArr = [
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ];
  const boardsArr = [
    [
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ],
    [
      [3, 15, 0, 2, 22],
      [9, 18, 13, 17, 5],
      [19, 8, 7, 25, 23],
      [20, 11, 10, 24, 4],
      [14, 21, 16, 12, 6],
    ],
    [
      [14, 21, 17, 24, 4],
      [10, 16, 15, 9, 19],
      [18, 8, 23, 26, 20],
      [22, 11, 13, 6, 5],
      [2, 0, 12, 3, 7],
    ],
  ];
  describe('createCalledNumArr', () => {
    it('Takes first line of test data and creates an array', async () => {
      const args = path.join(__dirname, 'Day04TestData.txt');
      const actual = await createCalledNumArr(args);
      expect(actual).toEqual(calledNumArr);
    });
  });
  describe('createBoardsArr', () => {
    it('Removes first line of test data and creates an array of boards from the remainder', async () => {
      const args = path.join(__dirname, 'Day04TestData.txt');
      const actual = await createBoardsArr(args);
      expect(actual).toEqual(boardsArr);
    });
  });
  describe('getWinningBoard', () => {
    it('Returns the winninig board', async () => {
      const actual = await getWinningBoard(boardsArr, calledNumArr);
      expect(actual.winningBoardArr).toEqual([
        [14, 21, 17, 24, 4],
        [10, 16, 15, 9, 19],
        [18, 8, 23, 26, 20],
        [22, 11, 13, 6, 5],
        [2, 0, 12, 3, 7],
      ]);
    });
    it('Returns the sum of all unmarked numbers of the winninig board', async () => {
      const actual = await getWinningBoard(boardsArr, calledNumArr);
      expect(actual.sumOfUnmarked).toEqual(188);
    });
    it('Returns the number that was just called when the board won', async () => {
      const actual = await getWinningBoard(boardsArr, calledNumArr);
      expect(actual.lastDrawnNum).toEqual(24);
    });
    it('Returns the final score of the winninig board', async () => {
      const actual = await getWinningBoard(boardsArr, calledNumArr);
      expect(actual.totalScore).toEqual(4512);
    });
  });
  describe('getWinningBoardsArr', () => {
    it('Get data if the second board wins', async () => {
      const actual = await getWinningBoardsArr(boardsArr, calledNumArr);
      expect(actual[1]).toEqual({
        boardArr: [
          [3, 15, 0, 2, 22],
          [9, 18, 13, 17, 5],
          [19, 8, 7, 25, 23],
          [20, 11, 10, 24, 4],
          [14, 21, 16, 12, 6],
        ],
        boardNum: 1,
        calledNumAtWin: 13,
        calledNumIndexAtWin: 14,
        calledNumbersUntilWin: [
          7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13,
        ],
        columnMatches: [2, 2, 5, 3, 3],
        rowMatches: [2, 4, 2, 4, 3],
        sumOfUnmarked: 148,
        totalScore: 1924,
      });
    });
  });
  describe('getBoardWinOrder', () => {
    it('Returns the first and last boards to win', async () => {
      const winningBoardsArr = await getWinningBoardsArr(
        boardsArr,
        calledNumArr
      );
      const actual = await getBoardWinOrder(winningBoardsArr);
      expect(actual).toEqual({ firstBoardToWin: 2, lastBoardToWin: 1 });
    });
  });
  describe('getTotalScore', () => {
    it('Gets total score of first board to win', async () => {
      const winningBoardsArr = await getWinningBoardsArr(
        boardsArr,
        calledNumArr
      );
      const boardWinOrder = { firstBoardToWin: 2, lastBoardToWin: 1 };
      const actual = await getTotalScore(
        winningBoardsArr,
        boardWinOrder.firstBoardToWin
      );
      expect(actual).toEqual(4512);
    });
    it('Get total score of last board to win', async () => {
      const winningBoardsArr = await getWinningBoardsArr(
        boardsArr,
        calledNumArr
      );
      const boardWinOrder = { firstBoardToWin: 2, lastBoardToWin: 1 };
      const actual = await getTotalScore(
        winningBoardsArr,
        boardWinOrder.lastBoardToWin
      );
      expect(actual).toEqual(1924);
    });
  });
});
