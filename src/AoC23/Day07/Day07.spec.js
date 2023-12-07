const {
  formatData,
  getHandType,
  compareHandStrengthPartOne,
  partOne,
  partTwo,
} = require('./Day07');

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
      const args = require.resolve('./Day07TestData.txt');
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
  describe.skip('partTwo', () => {
    it('Sum winnings with Jokers', async () => {
      const actual = await partTwo(mockData);
      expect(actual).toEqual(5905);
    });
  });
});
