import {
  formatData,
  generateAntennaMap,
  generateDiffsMap,
  plotAntinodes,
  plotAntinodesPt2,
  getDiffs,
  partOne,
  partTwo,
} from './Day08.js';

// npm test -- src/AoC24/Day08/Day08.spec.js

describe('Day08', () => {
  const mockInput = [
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '0', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '0', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '0', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '0', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', 'A', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', 'A', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', 'A', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ];
  const mockInputPt2 = [
    ['T', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', 'T', '.', '.', '.', '.', '.', '.'],
    ['.', 'T', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ];
  const mockAntennaMap = new Map([
    [
      '0',
      [
        { r: 1, c: 8 },
        { r: 2, c: 5 },
        { r: 3, c: 7 },
        { r: 4, c: 4 },
      ],
    ],
    [
      'A',
      [
        { r: 5, c: 6 },
        { r: 8, c: 8 },
        { r: 9, c: 9 },
      ],
    ],
  ]);
  const mockDiffsMap = new Map([
    [
      [
        { r: 1, c: 8 },
        { r: 2, c: 5 },
      ],
      { r_diff: -1, c_diff: 3 },
    ],
    [
      [
        { r: 1, c: 8 },
        { r: 3, c: 7 },
      ],
      { r_diff: -2, c_diff: 1 },
    ],
    [
      [
        { r: 1, c: 8 },
        { r: 4, c: 4 },
      ],
      { r_diff: -3, c_diff: 4 },
    ],
    [
      [
        { r: 2, c: 5 },
        { r: 3, c: 7 },
      ],
      { r_diff: -1, c_diff: -2 },
    ],
    [
      [
        { r: 2, c: 5 },
        { r: 4, c: 4 },
      ],
      { r_diff: -2, c_diff: 1 },
    ],
    [
      [
        { r: 3, c: 7 },
        { r: 4, c: 4 },
      ],
      { r_diff: -1, c_diff: 3 },
    ],
    [
      [
        { r: 5, c: 6 },
        { r: 8, c: 8 },
      ],
      { r_diff: -3, c_diff: -2 },
    ],
    [
      [
        { r: 5, c: 6 },
        { r: 9, c: 9 },
      ],
      { r_diff: -4, c_diff: -3 },
    ],
    [
      [
        { r: 8, c: 8 },
        { r: 9, c: 9 },
      ],
      { r_diff: -1, c_diff: -1 },
    ],
  ]);
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = new URL('./Day08TestData.txt', import.meta.url).pathname;
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('generateAntennaMap', () => {
    it('Generates a map of all antennas & their locations', async () => {
      const actual = generateAntennaMap(mockInput);
      expect(actual).toEqual(mockAntennaMap);
    });
  });
  describe('getDiffs', () => {
    it('sets a map of diffs between antenna locations of the same frequency', () => {
      const resultsMap = new Map();
      const actual = getDiffs(
        [
          { r: 5, c: 6 },
          { r: 8, c: 8 },
          { r: 9, c: 9 },
        ],
        resultsMap
      );
      expect(resultsMap).toEqual(
        new Map([
          [
            [
              { r: 5, c: 6 },
              { r: 8, c: 8 },
            ],
            { r_diff: -3, c_diff: -2 },
          ],
          [
            [
              { r: 5, c: 6 },
              { r: 9, c: 9 },
            ],
            { r_diff: -4, c_diff: -3 },
          ],
          [
            [
              { r: 8, c: 8 },
              { r: 9, c: 9 },
            ],
            { r_diff: -1, c_diff: -1 },
          ],
        ])
      );
    });
  });
  describe('generateDiffsMap', () => {
    it('generates a map of the diffs between all same frequency antenna locations', () => {
      const actual = generateDiffsMap(mockAntennaMap);
      expect(actual).toEqual(mockDiffsMap);
    });
  });
  describe('plotAntinodes', () => {
    it('returns set of 2 antinodes if both antinodes are in bounds', () => {
      const antinodeSet = new Set();
      plotAntinodes(
        [
          { r: 1, c: 8 },
          { r: 2, c: 5 },
        ],
        { r_diff: -1, c_diff: 3 },
        12,
        12,
        antinodeSet
      );
      expect(antinodeSet).toEqual(new Set(['{"r":0,"c":11}', '{"r":3,"c":2}']));
    });
    it('returns set of 1 antinode if only one antinode is in bounds', () => {
      const antinodeSet = new Set();

      plotAntinodes(
        [
          { r: 1, c: 8 },
          { r: 4, c: 4 },
        ],
        { r_diff: -3, c_diff: 4 },
        12,
        12,
        antinodeSet
      );
      expect(antinodeSet).toEqual(new Set(['{"r":7,"c":0}']));
    });
    it('returns an empty set if no antinodes are in bounds', () => {
      const antinodeSet = new Set();
      plotAntinodes(
        [
          { r: 1, c: 8 },
          { r: 4, c: 4 },
        ],
        { r_diff: -3, c_diff: 4 },
        7,
        9,
        antinodeSet
      );
      expect(antinodeSet).toEqual(new Set());
    });
  });
  describe('partOne', () => {
    it('returns the number of unique antinodes', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(14);
    });
  });
  describe('plotAntinodesPt2', () => {
    it('returns a set of 9 antinodes', () => {
      const antinodeSet = new Set();

      plotAntinodesPt2(
        [
          { r: 0, c: 0 },
          { r: 1, c: 3 },
        ],
        { r_diff: -1, c_diff: -3 },
        10,
        10,
        antinodeSet
      );
      expect(antinodeSet).toEqual(
        new Set([
          '{"r":0,"c":0}',
          '{"r":1,"c":3}',
          '{"r":2,"c":6}',
          '{"r":3,"c":9}',
        ])
      );
    });
  });
  describe('partTwo', () => {
    it('Returns 9 antinodes', async () => {
      const actual = await partTwo(mockInputPt2);
      expect(actual).toEqual(9);
    });
    it('Returns 34 antinodes', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(34);
    });
  });
});
