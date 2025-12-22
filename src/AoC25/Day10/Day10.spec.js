const {
  formatData,
  fewestButtonPressesForLights,
  maskLightDiagram,
  maskButtonSchematic,
  partOne,
  buttonMap,
  sortJoltageByIndex,
  processCombos,
  fewestButtonPressesForJoltage,
  partTwo,
} = require('./Day10');

// npm test -- src/AoC25/Day10/Day10.spec.js

describe('Day10', () => {
  const mockInput = [
    {
      lightDiagram: ['.', '#', '#', '.'],
      buttonSchematics: [[3], [1, 3], [2], [2, 3], [0, 2], [0, 1]],
      joltageRequirement: [3, 5, 4, 7],
    },
    {
      lightDiagram: ['.', '.', '.', '#', '.'],
      buttonSchematics: [
        [0, 2, 3, 4],
        [2, 3],
        [0, 4],
        [0, 1, 2],
        [1, 2, 3, 4],
      ],
      joltageRequirement: [7, 5, 12, 7, 2],
    },
    {
      lightDiagram: ['.', '#', '#', '#', '.', '#'],
      buttonSchematics: [
        [0, 1, 2, 3, 4],
        [0, 3, 4],
        [0, 1, 2, 4, 5],
        [1, 2],
      ],
      joltageRequirement: [10, 11, 11, 5, 10, 5],
    },
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day10TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('maskLightDiagram', () => {
    it('masks machine 1 diagram', () => {
      const actual = maskLightDiagram(mockInput[0].lightDiagram);
      expect(
        actual.toString(2).padStart(mockInput[0].lightDiagram.length, '0')
      ).toEqual('0110');
    });
    it('masks machine 2 diagram', () => {
      const actual = maskLightDiagram(mockInput[1].lightDiagram);
      expect(
        actual.toString(2).padStart(mockInput[1].lightDiagram.length, '0')
      ).toEqual('01000');
    });
    it('masks machine 3 diagram', () => {
      const actual = maskLightDiagram(mockInput[2].lightDiagram);
      expect(
        actual.toString(2).padStart(mockInput[2].lightDiagram.length, '0')
      ).toEqual('101110');
    });
  });
  describe('maskButtonSchematic', () => {
    it('masks machine 1 button 1', () => {
      const actual = maskButtonSchematic(mockInput[0].buttonSchematics[0]);
      expect(
        actual.toString(2).padStart(mockInput[0].lightDiagram.length, '0')
      ).toEqual('1000');
    });
    it('masks machine 1 button 2', () => {
      const actual = maskButtonSchematic(mockInput[0].buttonSchematics[1]);
      expect(
        actual.toString(2).padStart(mockInput[0].lightDiagram.length, '0')
      ).toEqual('1010');
    });
    it('masks machine 1 button 5', () => {
      const actual = maskButtonSchematic(mockInput[0].buttonSchematics[4]);
      expect(
        actual.toString(2).padStart(mockInput[0].lightDiagram.length, '0')
      ).toEqual('0101');
    });
  });
  describe('fewestButtonPressesForLights', () => {
    it('returns 2 for the first machine', () => {
      const actual = fewestButtonPressesForLights(
        mockInput[0].lightDiagram,
        mockInput[0].buttonSchematics
      );
      expect(actual).toEqual(2);
    });
    it('returns 3 for the second machine', () => {
      const actual = fewestButtonPressesForLights(
        mockInput[1].lightDiagram,
        mockInput[1].buttonSchematics
      );
      expect(actual).toEqual(3);
    });
    it('returns 2 for the third machine', () => {
      const actual = fewestButtonPressesForLights(
        mockInput[2].lightDiagram,
        mockInput[2].buttonSchematics
      );
      expect(actual).toEqual(2);
    });
  });
  describe('partOne', () => {
    it('Returns the fewest button presses required to correctly configure the indicator lights on all of the machines', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(7);
    });
  });
  describe('buttonMap', () => {
    it('returns a button map for machine 1', () => {
      const actual = buttonMap(
        mockInput[0].buttonSchematics,
        mockInput[0].joltageRequirement
      );
      const expected = new Map([
        [
          0,
          [
            [0, 2],
            [0, 1],
          ],
        ],
        [
          1,
          [
            [1, 3],
            [0, 1],
          ],
        ],
        [2, [[2], [2, 3], [0, 2]]],
        [3, [[3], [1, 3], [2, 3]]],
      ]);
      expect(actual).toEqual(expected);
    });
    it('returns a button map for machine 2', () => {
      const actual = buttonMap(
        mockInput[1].buttonSchematics,
        mockInput[1].joltageRequirement
      );
      const expected = new Map([
        [
          0,
          [
            [0, 2, 3, 4],
            [0, 4],
            [0, 1, 2],
          ],
        ],
        [
          1,
          [
            [0, 1, 2],
            [1, 2, 3, 4],
          ],
        ],
        [
          2,
          [
            [0, 2, 3, 4],
            [2, 3],
            [0, 1, 2],
            [1, 2, 3, 4],
          ],
        ],
        [
          3,
          [
            [0, 2, 3, 4],
            [2, 3],
            [1, 2, 3, 4],
          ],
        ],
        [
          4,
          [
            [0, 2, 3, 4],
            [0, 4],
            [1, 2, 3, 4],
          ],
        ],
      ]);
      expect(actual).toEqual(expected);
    });
  });
  describe('sortJoltageByIndex', () => {
    it('returns the indexes for machine 1 in ascending order by value', () => {
      const actual = sortJoltageByIndex(mockInput[0].joltageRequirement);
      expect(actual).toEqual([0, 2, 1, 3]);
    });
    it('returns the indexes for machine 2 in ascending order by value', () => {
      const actual = sortJoltageByIndex(mockInput[1].joltageRequirement);
      expect(actual).toEqual([4, 1, 0, 3, 2]);
    });
    it('returns the indexes for machine 3 in ascending order by value', () => {
      const actual = sortJoltageByIndex(mockInput[2].joltageRequirement);
      expect(actual).toEqual([3, 5, 0, 4, 1, 2]);
    });
  });
  describe('processCombos', () => {
    it('Processes combos for lowest joltage for machine 1', () => {
      const actual = processCombos([0, 0, 0, 0], 0, 3, [
        [0, 2],
        [0, 1],
      ]);

      const expected = [
        {
          state: [3, 0, 3, 0],
          numButtonPresses: 3,
        },
        {
          state: [3, 1, 2, 0],
          numButtonPresses: 3,
        },
        {
          state: [3, 2, 1, 0],
          numButtonPresses: 3,
        },
        {
          state: [3, 3, 0, 0],
          numButtonPresses: 3,
        },
      ];
      expect(actual).toEqual(expected);
    });
  });
  describe('fewestButtonPressesForJoltage', () => {
    it('returns 10 for the first machine', () => {
      const actual = fewestButtonPressesForJoltage(
        mockInput[0].joltageRequirement,
        mockInput[0].buttonSchematics
      );
      expect(actual).toEqual(10);
    });
    it('returns 12 for the second machine', () => {
      const actual = fewestButtonPressesForJoltage(
        mockInput[1].joltageRequirement,
        mockInput[1].buttonSchematics
      );
      expect(actual).toEqual(12);
    });
    it('returns 11 for the third machine', () => {
      const actual = fewestButtonPressesForJoltage(
        mockInput[2].joltageRequirement,
        mockInput[2].buttonSchematics
      );
      expect(actual).toEqual(33);
    });
  });
  describe('partTwo', () => {
    it('returns the fewest button presses required to correctly configure the joltage level counters on all of the machines', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(33);
    });
  });
});
