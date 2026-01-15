const {
  formatData,
  placeGifts,
  generateShapePermutations,
  generateShapesToPlaceMap,
  generateShapesMap,
  getAreaShapesToPlace,
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
  describe('getAreaShapesToPlace', () => {
    it('returns 14 for [0, 0, 0, 0, 2, 0]', () => {
      const actual = getAreaShapesToPlace(
        mockShapes,
        mockInput.regions[0].gifts
      );
      expect(actual).toEqual(14);
    });
  });
  describe('generateShapesToPlaceMap', () => {
    it('returns map of shape permutations for [0, 0, 0, 0, 2, 0]', () => {
      const actual = generateShapesToPlaceMap(
        mockShapes,
        mockInput.regions[0].gifts
      );
      expect(actual.size).toEqual(1);
      expect(actual.get('###_#.._###').num).toEqual(2);
      expect(actual.get('###_#.._###').permutations.length).toEqual(4);
    });
    it('returns map of shape permutations for [1, 0, 1, 0, 2, 2]', () => {
      const actual = generateShapesToPlaceMap(
        mockShapes,
        mockInput.regions[1].gifts
      );
      expect(actual.size).toEqual(4);
      expect(actual.get('###_##._##.').num).toEqual(1);
      expect(actual.get('###_.#._###').num).toEqual(2);
    });
  });
  describe('generateShapesMap', () => {
    it('generates shape map w/o recording num occurrences', () => {
      const actual = generateShapesMap(mockShapes);
      expect(actual.size).toEqual(6);
      expect(actual.get('###\n##.\n##.')).toEqual(0);
    });
    it('generates shape map w/recording num occurrences', () => {
      const actual = generateShapesMap(mockShapes, true);
      expect(actual.size).toEqual(6);
      expect(actual.get('###\n##.\n##.')).toEqual(1);
    });
  });
  describe('placeGifts', () => {
    it('successfully places gifts for 4x4 region', () => {
      const actual = placeGifts(mockInput.regions[0], mockShapes);
      expect(actual).toEqual(true);
    });

    it('successfully places gifts for the first 12x5 region', () => {
      const actual = placeGifts(mockInput.regions[1], mockShapes);
      expect(actual).toEqual(true);
    });

    it('unsuccessfully places gifts for the second 12x5 region', () => {
      const actual = placeGifts(mockInput.regions[2], mockShapes);
      expect(actual).toEqual(false);
    });
  });
  describe('partOne', () => {
    it('returns the number of regions that can fit shapes', async () => {
      const actual = await partOne(mockInput);
      expect(actual).toEqual(2);
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
