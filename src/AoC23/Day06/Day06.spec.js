const {
  formatData,
  getButtonHeldFromDistance,
  getNumDiffWaysToWin,
  partOne,
  partTwo,
} = require('./Day06');

// npm test -- src/AoC23/Day06/Day06.spec.js

describe('Day06', () => {
  const formattedData = [
    {
      time: 7,
      recordDist: 9,
    },
    {
      time: 15,
      recordDist: 40,
    },
    {
      time: 30,
      recordDist: 200,
    },
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day06TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(formattedData);
    });
  });
  describe('getButtonHeldFromDistance', () => {
    it('button held for 0 or 7 milSec to travel 0 milMtr in 7 milSec race', () => {
      expect(getButtonHeldFromDistance(7, 0)).toEqual([0, 7]);
    });
    it('button held for 1 or 6 milSec to travel 1 milMtr in 7 milSec race', () => {
      expect(getButtonHeldFromDistance(7, 6)).toEqual([1, 6]);
    });
    it('button held for 2 or 5 milSec to travel 10 milMtr in 7 milSec race', () => {
      expect(getButtonHeldFromDistance(7, 10)).toEqual([2, 5]);
    });
    it('button held for 3 or 4 milSec to travel 12 milMtr in 7 milSec race', () => {
      expect(getButtonHeldFromDistance(7, 12)).toEqual([3, 4]);
    });
  });
  // describe('getNumDiffWaysToWin', () => {
  //   it('returns 4 diff ways to win for 7 milSec race with 9 milMtr record', () => {
  //     expect(getNumDiffWaysToWin(formattedData[0])).toEqual(4);
  //   });
  //   it('returns 4 diff ways to win for 7 milSec race with 9 milMtr record', () => {
  //     expect(getNumDiffWaysToWin(formattedData[1])).toEqual(8);
  //   });
  //   it('returns 4 diff ways to win for 7 milSec race with 9 milMtr record', () => {
  //     expect(getNumDiffWaysToWin(formattedData[2])).toEqual(9);
  //   });
  // });
  describe.skip('partOne', () => {
    it('TK', async () => {
      const actual = await partOne(formattedData);
      expect(actual).toEqual(288);
    });
  });
  describe.skip('partTwo', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partTwo(args);
      expect(actual).toEqual(0);
    });
  });
});
