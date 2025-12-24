const {
  formatData,
  fewestButtonPressesForLights,
  maskLightDiagram,
  maskButtonSchematic,
  partOne,
  getButtonMap,
  mapJoltageMaximums,
  joltageTargetExceeded,
  joltageTargetMet,
  fewestButtonPressesForJoltage,
  getButtonsToPress,
  comparator,
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
  describe('getButtonMap', () => {
    it('returns a button map for machine 1', () => {
      const actual = getButtonMap(
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
      const actual = getButtonMap(
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
  describe('mapJoltageMaximums', () => {
    it('returns the a map of machine 1 joltage index/value pairs in ascending order by value', () => {
      const actual = mapJoltageMaximums(mockInput[0].joltageRequirement);
      expect(actual).toEqual(
        new Map([
          [0, 3],
          [2, 4],
          [1, 5],
          [3, 7],
        ])
      );
    });
    it('returns the a map of machine 2 joltage index/value pairs in ascending order by value', () => {
      const actual = mapJoltageMaximums(mockInput[1].joltageRequirement);
      expect(actual).toEqual(
        new Map([
          [4, 2],
          [1, 5],
          [0, 7],
          [3, 7],
          [2, 12],
        ])
      );
    });
    it('returns the a map of machine 3 joltage index/value pairs in ascending order by value', () => {
      const actual = mapJoltageMaximums(mockInput[2].joltageRequirement);
      expect(actual).toEqual(
        new Map([
          [3, 5],
          [5, 5],
          [0, 10],
          [4, 10],
          [1, 11],
          [2, 11],
        ])
      );
    });
  });
  describe('getButtonsToPress', () => {
    it('returns the index of the lowest element in state not yet at max', () => {
      const buttonMap = new Map([
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
      const maxJoltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      const state = [3, 0, 3, 0]; // max [3, 5, 4, 7]
      const actual = getButtonsToPress(buttonMap, state, maxJoltageMap);
      expect(actual).toEqual([[2], [2, 3]]);
    });
    it('filters out buttons that can no longer be pressed', () => {
      const buttonMap = new Map([
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
      const maxJoltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      const state = [3, 5, 4, 5]; // max [3, 5, 4, 7]
      const actual = getButtonsToPress(buttonMap, state, maxJoltageMap);
      expect(actual).toEqual([[3]]);
    });
  });
  describe('joltageTargetExceeded', () => {
    it('returns true if any index has exceeded the corresponding target value', () => {
      let joltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      let invalidState = [3, 7, 4, 0];
      const actual = joltageTargetExceeded(joltageMap, invalidState);
      expect(actual).toEqual(true);
    });
    it('returns false if all indexes are lower than the corresponding target value', () => {
      let joltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      let validState = [3, 2, 4, 0];
      const actual = joltageTargetExceeded(joltageMap, validState);
      expect(actual).toEqual(false);
    });
    it('returns false if all indexes are equal to the corresponding target value', () => {
      let joltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      let validState = [3, 5, 4, 7];
      const actual = joltageTargetExceeded(joltageMap, validState);
      expect(actual).toEqual(false);
    });
  });
  describe('joltageTargetMet', () => {
    it('returns false if any index has exceeded the corresponding target value', () => {
      let joltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      let invalidState = [3, 7, 4, 0];
      const actual = joltageTargetMet(joltageMap, invalidState);
      expect(actual).toEqual(false);
    });
    it('returns false if all indexes are lower than the corresponding target value', () => {
      let joltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      let validState = [3, 2, 4, 0];
      const actual = joltageTargetMet(joltageMap, validState);
      expect(actual).toEqual(false);
    });
    it('returns true if all indexes are equal to the corresponding target value', () => {
      let joltageMap = new Map([
        [0, 3],
        [2, 4],
        [1, 5],
        [3, 7],
      ]);
      let validState = [3, 5, 4, 7];
      const actual = joltageTargetMet(joltageMap, validState);
      expect(actual).toEqual(true);
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
      expect(actual).toEqual(11);
    });
  });
  describe('comparator', () => {
    it('returns false when b has fewer button presses than a', () => {
      const a = {
        numButtonPresses: 3,
        state: [3, 2, 1, 0],
      };

      const b = {
        numButtonPresses: 2,
        state: [2, 1, 1, 0],
      };
      const actual = comparator(a, b);
      expect(actual).toEqual(false);
    });

    it('returns true when a has fewer button presses than b', () => {
      const a = {
        numButtonPresses: 2,
        state: [2, 1, 1, 0],
      };

      const b = {
        numButtonPresses: 3,
        state: [3, 2, 1, 0],
      };

      const actual = comparator(a, b);
      expect(actual).toEqual(true);
    });

    it('returns false when a and b have the same button presses, and b is closer to target than a', () => {
      const a = {
        numButtonPresses: 6,
        state: [3, 2, 4, 0],
      };

      const b = {
        numButtonPresses: 6,
        state: [3, 2, 4, 3],
      };
      const actual = comparator(a, b);
      expect(actual).toEqual(false);
    });

    it('returns true when a and b have the same button presses, and a is closer to target than b', () => {
      const a = {
        numButtonPresses: 6,
        state: [3, 2, 4, 3],
      };

      const b = {
        numButtonPresses: 6,
        state: [3, 2, 4, 0],
      };

      const actual = comparator(a, b);
      expect(actual).toEqual(true);
    });

    it('returns true when a and b have the same button presses and are equally close to the target', () => {
      const a = {
        numButtonPresses: 3,
        state: [3, 2, 1, 0],
      };

      const b = {
        numButtonPresses: 3,
        state: [3, 0, 3, 0],
      };
      const actual = comparator(a, b);
      expect(actual).toEqual(false);
    });
  });
  describe('partTwo', () => {
    it('returns the fewest button presses required to correctly configure the joltage level counters on all of the machines', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(33);
    });
  });
});
