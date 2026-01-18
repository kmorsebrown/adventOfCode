import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  formatData,
  translateMoves,
  calculateScore,
  translateGuide,
  calculateRealScore,
} from './Day02.js';

describe('Day02', () => {
  describe('formatData', () => {
    it('Formats the data into an array of arrays', async () => {
      const args = path.join(__dirname, 'Day02TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        ['A', 'Y'],
        ['B', 'X'],
        ['C', 'Z'],
      ]);
    });
  });
  describe('translateMoves', () => {
    it('Converts the strategy guide code into plain text', async () => {
      const args = [
        ['A', 'Y'],
        ['B', 'X'],
        ['C', 'Z'],
      ];
      const actual = await translateMoves(args);
      expect(actual).toEqual([
        ['rock', 'paper'],
        ['paper', 'rock'],
        ['scissors', 'scissors'],
      ]);
    });
  });
  describe('calculateScore', () => {
    it('Calculates score for game', async () => {
      const args = [
        ['rock', 'paper'],
        ['paper', 'rock'],
        ['scissors', 'scissors'],
      ];
      const actual = await calculateScore(args);
      expect(actual).toEqual(15);
    });
  });
  describe('translateGuide', () => {
    it('Converts the strategy guide code into plain text', async () => {
      const args = [
        ['A', 'Y'],
        ['B', 'X'],
        ['C', 'Z'],
      ];
      const actual = await translateGuide(args);
      expect(actual).toEqual([
        ['rock', 'draw'],
        ['paper', 'loss'],
        ['scissors', 'win'],
      ]);
    });
  });
  describe('calculateRealScore', () => {
    it('Calculates real score for entire game based on guide', async () => {
      const args = [
        ['rock', 'draw'],
        ['paper', 'loss'],
        ['scissors', 'win'],
      ];
      const actual = await calculateRealScore(args);
      expect(actual).toEqual(12);
    });
  });
});
