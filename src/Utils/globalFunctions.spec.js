import { getData } from './globalFunctions.js';

describe('globalFunctions', () => {
  describe('getData', () => {
    it('Reads text file', async () => {
      const args = new URL('./testDataForSpec.txt', import.meta.url).pathname;
      const actual = await getData(args);
      expect(actual).toEqual('Hello.');
    });
  });
});
