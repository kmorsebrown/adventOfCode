const {
  formatData,
  sortingMap,
  sortUpdate,
  getCorrectlyOrderedUpdates,
  getSumMiddleValues,
  partOne,
  reorderIncorrectlyOrderedUpdates,
  partTwo,
} = require('./Day05');

// npm test -- src/AoC24/Day05/Day05.spec.js

describe('Day05', () => {
  const mockInput = {
    ordering_rules: [
      [47, 53],
      [97, 13],
      [97, 61],
      [97, 47],
      [75, 29],
      [61, 13],
      [75, 53],
      [29, 13],
      [97, 29],
      [53, 29],
      [61, 53],
      [97, 53],
      [61, 29],
      [47, 13],
      [75, 47],
      [97, 75],
      [47, 61],
      [75, 61],
      [47, 29],
      [75, 13],
      [53, 13],
    ],
    updates: [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ],
  };

  const mockOrderMap = new Map([
    [47, [53, 13, 61, 29]],
    [53, [29, 13]],
    [97, [13, 61, 47, 29, 53, 75]],
    [13, []],
    [61, [13, 53, 29]],
    [75, [29, 53, 47, 61, 13]],
    [29, [13]],
  ]);
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day05TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('sortingMap', () => {
    it('generates a map of all pages', () => {
      const args = mockInput.ordering_rules;
      expect(sortingMap(args)).toEqual(mockOrderMap);
    });
  });
  describe('sortUpdate', () => {
    it('sorts an array of updates that are in the correct order', () => {
      const mockUpdate = [75, 47, 61, 53, 29];
      const actual = sortUpdate(mockUpdate, mockOrderMap);
      expect(actual).toEqual(mockUpdate);
    });
    it('sorts an array of updates that are not in the correct order', () => {
      const mockUpdate = [61, 13, 29];
      const actual = sortUpdate(mockUpdate, mockOrderMap);
      expect(actual).toEqual([61, 29, 13]);
    });
  });
  describe('getCorrectlyOrderedUpdates', () => {
    it('gets the updates that are in the correct order', () => {
      const actual = getCorrectlyOrderedUpdates(
        mockInput.updates,
        mockOrderMap
      );
      expect(actual).toEqual([
        [75, 47, 61, 53, 29],
        [97, 61, 53, 29, 13],
        [75, 29, 13],
      ]);
    });
  });
  describe('getSumMiddleValues', () => {
    it('gets sum of all middle pages', () => {
      const mockUpdates = [
        [75, 47, 61, 53, 29],
        [97, 61, 53, 29, 13],
        [75, 29, 13],
      ];
      expect(getSumMiddleValues(mockUpdates)).toEqual(143);
    });
  });
  describe('partOne', () => {
    it('Gets the sum of the middle pages of all correctly ordered updates', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(143);
    });
  });
  describe('reorderIncorrectlyOrderedUpdates', () => {
    it('Sorts all incorrectly ordered updates', () => {
      const actual = reorderIncorrectlyOrderedUpdates(
        mockInput.updates,
        mockOrderMap
      );
      expect(actual).toEqual([
        [97, 75, 47, 61, 53],
        [61, 29, 13],
        [97, 75, 47, 29, 13],
      ]);
    });
  });
  describe('partTwo', () => {
    it('Gets the sum of the middle pages of all reordered updates', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(123);
    });
  });
});
