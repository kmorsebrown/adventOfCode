const {
  getMap,
  getMoves,
  processMoves,
  moveRobot,
  getGPSCoords,
  partOne,
  partTwo,
} = require('./Day15');

// npm test -- src/AoC24/Day15/Day15.spec.js

describe('Day15', () => {
  const mockMapSmall = [
    '########',
    '#..O.O.#',
    '##@.O..#',
    '#...O..#',
    '#.#.O..#',
    '#...O..#',
    '#......#',
    '########',
  ];
  const mockMovesSmall = '<^^>>>vv<v>>v<<';

  const mockMapLarge = [
    '##########',
    '#..O..O.O#',
    '#......O.#',
    '#.OO..O.O#',
    '#..O@..O.#',
    '#O#..O...#',
    '#O..O..O.#',
    '#.OO.O.OO#',
    '#....O...#',
    '##########',
  ];
  const mockMovesLarge = `<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

  describe('getMap', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day15TestData.txt');
      const actual = await getMap(args);
      expect(actual).toEqual(mockMapLarge);
    });
  });
  describe('getMoves', () => {
    it('Formats the data into a string', async () => {
      const args = require.resolve('./Day15TestData.txt');
      const actual = await getMoves(args);
      expect(actual).toEqual(mockMovesLarge);
    });
  });
  describe('processMoves', () => {
    it('processes moves for small mock', async () => {
      const actual = await processMoves(mockMovesSmall, mockMapSmall);
      expect(actual).toEqual([
        '########',
        '#....OO#',
        '##.....#',
        '#.....O#',
        '#.#O@..#',
        '#...O..#',
        '#...O..#',
        '########',
      ]);
    });
    it('processes all moves for large mock', async () => {
      const actual = await processMoves(mockMovesLarge, mockMapLarge);
      expect(actual).toEqual([
        '##########',
        '#.O.O.OOO#',
        '#........#',
        '#OO......#',
        '#OO@.....#',
        '#O#.....O#',
        '#O.....OO#',
        '#O.....OO#',
        '#OO....OO#',
        '##########',
      ]);
    });
  });
  describe('moveRobot', () => {
    it('does not move robot west b/c there is a wall', () => {
      const before = [
        '########',
        '#..O.O.#',
        '##@.O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      const after = [
        '########',
        '#..O.O.#',
        '##@.O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      moveRobot('<', before);
      expect(before).toEqual(after);
    });
    it('moves robot north into free space', () => {
      const before = [
        '########',
        '#..O.O.#',
        '##@.O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      const after = [
        '########',
        '#.@O.O.#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      moveRobot('^', before);
      expect(before).toEqual(after);
    });
    it('does not move robot north b/c there is a wall', () => {
      const before = [
        '########',
        '#.@O.O.#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      const after = [
        '########',
        '#.@O.O.#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      moveRobot('^', before);
      expect(before).toEqual(after);
    });
    it('moves robot and pushes one box east', () => {
      const before = [
        '########',
        '#.@O.O.#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      const after = [
        '########',
        '#..@OO.#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      moveRobot('>', before);
      expect(before).toEqual(after);
    });
    it('moves robot and pushes two boxes east', () => {
      const before = [
        '########',
        '#..@OO.#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      const after = [
        '########',
        '#...@OO#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      moveRobot('>', before);
      expect(before).toEqual(after);
    });
    it('does not move robot east because boxes would be pushed into a wall', () => {
      const before = [
        '########',
        '#...@OO#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      const after = [
        '########',
        '#...@OO#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      moveRobot('>', before);
      expect(before).toEqual(after);
    });
    it('moves robot and pushes 4 boxes south', () => {
      const before = [
        '########',
        '#...@OO#',
        '##..O..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#......#',
        '########',
      ];
      const after = [
        '########',
        '#....OO#',
        '##..@..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#...O..#',
        '########',
      ];
      moveRobot('v', before);
      expect(before).toEqual(after);
    });
    it('moves robot west', () => {
      const before = [
        '########',
        '#....OO#',
        '##..@..#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#...O..#',
        '########',
      ];
      const after = [
        '########',
        '#....OO#',
        '##.@...#',
        '#...O..#',
        '#.#.O..#',
        '#...O..#',
        '#...O..#',
        '########',
      ];
      moveRobot('<', before);
      expect(before).toEqual(after);
    });
  });
  describe('getGPSCoords', () => {
    it('gets gps coords for one box', () => {
      const mockGrid = ['#######', '#...O..', '#......'];
      expect(getGPSCoords(mockGrid)).toEqual([104]);
    });
  });
  describe('partOne', () => {
    it('Gets the sum of all GPS coords for the smaller example', async () => {
      const actual = await partOne(mockMapSmall, mockMovesSmall);
      expect(actual).toEqual(2028);
    });
    it('Gets the sum of all GPS coords for the larger example', async () => {
      const actual = await partOne(mockMapLarge, mockMovesLarge);
      expect(actual).toEqual(10092);
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
