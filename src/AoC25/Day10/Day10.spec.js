const {
  formatData,
  fewestButtonPressesForLights,
  maskLightDiagram,
  maskButtonSchematic,
  partOne,
  generatePatterns,
  getPatternMap,
  fewestButtonPressesForJoltage,
  getMatchingPatternCombos,
  getButtonComboPatterns,
  partTwo,
} = require('./Day10');

const {
  combinationRepetitionGenerator,
  getCombinations,
} = require('../../Utils/maths.js');

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

  const patternsMachine1 = new Map([
    ['0,0,0,1', 1],
    ['0,0,1,0', 1],
    ['0,0,1,1', 1],
    ['0,0,1,2', 2],
    ['0,0,2,1', 2],
    ['0,0,2,2', 3],
    ['0,1,0,1', 1],
    ['0,1,0,2', 2],
    ['0,1,1,1', 2],
    ['0,1,1,2', 2],
    ['0,1,1,3', 3],
    ['0,1,2,2', 3],
    ['0,1,2,3', 4],
    ['1,0,1,0', 1],
    ['1,0,1,1', 2],
    ['1,0,2,0', 2],
    ['1,0,2,1', 2],
    ['1,0,2,2', 3],
    ['1,0,3,1', 3],
    ['1,0,3,2', 4],
    ['1,1,0,0', 1],
    ['1,1,0,1', 2],
    ['1,1,1,0', 2],
    ['1,1,1,1', 2],
    ['1,1,1,2', 3],
    ['1,1,2,1', 3],
    ['1,1,2,2', 3],
    ['1,1,2,3', 4],
    ['1,1,3,2', 4],
    ['1,1,3,3', 5],
    ['1,2,0,1', 2],
    ['1,2,0,2', 3],
    ['1,2,1,1', 3],
    ['1,2,1,2', 3],
    ['1,2,1,3', 4],
    ['1,2,2,2', 4],
    ['1,2,2,3', 5],
    ['2,1,1,0', 2],
    ['2,1,1,1', 3],
    ['2,1,2,0', 3],
    ['2,1,2,1', 3],
    ['2,1,2,2', 4],
    ['2,1,3,1', 4],
    ['2,1,3,2', 5],
    ['2,2,1,1', 3],
    ['2,2,1,2', 4],
    ['2,2,2,1', 4],
    ['2,2,2,2', 4],
    ['2,2,2,3', 5],
    ['2,2,3,2', 5],
    ['2,2,3,3', 6],
  ]);

  const patternsMachine2 = new Map([
    ['1,0,1,1,1', 1],
    ['0,0,1,1,0', 1],
    ['1,0,2,2,1', 2],
    ['1,0,0,0,1', 1],
    ['2,0,1,1,2', 2],
    ['2,0,2,2,2', 3],
    ['1,1,1,0,0', 1],
    ['2,1,2,1,1', 2],
    ['1,1,2,1,0', 2],
    ['2,1,3,2,1', 3],
    ['2,1,1,0,1', 2],
    ['3,1,2,1,2', 3],
    ['3,1,3,2,2', 4],
    ['0,1,1,1,1', 1],
    ['1,1,2,2,2', 2],
    ['0,1,2,2,1', 2],
    ['1,1,3,3,2', 3],
    ['1,1,1,1,2', 2],
    ['2,1,2,2,3', 3],
    ['2,1,3,3,3', 4],
    ['1,2,2,1,1', 2],
    ['2,2,3,2,2', 3],
    ['1,2,3,2,1', 3],
    ['2,2,4,3,2', 4],
    ['2,2,2,1,2', 3],
    ['3,2,3,2,3', 4],
    ['3,2,4,3,3', 5],
  ]);
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
  describe('generatePatterns', () => {
    it('returns all patterns for length 3', () => {
      expect(generatePatterns(3)).toEqual([
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1],
        [1, 1, 1],
      ]);
    });
  });
  describe('getButtonComboPatterns', () => {
    it('returns unique combo results for 3 buttons', () => {
      const actual = getButtonComboPatterns(3, [
        [0, 1],
        [0, 2],
        [1, 2],
      ]);

      expect(actual).toEqual(
        new Map([
          ['0,1,1', 1], // (1,2) x 1
          ['0,2,2', 2], // (1,2) x 2
          ['0,3,3', 3], // (1,2) x 3
          ['1,0,1', 1], // (0,2) x 1
          ['1,1,0', 1], // (0,1) x 1
          ['1,1,2', 2], // (1,2) x 1 (0,2) x 1
          ['1,2,1', 2], // (1,2) x 1 (0,1) x 1
          ['1,2,3', 3], // (1,2) x 2 (0,1) x 1
          ['1,3,2', 3], // (1,2) x 2 (0,2) x 1
          ['2,0,2', 2], // (0,2) x 2
          ['2,1,1', 2], // (0,1) x 1 (0,2) x 1
          ['2,1,3', 3], // (1,2) x 1 (0,2) x 2
          ['2,2,0', 2], // (0,1) x 2
          ['2,2,2', 3], // (1,2) x 1 (0,2) x 1 (0,1) x 1
          ['2,3,1', 3], // (1,2) x 1 (0,1) x 2
          ['3,0,3', 3], // (0,2) x 3
          ['3,1,2', 3], // (0,2) x 2 (0,1) x 1
          ['3,2,1', 3], // (0,1) x 2 (0,2) x 1
          ['3,3,0', 3], // (0,1) x 3
        ])
      );
    });

    it('handles combos with different lengths', () => {
      const actual = getButtonComboPatterns(4, [
        [1, 3],
        [0, 2, 3],
      ]);
      expect(actual).toEqual(
        new Map([
          ['0,1,0,1', 1],
          ['1,0,1,1', 1],
          ['0,2,0,2', 2],
          ['2,0,2,2', 2],
          ['1,1,1,2', 2],
        ])
      );
    });
  });
  describe('getPatternMap', () => {
    it('maps combos to patterns for length 3', () => {
      const expected = new Map([
        [
          '0,0,0',
          [
            ['2,2,0', 2],
            ['2,0,2', 2],
            ['0,2,2', 2],
            ['2,2,2', 3],
          ],
        ],
        ['1,0,0', []],
        ['0,1,0', []],
        [
          '1,1,0',
          [
            ['1,1,0', 1],
            ['1,1,2', 2],
            ['3,3,0', 3],
            ['3,1,2', 3],
            ['1,3,2', 3],
          ],
        ],
        ['0,0,1', []],
        [
          '1,0,1',
          [
            ['1,0,1', 1],
            ['1,2,1', 2],
            ['3,2,1', 3],
            ['3,0,3', 3],
            ['1,2,3', 3],
          ],
        ],
        [
          '0,1,1',
          [
            ['0,1,1', 1],
            ['2,1,1', 2],
            ['2,3,1', 3],
            ['2,1,3', 3],
            ['0,3,3', 3],
          ],
        ],
        ['1,1,1', []],
      ]);
      const actual = getPatternMap(3, [
        [0, 1],
        [0, 2],
        [1, 2],
      ]);

      expect(actual).toEqual(expected);
    });
  });
  describe('getMatchingPatternCombos', () => {
    it('returns all combos for {3, 5, 4, 7}', () => {
      const actual = getMatchingPatternCombos(
        mockInput[0].joltageRequirement,
        getPatternMap(
          mockInput[0].joltageRequirement.length,
          mockInput[0].buttonSchematics
        )
      );

      expect(actual).toEqual(
        new Map([
          ['1,1,0,1', 2],
          ['1,1,0,3', 4],
          ['1,1,0,5', 6],
          ['1,1,2,1', 3],
          ['1,1,2,3', 4],
          ['1,1,2,5', 6],
          ['1,1,4,1', 5],
          ['1,1,4,3', 5],
          ['1,1,4,5', 6],
          ['1,3,0,3', 4],
          ['1,3,0,5', 6],
          ['1,3,2,3', 5],
          ['1,3,2,5', 6],
          ['1,5,0,5', 6],
          ['3,1,2,1', 4],
          ['3,1,2,3', 6],
          ['3,1,4,1', 5],
          ['3,1,4,3', 6],
          ['3,3,0,1', 4],
          ['3,3,0,3', 6],
          ['3,3,2,1', 5],
          ['3,3,2,3', 6],
          ['3,5,0,3', 6],
        ])
      );
    });
    it('returns all combos for {3, 2, 5, 3, 1}', () => {
      const actual = getMatchingPatternCombos(
        [3, 2, 5, 3, 1],
        getPatternMap(
          mockInput[1].joltageRequirement.length,
          mockInput[1].buttonSchematics
        )
      );

      expect(actual).toEqual(
        new Map([
          ['1,0,1,1,1', 1],
          ['1,0,3,3,1', 3],
          ['3,2,3,1,1', 3],
          ['3,2,5,3,1', 5],
        ])
      );
    });
    it('returns empty array for impossible combos', () => {
      const combinations = new Map([
        [
          '0,0,0',
          [
            ['2,2,0', 2],
            ['2,0,2', 2],
            ['0,2,2', 2],
            ['2,2,2', 3],
          ],
        ],
        ['1,0,0', []],
        ['0,1,0', []],
        [
          '1,1,0',
          [
            ['1,1,0', 1],
            ['1,1,2', 2],
            ['3,3,0', 3],
            ['3,1,2', 3],
            ['1,3,2', 3],
          ],
        ],
        ['0,0,1', []],
        [
          '1,0,1',
          [
            ['1,0,1', 1],
            ['1,2,1', 2],
            ['3,2,1', 3],
            ['3,0,3', 3],
            ['1,2,3', 3],
          ],
        ],
        [
          '0,1,1',
          [
            ['0,1,1', 1],
            ['2,1,1', 2],
            ['2,3,1', 3],
            ['2,1,3', 3],
            ['0,3,3', 3],
          ],
        ],
        ['1,1,1', []],
      ]);

      const actual = getMatchingPatternCombos([1, 1, 1], combinations);

      expect(actual).toEqual(new Map());
    });
    it('returns 4 possible combos for 2, 2, 2', () => {
      const combinations = new Map([
        [
          '0,0,0',
          [
            ['2,2,0', 2],
            ['2,0,2', 2],
            ['0,2,2', 2],
            ['2,2,2', 3],
          ],
        ],
        ['1,0,0', []],
        ['0,1,0', []],
        [
          '1,1,0',
          [
            ['1,1,0', 1],
            ['1,1,2', 2],
            ['3,3,0', 3],
            ['3,1,2', 3],
            ['1,3,2', 3],
          ],
        ],
        ['0,0,1', []],
        [
          '1,0,1',
          [
            ['1,0,1', 1],
            ['1,2,1', 2],
            ['3,2,1', 3],
            ['3,0,3', 3],
            ['1,2,3', 3],
          ],
        ],
        [
          '0,1,1',
          [
            ['0,1,1', 1],
            ['2,1,1', 2],
            ['2,3,1', 3],
            ['2,1,3', 3],
            ['0,3,3', 3],
          ],
        ],
        ['1,1,1', []],
      ]);

      const actual = getMatchingPatternCombos([2, 2, 2], combinations);

      expect(actual).toEqual(
        new Map([
          ['0,2,2', 2],
          ['2,0,2', 2],
          ['2,2,0', 2],
          ['2,2,2', 3],
        ])
      );
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
    it('returns 3 for {2,2,2}', () => {
      const joltageReq = [2, 2, 2];
      const buttons = [
        [0, 1],
        [0, 2],
        [1, 2],
      ];
      const actual = fewestButtonPressesForJoltage(joltageReq, buttons);
      expect(actual).toEqual(3);
    });
    it('returns 9 for {6,0,6,6}', () => {
      const joltageReq = [6, 0, 6, 6];
      const buttons = [
        [1, 3],
        [0, 2, 3],
      ];
      const actual = fewestButtonPressesForJoltage(joltageReq, buttons);
      expect(actual).toEqual(6);
    });
  });
  describe('partTwo', () => {
    it('returns the fewest button presses required to correctly configure the joltage level counters on all of the machines', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(33);
    });
  });
});
