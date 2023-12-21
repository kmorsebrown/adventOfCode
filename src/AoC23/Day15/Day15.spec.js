const {
  formatData,
  runHASH,
  runHASHMAP,
  partOne,
  partTwo,
} = require('./Day15');

// npm test -- src/AoC23/Day15/Day15.spec.js

describe('Day15', () => {
  const mockData = [
    'rn=1',
    'cm-',
    'qp=3',
    'cm=2',
    'qp-',
    'pc=4',
    'ot=9',
    'ab=5',
    'pc-',
    'pc=6',
    'ot=7',
  ];
  describe('formatData', () => {
    it('Formats the data into an array of strings', async () => {
      const args = require.resolve('./Day15TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockData);
    });
  });
  describe('runHASH', () => {
    it('runs the HASH algorithm on a string', async () => {
      expect(runHASH('rn=1')).toEqual(30);
      expect(runHASH('cm-')).toEqual(253);
    });
  });
  describe('partOne', () => {
    it('Get sum of running HASH on each step of the initialization sequence', async () => {
      const actual = await partOne(mockData);
      expect(actual).toEqual(1320);
    });
  });
  describe('runHASHMAP', () => {
    it('creates box and add lens when box doesnt already exist', () => {
      const map = new Map();
      runHASHMAP(map, 'rn=1');
      expect(map).toEqual(new Map([[0, [['rn', 1]]]]));
    });
    it('does not remove lens if no lens with the given label has been put in a box yet', () => {
      const map = new Map([[0, [['rn', 1]]]]);
      runHASHMAP(map, 'cm-');
      expect(map).toEqual(new Map([[0, [['rn', 1]]]]));
    });
    it('Adding lens to box that already exists', () => {
      const map = new Map([
        [0, [['rn', 1]]],
        [1, [['qp', 3]]],
      ]);
      runHASHMAP(map, 'cm=2');
      expect(map).toEqual(
        new Map([
          [
            0,
            [
              ['rn', 1],
              ['cm', 2],
            ],
          ],
          [1, [['qp', 3]]],
        ])
      );
    });
    it('replaces lens in box that with new', () => {
      const map = new Map([
        [
          0,
          [
            ['rn', 1],
            ['cm', 2],
          ],
        ],
        [1, [['qp', 3]]],
      ]);
      runHASHMAP(map, 'cm=5');
      expect(map.get(0)).toEqual([
        ['rn', 1],
        ['cm', 5],
      ]);
    });
    it('Removes lens from box with only one lens', () => {
      const map = new Map([
        [
          0,
          [
            ['rn', 1],
            ['cm', 2],
          ],
        ],
        [1, [['qp', 3]]],
      ]);
      runHASHMAP(map, 'qp-');
      expect(map).toEqual(
        new Map([
          [
            0,
            [
              ['rn', 1],
              ['cm', 2],
            ],
          ],
          [1, []],
        ])
      );
    });
    it('Removes lens from box with multiple lenses', () => {
      const map = new Map([
        [
          0,
          [
            ['rn', 1],
            ['cm', 2],
          ],
        ],
        [
          3,
          [
            ['pc', 4],
            ['ot', 9],
            ['ab', 5],
          ],
        ],
      ]);
      runHASHMAP(map, 'pc-');
      expect(map).toEqual(
        new Map([
          [
            0,
            [
              ['rn', 1],
              ['cm', 2],
            ],
          ],
          [
            3,
            [
              ['ot', 9],
              ['ab', 5],
            ],
          ],
        ])
      );
    });
  });
  describe('partTwo', () => {
    it('get focusing power', async () => {
      const actual = await partTwo(mockData);
      expect(actual).toEqual(145);
    });
  });
});
