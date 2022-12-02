const path = require('path');
const {
  formatData,
  getPositionMultiplier,
  getPositionMultiplierWithAim,
} = require('./Day02.js');

describe('Day02', () => {
  describe('formatData', () => {
    it('Formats the data into an array of objects', async () => {
      const args = path.join(__dirname, 'Day02TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        { direction: 'forward', unitsMoved: 5 },
        { direction: 'down', unitsMoved: 5 },
        { direction: 'forward', unitsMoved: 8 },
        { direction: 'up', unitsMoved: 3 },
        { direction: 'down', unitsMoved: 8 },
        { direction: 'forward', unitsMoved: 2 },
      ]);
    });
  });
  describe('getPositionMultiplier', () => {
    it('Calculates horizontal position and depth after planned course', async () => {
      const args = [
        { direction: 'forward', unitsMoved: 5 },
        { direction: 'down', unitsMoved: 5 },
        { direction: 'forward', unitsMoved: 8 },
        { direction: 'up', unitsMoved: 3 },
        { direction: 'down', unitsMoved: 8 },
        { direction: 'forward', unitsMoved: 2 },
      ];
      const actual = await getPositionMultiplier(args);
      expect(actual).toEqual(150);
    });
  });
  describe('getPositionMultiplierWithAim', () => {
    it('Calculates horizontal position and depth after planned course', async () => {
      const args = [
        { direction: 'forward', unitsMoved: 5 },
        { direction: 'down', unitsMoved: 5 },
        { direction: 'forward', unitsMoved: 8 },
        { direction: 'up', unitsMoved: 3 },
        { direction: 'down', unitsMoved: 8 },
        { direction: 'forward', unitsMoved: 2 },
      ];
      const actual = await getPositionMultiplierWithAim(args);
      expect(actual).toEqual(900);
    });
  });
});
