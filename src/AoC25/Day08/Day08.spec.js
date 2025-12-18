const { formatData, getAllDistances, partOne, partTwo } = require('./Day08');

// npm test -- src/AoC25/Day08/Day08.spec.js

describe('Day08', () => {
  const mockInput = [
    [162, 817, 812],
    [57, 618, 57],
    [906, 360, 560],
    [592, 479, 940],
    [352, 342, 300],
    [466, 668, 158],
    [542, 29, 236],
    [431, 825, 988],
    [739, 650, 466],
    [52, 470, 668],
    [216, 146, 977],
    [819, 987, 18],
    [117, 168, 530],
    [805, 96, 715],
    [346, 949, 466],
    [970, 615, 88],
    [941, 993, 340],
    [862, 61, 35],
    [984, 92, 344],
    [425, 690, 689],
  ];
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = require.resolve('./Day08TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual(mockInput);
    });
  });

  describe('getAllDistances', () => {
    it('Returns the distance between all points', async () => {
      const actual = await getAllDistances(mockInput);
      expect(actual[0]).toEqual({
        dist: 316.90219311326956,
        pq: [
          [162, 817, 812],
          [425, 690, 689],
        ],
      });
    });
  });
  describe('partOne', () => {
    it('Returns the lengths of the longest 3 circuits multiplied together', async () => {
      const actual = await partOne(mockInput, 10);
      expect(actual).toEqual(40);
    });
  });
  describe('partTwo', () => {
    it('Return the x coordinates of the last two junction boxes connected in the circuit multiplied together', async () => {
      const actual = await partTwo(mockInput);
      expect(actual).toEqual(25272);
    });
  });
});
