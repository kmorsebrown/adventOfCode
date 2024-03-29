const { getData } = require('./globalFunctions.js');
const path = require('path');

describe('globalFunctions', () => {
  describe('getData', () => {
    it('Reads text file', async () => {
      const args = require.resolve('./testDataForSpec.txt');
      const actual = await getData(args);
      expect(actual).toEqual('Hello.');
    });
  });
});
