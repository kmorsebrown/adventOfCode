import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatData,
  getHandType,
  compareHandStrengthPartOne,
  partOne,
  getHandTypeWithJokers,
  compareHandStrengthWithJokers,
  partTwo,
} from './Day07.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// npm test -- src/AoC23/Day07/Day07.spec.js

describe('Day07', () => {
  const mockData = [
    {
      hand: '32T3K',
      bid: 765,
    },
    {
      hand: 'T55J5',
      bid: 684,
    },
    {
      hand: 'KK677',
      bid: 28,
    },
    {
      hand: 'KTJJT',
      bid: 220,
    },
    {
      hand: 'QQQJA',
      bid: 483,
    },
  ];
  const FIVE_OF_A_KIND = 'FIVE_OF_A_KIND'; // all 5 share label
  const FOUR_OF_A_KIND = 'FOUR_OF_A_KIND'; // 4 share label, 1 w/distinct label
  const FULL_HOUSE = 'FULL_HOUSE'; // 3 share label, 2 share 2nd label
  const THREE_OF_A_KIND = 'THREE_OF_A_KIND'; // 3 share label, 2 w/distinct labels
  const TWO_PAIR = 'TWO_PAIR'; // 2 share label, 2 share 2nd label
  const ONE_PAIR = 'ONE_PAIR'; // 2 share label, 3 w/distinct labels
  const HIGH_CARD = 'HIGH_CARD'; // all 5 have distinct labels
  describe('formatData', () => {
    it('Formats the data into an array of objects', async () => {
      const args = new URL('./Day07TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockData);
    });
  });
  describe('getHandType', () => {
    it('returns five of a kind', () => {
      expect(getHandType('AAAAA')).toEqual(FIVE_OF_A_KIND);
    });
    it('returns four of a kind', () => {
      expect(getHandType('AA8AA')).toEqual(FOUR_OF_A_KIND);
    });
    it('returns full house', () => {
      expect(getHandType('23332')).toEqual(FULL_HOUSE);
    });
    it('returns three of a kind', () => {
      expect(getHandType('TTT98')).toEqual(THREE_OF_A_KIND);
    });
    it('returns two pair', () => {
      expect(getHandType('23432')).toEqual(TWO_PAIR);
    });
    it('returns one pair', () => {
      expect(getHandType('A23A4')).toEqual(ONE_PAIR);
    });
    it('returns high card', () => {
      expect(getHandType('23456')).toEqual(HIGH_CARD);
    });
  });
  describe('compareHandStrengthPartOne', () => {
    it('returns 1 when A is one pair and B is two pair', () => {
      const a = {
        hand: '32T3K',
        bid: 765,
      };
      const b = {
        hand: 'KK677',
        bid: 28,
      };
      expect(compareHandStrengthPartOne(a, b)).toEqual(1);
    });
    it('returns 1 when A and B are both three of a kind but B is stronger', () => {
      const b = {
        hand: 'QQQJA',
        bid: 483,
      };
      const a = {
        hand: 'T55J5',
        bid: 684,
      };
      expect(compareHandStrengthPartOne(a, b)).toEqual(1);
    });
    it('returns - 1 when A & B are both two pair but A is stronger', () => {
      const a = {
        hand: 'KK677',
        bid: 28,
      };
      const b = {
        hand: 'KTJJT',
        bid: 220,
      };
      expect(compareHandStrengthPartOne(a, b)).toEqual(-1);
    });
    it('returns -1 when A is three of a kind and B is one pair', () => {
      const a = {
        hand: 'QQQJA',
        bid: 483,
      };
      const b = {
        hand: '32T3K',
        bid: 765,
      };
      expect(compareHandStrengthPartOne(a, b)).toEqual(-1);
    });
    it('returns 0 when A and B are identical', () => {
      const a = {
        hand: 'T55J5',
        bid: 684,
      };
      const b = {
        hand: 'T55J5',
        bid: 684,
      };
      expect(compareHandStrengthPartOne(a, b)).toEqual(0);
    });
  });
  describe('partOne', () => {
    it('Sum winnings', async () => {
      const actual = await partOne(mockData);
      expect(actual).toEqual(6440);
    });
  });
  describe('getHandTypeWithJokers', () => {
    it('returns five of a kind for 5:0 hand', () => {
      expect(getHandTypeWithJokers('AAAAA')).toEqual(FIVE_OF_A_KIND);
      expect(getHandTypeWithJokers('JJJJJ')).toEqual(FIVE_OF_A_KIND);
    });
    it('returns five of a kind for 4:1 ratio w/Js', () => {
      expect(getHandTypeWithJokers('AAAAJ')).toEqual(FIVE_OF_A_KIND);
      expect(getHandTypeWithJokers('JJJJA')).toEqual(FIVE_OF_A_KIND);
    });
    it('returns five of a kind for 3:2 ratio w/Js', () => {
      expect(getHandTypeWithJokers('AAAJJ')).toEqual(FIVE_OF_A_KIND);
      expect(getHandTypeWithJokers('JJJAA')).toEqual(FIVE_OF_A_KIND);
    });
    it('returns four of a kind for 3:1:1 ratio w/ Js', () => {
      expect(getHandTypeWithJokers('AAAJ8')).toEqual(FOUR_OF_A_KIND);
      expect(getHandTypeWithJokers('JJJA8')).toEqual(FOUR_OF_A_KIND);
    });
    it('returns four of a kind for 2:2:1 ratio w/ 2 Js', () => {
      expect(getHandTypeWithJokers('JJAA8')).toEqual(FOUR_OF_A_KIND);
    });
    it('returns full house for 2:2:1 ratio w/ 1 J', () => {
      expect(getHandTypeWithJokers('88AAJ')).toEqual(FULL_HOUSE);
    });
    it('returns three of a kind for 3:1:1 ratio w/o Js', () => {
      expect(getHandTypeWithJokers('AAAT8')).toEqual(THREE_OF_A_KIND);
    });
    it('returns two pair for 2:2:1 ratio w/o Js', () => {
      expect(getHandTypeWithJokers('TTAA8')).toEqual(TWO_PAIR);
    });
    it('returns three of a kind for 2:1:1:1 ratio w/ Js', () => {
      expect(getHandTypeWithJokers('AAJT8')).toEqual(THREE_OF_A_KIND);
      expect(getHandTypeWithJokers('JJAT8')).toEqual(THREE_OF_A_KIND);
    });
    it('returns one pair for 2:1:1:1 ratio w/o Js', () => {
      expect(getHandTypeWithJokers('AA3T8')).toEqual(ONE_PAIR);
    });
    it('returns one pair for 1:1:1:1 ratio w/ Js', () => {
      expect(getHandTypeWithJokers('JA3T8')).toEqual(ONE_PAIR);
    });
    it('returns high card for 1:1:1:1 ratio w/0 Js', () => {
      expect(getHandTypeWithJokers('6A3T8')).toEqual(HIGH_CARD);
    });
  });
  describe('compareHandStrengthWithJokers', () => {
    it('returns 1 when A is two pair and B is full house w/joker', () => {
      const a = {
        hand: 'KK776',
        bid: 28,
      };
      const b = {
        hand: '23J32',
        bid: 765,
      };
      expect(compareHandStrengthWithJokers(a, b)).toEqual(1);
    });
    it('returns 1 when A and B are both four of a kind but B is stronger', () => {
      const b = {
        hand: 'QQQJA',
        bid: 483,
      };
      const a = {
        hand: 'JJTTK',
        bid: 220,
      };
      expect(compareHandStrengthWithJokers(a, b)).toEqual(1);
    });
    it('returns - 1 when A & B are both four of a kind but A is stronger', () => {
      const a = {
        hand: 'QQQJA',
        bid: 483,
      };
      const b = {
        hand: 'JJTTK',
        bid: 220,
      };
      expect(compareHandStrengthWithJokers(a, b)).toEqual(-1);
    });
    it('returns -1 when A is three of a kind and B is two pair', () => {
      const a = {
        hand: 'QQDJA',
        bid: 483,
      };
      const b = {
        hand: 'KK677',
        bid: 28,
      };
      expect(compareHandStrengthWithJokers(a, b)).toEqual(-1);
    });
    it('returns 0 when A and B are identical', () => {
      const a = {
        hand: 'T55J5',
        bid: 684,
      };
      const b = {
        hand: 'T55J5',
        bid: 684,
      };
      expect(compareHandStrengthWithJokers(a, b)).toEqual(0);
    });
  });
  describe('partTwo', () => {
    it('Sum winnings with Jokers', async () => {
      const actual = await partTwo(mockData);
      expect(actual).toEqual(5905);
    });
  });
});
