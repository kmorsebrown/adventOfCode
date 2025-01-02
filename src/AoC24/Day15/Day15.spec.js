const {
  getMap,
  getMoves,
  processMoves,
  moveRobot,
  getGPSCoords,
  partOne,
  doubleMap,
  pushBoxesWest,
  pushBoxesEast,
  pushBoxesNorth,
  pushBoxesSouth,
  moveRobotPt2,
  processMovesPt2,
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

  const mockDoubledMapLarge = [
    '####################',
    '##....[]....[]..[]##',
    '##............[]..##',
    '##..[][]....[]..[]##',
    '##....[]@.....[]..##',
    '##[]##....[]......##',
    '##[]....[]....[]..##',
    '##..[][]..[]..[][]##',
    '##........[]......##',
    '####################',
  ];

  const mockMapSmallPt2 = [
    '#######',
    '#...#.#',
    '#.....#',
    '#..OO@#',
    '#..O..#',
    '#.....#',
    '#######',
  ];

  const mockMovesSmallPt2 = '<vv<<^^<<^^';

  const mockDoubledMapSmallPt2 = [
    '##############',
    '##......##..##',
    '##..........##',
    '##....[][]@.##',
    '##....[]....##',
    '##..........##',
    '##############',
  ];
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
  describe('doubleMap', () => {
    it('doubles the larger map', () => {
      expect(doubleMap(mockMapLarge)).toEqual(mockDoubledMapLarge);
    });
    it('doubles the smaller map', () => {
      expect(doubleMap(mockMapSmallPt2)).toEqual(mockDoubledMapSmallPt2);
    });
  });
  describe('pushBoxesWest', () => {
    it('pushes two boxes one slot to the west', () => {
      const robot = { row: 3, col: 10 };
      const rowStr = '##....[][]@.##';
      expect(pushBoxesWest(rowStr, robot)).toEqual('##...[][]@..##');
    });
    it('does not push two boxes to the west if there is a wall', () => {
      const robot = { row: 3, col: 6 };
      const rowStr = '##[][]@..##';
      expect(pushBoxesWest(rowStr, robot)).toEqual('##[][]@..##');
    });
  });
  describe('pushBoxesNorth', () => {
    it('pushes boxes one slot to the north', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##..........##',
        '##############',
      ];
      const robot = { row: 5, col: 7 };
      expect(pushBoxesNorth(startMap, robot)).toEqual(endMap);
    });
    it('does not push boxes one slot to the north because of a wall', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##..........##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##..........##',
        '##############',
      ];
      const robot = { row: 4, col: 7 };
      expect(pushBoxesNorth(startMap, robot)).toEqual(endMap);
    });
  });
  describe('pushBoxesSouth', () => {
    it('pushes boxes one slot to the south', () => {
      const startMap = [
        '##############',
        '##.....@....##',
        '##....[]....##',
        '##...[][]...##',
        '##..........##',
        '##......##..##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##..........##',
        '##.....@....##',
        '##....[]....##',
        '##...[][]...##',
        '##......##..##',
        '##############',
      ];
      const robot = { row: 1, col: 7 };
      expect(pushBoxesSouth(startMap, robot)).toEqual(endMap);
    });
    it('does not push boxes one slot to the south because of a wall', () => {
      const startMap = [
        '##############',
        '##..........##',
        '##.....@....##',
        '##....[]....##',
        '##...[][]...##',
        '##......##..##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##..........##',
        '##.....@....##',
        '##....[]....##',
        '##...[][]...##',
        '##......##..##',
        '##############',
      ];
      const robot = { row: 2, col: 7 };
      expect(pushBoxesSouth(startMap, robot)).toEqual(endMap);
    });
  });
  describe('pushBoxesEast', () => {
    it('pushes two boxes one slot to the east', () => {
      const robot = { row: 3, col: 4 };
      const rowStr = '##..@[][]..##';
      expect(pushBoxesEast(rowStr, robot)).toEqual('##...@[][].##');
    });
    it('does not push two boxes to the east if there is a wall', () => {
      const robot = { row: 3, col: 4 };
      const rowStr = '##..@[][]##';
      expect(pushBoxesEast(rowStr, robot)).toEqual('##..@[][]##');
    });
  });
  describe('moveRobotPt2', () => {
    it('pushes boxes west', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##....[][]@.##',
        '##....[]....##',
        '##..........##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##...[][]@..##',
        '##....[]....##',
        '##..........##',
        '##############',
      ];
      moveRobotPt2('<', startMap);
      expect(startMap).toEqual(endMap);
    });
    it('moves south', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##...[][]@..##',
        '##....[]....##',
        '##..........##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##...[][]...##',
        '##....[].@..##',
        '##..........##',
        '##############',
      ];
      moveRobotPt2('v', startMap);
      expect(startMap).toEqual(endMap);
    });
    it('does not move south because of a wall', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##############',
      ];
      moveRobotPt2('v', startMap);
      expect(startMap).toEqual(endMap);
    });
    it('pushes boxes north', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##..........##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##..........##',
        '##############',
      ];
      moveRobotPt2('^', startMap);
      expect(startMap).toEqual(endMap);
    });
    it('does not pushes boxes north because there is a wall', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##..........##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##...[][]...##',
        '##....[]....##',
        '##.....@....##',
        '##..........##',
        '##############',
      ];
      moveRobotPt2('^', startMap);
      expect(startMap).toEqual(endMap);
    });
    it('pushes one box south', () => {
      const startMap = [
        '##############',
        '##......##..##',
        '##...@[]....##',
        '##...[][]...##',
        '##..........##',
        '##..........##',
        '##############',
      ];
      const endMap = [
        '##############',
        '##......##..##',
        '##....[]....##',
        '##...@.[]...##',
        '##...[].....##',
        '##..........##',
        '##############',
      ];
      moveRobotPt2('v', startMap);
      expect(startMap).toEqual(endMap);
    });
  });
  describe('processMovesPt2', () => {
    it('process moves of smaller example', async () => {
      const result = [
        '##############',
        '##...[].##..##',
        '##...@.[]...##',
        '##....[]....##',
        '##..........##',
        '##..........##',
        '##############',
      ];
      const actual = await processMovesPt2(
        mockMovesSmallPt2,
        mockDoubledMapSmallPt2
      );
      expect(actual).toEqual(result);
    });
    it('process moves of larger example', async () => {
      const result = [
        '####################',
        '##[].......[].[][]##',
        '##[]...........[].##',
        '##[]........[][][]##',
        '##[]......[]....[]##',
        '##..##......[]....##',
        '##..[]............##',
        '##..@......[].[][]##',
        '##......[][]..[]..##',
        '####################',
      ];
      const actual = await processMovesPt2(mockMovesLarge, mockDoubledMapLarge);
      expect(actual).toEqual(result);
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
