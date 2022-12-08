const path = require('path');
const {
  formatData,
  getSumFiles,
  getLowestLevelDirs,
  getParentDirs,
  getChildDirTotal,
  getCompletedDirs,
  getDirTotals,
  partOne,
  getTopLevelDrSize,
  getUnusedSpace,
  partTwo,
} = require('./Day07.js');

// npm test src/AoC22/Day07/Day07.spec.js

const testDataMapA = new Map([
  [
    '/',
    {
      parentDir: '',
      files: { 'b.txt': 14848514, 'c.dat': 8504156 },
      dirs: ['/a', '/d'],
    },
  ],
  [
    '/a',
    {
      parentDir: '/',
      files: { f: 29116, g: 2557, 'h.lst': 62596 },
      dirs: ['/a/e'],
    },
  ],
  ['/a/e', { parentDir: '/a', files: { i: 584 }, dirs: [] }],
  [
    '/d',
    {
      parentDir: '/',
      files: {
        j: 4060174,
        'd.log': 8033020,
        'd.ext': 5626152,
        k: 7214296,
      },
      dirs: [],
    },
  ],
]);

const testDataMapB = new Map([
  [
    '/',
    {
      parentDir: '',
      files: { 'b.txt': 14848514, 'c.dat': 8504156 },
      dirs: ['/a', '/d'],
      sizeFilesOnly: 23352670,
    },
  ],
  [
    '/a',
    {
      parentDir: '/',
      files: { f: 29116, g: 2557, 'h.lst': 62596 },
      dirs: ['/a/e'],
      sizeFilesOnly: 94269,
    },
  ],
  [
    '/a/e',
    {
      parentDir: '/a',
      files: { i: 584 },
      dirs: [],
      sizeFilesOnly: 584,
      totalSize: 584,
    },
  ],
  [
    '/d',
    {
      parentDir: '/',
      files: {
        j: 4060174,
        'd.log': 8033020,
        'd.ext': 5626152,
        k: 7214296,
      },
      dirs: [],
      sizeFilesOnly: 24933642,
      totalSize: 24933642,
    },
  ],
]);

const testDataMapC = new Map([
  [
    '/',
    {
      parentDir: '',
      files: { 'b.txt': 14848514, 'c.dat': 8504156 },
      dirs: ['/a', '/d'],
      sizeFilesOnly: 23352670,
      totalSize: 48381165,
    },
  ],
  [
    '/a',
    {
      parentDir: '/',
      files: { f: 29116, g: 2557, 'h.lst': 62596 },
      dirs: ['/a/e'],
      sizeFilesOnly: 94269,
      totalSize: 94853,
    },
  ],
  [
    '/a/e',
    {
      parentDir: '/a',
      files: { i: 584 },
      dirs: [],
      sizeFilesOnly: 584,
      totalSize: 584,
    },
  ],
  [
    '/d',
    {
      parentDir: '/',
      files: {
        j: 4060174,
        'd.log': 8033020,
        'd.ext': 5626152,
        k: 7214296,
      },
      dirs: [],
      sizeFilesOnly: 24933642,
      totalSize: 24933642,
    },
  ],
]);

describe('Day07', () => {
  describe('formatData', () => {
    it('Formats the data into a map', async () => {
      const args = path.join(__dirname, 'Day07TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(testDataMapA);
    });
  });
  describe('getSumFiles', () => {
    it('Gets the sum of all the files in the directory, excluding any sub-directories', async () => {
      const args = new Map(
        JSON.parse(JSON.stringify(Array.from(testDataMapA)))
      );
      args.forEach(getSumFiles);
      const actual = [
        args.get('/a/e').sizeFilesOnly,
        args.get('/d').sizeFilesOnly,
      ];
      expect(actual).toEqual([584, 24933642]);
    });
  });
  describe('getLowestLevelDirs', () => {
    it('Returns array of keys with values containing empty dirs arrays', () => {
      const args = testDataMapA;
      const actual = getLowestLevelDirs(args);
      expect(actual).toEqual(['/a/e', '/d']);
    });
  });
  describe('getParentDirs', () => {
    it('Returns array of keys with dirs arrays containing the input array', () => {
      const actual = getParentDirs(testDataMapA, ['/a/e', '/d']);
      expect(actual).toEqual(['/a', '/']);
    });
  });
  describe('getChildDirTotal', () => {
    it('get total size of child directories', async () => {
      const actual = await getChildDirTotal(testDataMapB, '/a');
      expect(actual).toEqual(584);
    });
    it('returns undefined if not all child directories have totals yet', async () => {
      const actual = await getChildDirTotal(testDataMapB, '/');
      expect(actual).toBeUndefined();
    });
  });
  describe('getCompletedDirs', () => {
    it('Returns array of dirNames that have their total size calculated', async () => {
      const args = testDataMapB;
      const actual = await getCompletedDirs(args);
      expect(actual).toEqual(['/a/e', '/d']);
    });
  });
  describe('getDirTotals', () => {
    it('Gets the sum of all the files in the directory, including any sub-directories', async () => {
      const args = new Map(
        JSON.parse(JSON.stringify(Array.from(testDataMapB)))
      );
      const actual = await getDirTotals(args);
      expect(actual).toEqual(testDataMapC);
    });
  });
  describe('partOne', () => {
    it('Gets sum of all directories with a total size of < 1000', async () => {
      const args = testDataMapC;
      const actual = await partOne(args);
      expect(actual).toEqual(95437);
    });
  });
  describe('getTopLevelDrSize', () => {
    it('returns the total size of the top level directory', async () => {
      const args = testDataMapC;
      const actual = await getTopLevelDrSize(args);
      expect(actual).toEqual(48381165);
    });
  });
  describe('getUnusedSpace', () => {
    it('Returns amount of unused space in the filesystem given used space', async () => {
      const args = 48381165;
      const actual = await getUnusedSpace(testDataMapC, args);
      expect(actual).toEqual(21618835);
    });
  });
  describe('partTwo', () => {
    it('Returns total size of smallest dir that can be deleted to free up enough space', async () => {
      const args = testDataMapC;
      const actual = await partTwo(args);
      expect(actual).toEqual(24933642);
    });
  });
});
