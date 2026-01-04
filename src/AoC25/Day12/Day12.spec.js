const {
  formatData,
  generateShapes,
  placeGifts,
  generateShapePermutations,
  generateShapeArrays,
  partOne,
  partTwo,
} = require('./Day12');
const { BitwiseShape, BitwiseField } = require('../../Utils/bitwise.js');

// npm test -- src/AoC25/Day12/Day12.spec.js

describe('Day12', () => {
  const mockInput = {
    shapes: [
      ['###', '##.', '##.'],
      ['###', '##.', '.##'],
      ['.##', '###', '##.'],
      ['##.', '###', '##.'],
      ['###', '#..', '###'],
      ['###', '.#.', '###'],
    ],
    regions: [
      {
        width: 4,
        height: 4,
        gifts: [0, 0, 0, 0, 2, 0],
      },
      {
        width: 12,
        height: 5,
        gifts: [1, 0, 1, 0, 2, 2],
      },
      {
        width: 12,
        height: 5,
        gifts: [1, 0, 1, 0, 3, 2],
      },
    ],
  };

  const mockShapes = [
    BitwiseShape.fromData(mockInput.shapes[0]),
    BitwiseShape.fromData(mockInput.shapes[1]),
    BitwiseShape.fromData(mockInput.shapes[2]),
    BitwiseShape.fromData(mockInput.shapes[3]),
    BitwiseShape.fromData(mockInput.shapes[4]),
    BitwiseShape.fromData(mockInput.shapes[5]),
  ];

  let mock4x4Region;
  let mock12x5Region;

  beforeEach(() => {
    mock4x4Region = new BitwiseField(4, 4);
    mock12x5Region = new BitwiseField(12, 5);
  });
  describe('formatData', () => {
    it('Formats the data', async () => {
      const args = require.resolve('./Day12TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });
  describe('generateShapes', () => {
    it('generates the bitwise shapes', () => {
      const actual = generateShapes(mockInput.shapes);

      expect(actual[0].rows).toEqual([0b111n, 0b110n, 0b110n]);
      expect(actual[1].rows).toEqual([0b111n, 0b110n, 0b011n]);
      expect(actual[2].rows).toEqual([0b011n, 0b111n, 0b110n]);
      expect(actual[3].rows).toEqual([0b110n, 0b111n, 0b110n]);
      expect(actual[4].rows).toEqual([0b111n, 0b100n, 0b111n]);
      expect(actual[5].rows).toEqual([0b111n, 0b010n, 0b111n]);
    });
  });
  describe('generateShapePermutations', () => {
    it('only generates 1 shape permutations for #.# .#. #.#', () => {
      /*
        | # . # |
        | . # . |
        | # . # |
      */
      const shape = new BitwiseShape(3, 3, [0b101, 0b010, 0b101]);
      const actual = generateShapePermutations(shape);
      expect(actual.length).toEqual(1);
    });

    it('generates 8 permutations for ### ##. ##. ', () => {
      /*
        | # # # | # # # | . # # | # . . |
        | # # . | # # # | . # # | # # # |
        | # # . | . . # | # # # | # # # |
        | ----- | ----- | ----- | ----- |
        | # # # | # # # | # # . | . . # |
        | . # # | # # # | # # . | # # # |
        | . # # | # . . | # # # | # # # |
      */
      const actual = generateShapePermutations(mockShapes[0]);
      expect(actual.length).toEqual(8);
    });

    it('generates 8 shape permutations for ### ##. .##', () => {
      /*
        | # # # | . # # | # # . | # . # |
        | # # . | # # # | . # # | # # # |
        | . # # | # . # | # # # | # # . |
        | ----- | ----- | ----- | ----- |
        | # # # | # # . | . # # | # . # |
        | . # # | # # # | # # . | # # # |
        | # # . | # . # | # # # | . # # |
      */
      const actual = generateShapePermutations(mockShapes[1]);
      expect(actual.length).toEqual(8);
    });

    it('generates 2 shape permutations for .## ### ##.', () => {
      /*
        | . # # | # # . |
        | # # # | # # # |
        | # # . | . # # |
      */
      const actual = generateShapePermutations(mockShapes[2]);
      expect(actual.length).toEqual(2);
    });

    it('only generates 4 shape permutations for ##. ### ##.', () => {
      /*
        | # # . | # # # | . # # | . # . |
        | # # # | # # # | # # # | # # # |
        | # # . | . # . | . # # | # # # |
      */
      const actual = generateShapePermutations(mockShapes[3]);
      expect(actual.length).toEqual(4);
    });

    it('only generates 4 shape permutations for ### #.. ###', () => {
      /*
        | # # # | # # # | # # # | # . # |
        | # . . | # . # | . . # | # . # |
        | # # # | # . # | # # # | # # # |
      */
      const actual = generateShapePermutations(mockShapes[4]);
      expect(actual.length).toEqual(4);
    });

    it('generates 2 permutations for ### .#. ### ', () => {
      /*
        | # # # | # . # |
        | . # . | # # # |
        | # # # | # . # |
      */
      const actual = generateShapePermutations(mockShapes[5]);
      expect(actual.length).toEqual(2);
    });

    it('generates 4 permutations for .## ##. #.. ', () => {
      /*
        | . # # | # # . | . . # | # . . |
        | # # . | . # # | . # # | # # . |
        | # . . | . . # | # # . | . # # |
      */
      const shape = new BitwiseShape(3, 3, [0b011, 0b110, 0b100]);
      const actual = generateShapePermutations(shape);
      expect(actual.length).toEqual(4);
    });

    it('generates 4 permutations for ### .## ..# ', () => {
      /*
        | # # # | . . # | # . . | # # # |
        | . # # | . # # | # # . | # # . |
        | . . # | # # # | # # # | # . . |
       */
      const shape = new BitwiseShape(3, 3, [0b111, 0b011, 0b001]);
      const actual = generateShapePermutations(shape);
      expect(actual.length).toEqual(4);
    });
  });
  describe('generateShapeArrays', () => {
    it('returns 2 arrays of shape permutations for [0, 0, 0, 0, 2, 0]', () => {
      const actual = generateShapeArrays(
        mockShapes,
        mockInput.regions[0].gifts
      );
      expect(actual.length).toEqual(2);
      expect(actual[0].length).toEqual(4);
    });
    it('returns 6 arrays of shape permutations for [0, 0, 0, 0, 2, 0]', () => {
      const actual = generateShapeArrays(
        mockShapes,
        mockInput.regions[1].gifts
      );
      expect(actual.length).toEqual(6);
    });
  });
  describe('placeGifts', () => {
    it('successfully places gifts for 4x4 region', async () => {
      const actual = await placeGifts(mockInput.regions[0], mockShapes);
      expect(actual).toEqual(true);
    });

    it('successfully places gifts for the first 12x5 region', async () => {
      const actual = await placeGifts(mockInput.regions[1], mockShapes);
      expect(actual).toEqual(true);
    });

    it('unsuccessfully places gifts for the second 12x5 region', async () => {
      const actual = await placeGifts(mockInput.regions[2], mockShapes);
      expect(actual).toEqual(false);
    });
  });
  describe.skip('partOne', () => {
    it('TK', async () => {
      const args = [];
      const actual = await partOne(args);
      expect(actual).toEqual(0);
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
