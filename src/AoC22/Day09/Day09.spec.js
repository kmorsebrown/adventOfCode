const path = require('path');
const {
  formatData,
  moveHead,
  moveTail,
  followDirections,
  partOne,
  partTwo,
} = require('./Day09.js');

// npm test src/AoC22/Day09/Day09.spec.js

describe('Day09', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day09TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual([
        ['R', 4],
        ['U', 4],
        ['L', 3],
        ['D', 1],
        ['R', 4],
        ['D', 1],
        ['L', 5],
        ['R', 2],
      ]);
    });
  });
  describe('moveHead', () => {
    it('Increased x by 1 when direction is R', async () => {
      const direction = 'R';
      const Head = { x: 0, y: 0 };
      const Hcoord = ['x0y0'];
      const actual = await moveHead(direction, Head, Hcoord);
      expect(actual).toEqual({ x: 1, y: 0 });
    });
    it('Increased y by 1 when direction is U', async () => {
      const direction = 'U';
      const Head = { x: 4, y: 0 };
      const Hcoord = ['x4y0'];
      const actual = await moveHead(direction, Head, Hcoord);
      expect(actual).toEqual({ x: 4, y: 1 });
    });
    it('Decreased x by 1 when direction is L', async () => {
      const direction = 'L';
      const Head = { x: 4, y: 4 };
      const Hcoord = ['x4y4'];
      const actual = await moveHead(direction, Head, Hcoord);
      expect(actual).toEqual({ x: 3, y: 4 });
    });
    it('Decreased y by 1 when direction is D', async () => {
      const direction = 'D';
      const Head = { x: 1, y: 4 };
      const Hcoord = ['x1y4'];
      const actual = await moveHead(direction, Head, Hcoord);
      expect(actual).toEqual({ x: 1, y: 3 });
    });
  });
  describe('moveTail', () => {
    it('Moved Tail 1 to the right when Head.x was 2 greter than Tail.x', async () => {
      const plank = {
        Head: { x: 2, y: 0 },
        Tail: { x: 0, y: 0 },
      };
      const Tcoord = ['x0y0'];
      const actual = await moveTail(plank, Tcoord);
      expect(actual).toEqual({ x: 1, y: 0 });
    });
    it('Moved Tail 1 to the left when Head.x was 2 less than Tail.x', async () => {
      const plank = {
        Head: { x: 2, y: 4 },
        Tail: { x: 4, y: 3 },
      };
      const Tcoord = ['x0y0'];
      const actual = await moveTail(plank, Tcoord);
      expect(actual).toEqual({ x: 3, y: 4 });
    });
    it('Moved Tail 1 up when Head.y was 2 greter than Tail.y', async () => {
      const plank = {
        Head: { x: 4, y: 2 },
        Tail: { x: 3, y: 0 },
      };
      const Tcoord = ['x0y0'];
      const actual = await moveTail(plank, Tcoord);
      expect(actual).toEqual({ x: 4, y: 1 });
    });
    it('Tail does not move when Head is touching Tail', async () => {
      const plank = {
        Head: { x: 5, y: 2 },
        Tail: { x: 4, y: 3 },
      };
      const Tcoord = ['x0y0'];
      const actual = await moveTail(plank, Tcoord);
      expect(actual).toEqual({ x: 4, y: 3 });
    });
  });
  describe('followDirections', () => {
    it('Increased plank.Head.x by 4 and plank.Tail by 3 when direction is R 4', async () => {
      const direction = ['R', 4];
      const plank = {
        Head: { x: 0, y: 0 },
        Tail: { x: 0, y: 0 },
      };
      const Hcoord = ['x0y0'];
      const Tcoord = ['x0y0'];
      const actual = await followDirections(direction, plank, Hcoord, Tcoord);
      expect(actual).toEqual({
        Head: { x: 4, y: 0 },
        Tail: { x: 3, y: 0 },
      });
    });
    it('Increased plank.Head.y by 4 and plank.Tail by 3 when direction is U 4', async () => {
      const direction = ['U', 4];
      const plank = {
        Head: { x: 4, y: 0 },
        Tail: { x: 3, y: 0 },
      };
      const Hcoord = ['x4y0'];
      const Tcoord = ['x3y0'];
      const actual = await followDirections(direction, plank, Hcoord, Tcoord);
      expect(actual).toEqual({ Head: { x: 4, y: 4 }, Tail: { x: 4, y: 3 } });
    });
    it('Decreased plank.Head.x by 3 and plank.Tail by 2 when direction is L 3', async () => {
      const direction = ['L', 3];
      const plank = { Head: { x: 4, y: 4 }, Tail: { x: 4, y: 3 } };
      const Hcoord = ['x4y4'];
      const Tcoord = ['x4y3'];
      const actual = await followDirections(direction, plank, Hcoord, Tcoord);
      expect(actual).toEqual({ Head: { x: 1, y: 4 }, Tail: { x: 2, y: 4 } });
    });
    it('Decreased plank.Head.y by 1 and does not move plank.Tail when direction is D 1', async () => {
      const direction = ['D', 1];
      const plank = { Head: { x: 1, y: 4 }, Tail: { x: 2, y: 4 } };
      const Hcoord = ['x1y4'];
      const Tcoord = ['x2y4'];
      const actual = await followDirections(direction, plank, Hcoord, Tcoord);
      expect(actual).toEqual({ Head: { x: 1, y: 3 }, Tail: { x: 2, y: 4 } });
    });
  });
  describe('partOne', () => {
    it('Returns 13 unique positions for Tail', async () => {
      const args = [
        ['R', 4],
        ['U', 4],
        ['L', 3],
        ['D', 1],
        ['R', 4],
        ['D', 1],
        ['L', 5],
        ['R', 2],
      ];
      const actual = await partOne(args);
      expect(actual).toEqual(13);
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
