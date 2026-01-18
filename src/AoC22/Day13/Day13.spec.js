import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { formatData, partOne, partTwo, generateGraph } from './Day13.js';

// npm test src/AoC22/Day13/Day13.spec.js

const testGraph = {
  list: new Map([
    [
      'L0',
      {
        value: '[1,1,3,1,1]',
        parent: '',
        children: ['L0.0', 'L0.1', 'L0.2', 'L0.3', 'L0.4'],
      },
    ],
    ['L1', { value: '[[1],[2,3,4]]', parent: '', children: ['L1.0', 'L1.1'] }],
    ['L2', { value: '[9]', parent: '', children: ['L2.0'] }],
    [
      'L3',
      { value: '[[4,4],4,4]', parent: '', children: ['L3.0', 'L3.1', 'L3.2'] },
    ],
    [
      'L4',
      {
        value: '[7,7,7,7]',
        parent: '',
        children: ['L4.0', 'L4.1', 'L4.2', 'L4.3'],
      },
    ],
    ['L5', { value: '[]', parent: '', children: [] }],
    ['L6', { value: '[[[]]]', parent: '', children: ['L6.0'] }],
    [
      'L7',
      {
        value: '[1,[2,[3,[4,[5,6,7]]]],8,9]',
        parent: '',
        children: ['L7.0', 'L7.1', 'L7.2', 'L7.3'],
      },
    ],
    [
      'R0',
      {
        value: '[1,1,5,1,1]',
        parent: '',
        children: ['R0.0', 'R0.1', 'R0.2', 'R0.3', 'R0.4'],
      },
    ],
    ['R1', { value: '[[1],4]', parent: '', children: ['R1.0', 'R1.1'] }],
    ['R2', { value: '[[8,7,6]]', parent: '', children: ['R2.0'] }],
    [
      'R3',
      {
        value: '[[4,4],4,4,4]',
        parent: '',
        children: ['R3.0', 'R3.1', 'R3.2', 'R3.3'],
      },
    ],
    [
      'R4',
      { value: '[7,7,7]', parent: '', children: ['R4.0', 'R4.1', 'R4.2'] },
    ],
    ['R5', { value: '[3]', parent: '', children: ['R5.0'] }],
    ['R6', { value: '[[]]', parent: '', children: ['R6.0'] }],
    [
      'R7',
      {
        value: '[1,[2,[3,[4,[5,6,0]]]],8,9]',
        parent: '',
        children: ['R7.0', 'R7.1', 'R7.2', 'R7.3'],
      },
    ],
    ['L0.0', { value: '1', parent: 'L0', children: [] }],
    ['L0.1', { value: '1', parent: 'L0', children: [] }],
    ['L0.2', { value: '3', parent: 'L0', children: [] }],
    ['L0.3', { value: '1', parent: 'L0', children: [] }],
    ['L0.4', { value: '1', parent: 'L0', children: [] }],
    ['L1.0', { value: '[1]', parent: 'L1', children: ['L1.0.0'] }],
    [
      'L1.1',
      {
        value: '[2,3,4]',
        parent: 'L1',
        children: ['L1.1.0', 'L1.1.1', 'L1.1.2'],
      },
    ],
    ['L2.0', { value: '9', parent: 'L2', children: [] }],
    ['L3.0', { value: '[4,4]', parent: 'L3', children: ['L3.0.0', 'L3.0.1'] }],
    ['L3.1', { value: '4', parent: 'L3', children: [] }],
    ['L3.2', { value: '4', parent: 'L3', children: [] }],
    ['L4.0', { value: '7', parent: 'L4', children: [] }],
    ['L4.1', { value: '7', parent: 'L4', children: [] }],
    ['L4.2', { value: '7', parent: 'L4', children: [] }],
    ['L4.3', { value: '7', parent: 'L4', children: [] }],
    ['L6.0', { value: '[[]]', parent: 'L6', children: ['L6.0.0'] }],
    ['L7.0', { value: '1', parent: 'L7', children: [] }],
    [
      'L7.1',
      {
        value: '[2,[3,[4,[5,6,7]]]]',
        parent: 'L7',
        children: ['L7.1.0', 'L7.1.1'],
      },
    ],
    ['L7.2', { value: '8', parent: 'L7', children: [] }],
    ['L7.3', { value: '9', parent: 'L7', children: [] }],
    ['R0.0', { value: '1', parent: 'R0', children: [] }],
    ['R0.1', { value: '1', parent: 'R0', children: [] }],
    ['R0.2', { value: '5', parent: 'R0', children: [] }],
    ['R0.3', { value: '1', parent: 'R0', children: [] }],
    ['R0.4', { value: '1', parent: 'R0', children: [] }],
    ['R1.0', { value: '[1]', parent: 'R1', children: ['R1.0.0'] }],
    ['R1.1', { value: '4', parent: 'R1', children: [] }],
    [
      'R2.0',
      {
        value: '[8,7,6]',
        parent: 'R2',
        children: ['R2.0.0', 'R2.0.1', 'R2.0.2'],
      },
    ],
    ['R3.0', { value: '[4,4]', parent: 'R3', children: ['R3.0.0', 'R3.0.1'] }],
    ['R3.1', { value: '4', parent: 'R3', children: [] }],
    ['R3.2', { value: '4', parent: 'R3', children: [] }],
    ['R3.3', { value: '4', parent: 'R3', children: [] }],
    ['R4.0', { value: '7', parent: 'R4', children: [] }],
    ['R4.1', { value: '7', parent: 'R4', children: [] }],
    ['R4.2', { value: '7', parent: 'R4', children: [] }],
    ['R5.0', { value: '3', parent: 'R5', children: [] }],
    ['R6.0', { value: '[]', parent: 'R6', children: [] }],
    ['R7.0', { value: '1', parent: 'R7', children: [] }],
    [
      'R7.1',
      {
        value: '[2,[3,[4,[5,6,0]]]]',
        parent: 'R7',
        children: ['R7.1.0', 'R7.1.1'],
      },
    ],
    ['R7.2', { value: '8', parent: 'R7', children: [] }],
    ['R7.3', { value: '9', parent: 'R7', children: [] }],
    ['L1.0.0', { value: '1', parent: 'L1.0', children: [] }],
    ['L1.1.0', { value: '2', parent: 'L1.1', children: [] }],
    ['L1.1.1', { value: '3', parent: 'L1.1', children: [] }],
    ['L1.1.2', { value: '4', parent: 'L1.1', children: [] }],
    ['L3.0.0', { value: '4', parent: 'L3.0', children: [] }],
    ['L3.0.1', { value: '4', parent: 'L3.0', children: [] }],
    ['L6.0.0', { value: '[]', parent: 'L6.0', children: [] }],
    ['L7.1.0', { value: '2', parent: 'L7.1', children: [] }],
    [
      'L7.1.1',
      {
        value: '[3,[4,[5,6,7]]]',
        parent: 'L7.1',
        children: ['L7.1.1.0', 'L7.1.1.1'],
      },
    ],
    ['R1.0.0', { value: '1', parent: 'R1.0', children: [] }],
    ['R2.0.0', { value: '8', parent: 'R2.0', children: [] }],
    ['R2.0.1', { value: '7', parent: 'R2.0', children: [] }],
    ['R2.0.2', { value: '6', parent: 'R2.0', children: [] }],
    ['R3.0.0', { value: '4', parent: 'R3.0', children: [] }],
    ['R3.0.1', { value: '4', parent: 'R3.0', children: [] }],
    ['R7.1.0', { value: '2', parent: 'R7.1', children: [] }],
    [
      'R7.1.1',
      {
        value: '[3,[4,[5,6,0]]]',
        parent: 'R7.1',
        children: ['R7.1.1.0', 'R7.1.1.1'],
      },
    ],
    ['L7.1.1.0', { value: '3', parent: 'L7.1.1', children: [] }],
    [
      'L7.1.1.1',
      {
        value: '[4,[5,6,7]]',
        parent: 'L7.1.1',
        children: ['L7.1.1.1.0', 'L7.1.1.1.1'],
      },
    ],
    ['R7.1.1.0', { value: '3', parent: 'R7.1.1', children: [] }],
    [
      'R7.1.1.1',
      {
        value: '[4,[5,6,0]]',
        parent: 'R7.1.1',
        children: ['R7.1.1.1.0', 'R7.1.1.1.1'],
      },
    ],
    ['L7.1.1.1.0', { value: '4', parent: 'L7.1.1.1', children: [] }],
    [
      'L7.1.1.1.1',
      {
        value: '[5,6,7]',
        parent: 'L7.1.1.1',
        children: ['L7.1.1.1.1.0', 'L7.1.1.1.1.1', 'L7.1.1.1.1.2'],
      },
    ],
    ['R7.1.1.1.0', { value: '4', parent: 'R7.1.1.1', children: [] }],
    [
      'R7.1.1.1.1',
      {
        value: '[5,6,0]',
        parent: 'R7.1.1.1',
        children: ['R7.1.1.1.1.0', 'R7.1.1.1.1.1', 'R7.1.1.1.1.2'],
      },
    ],
    ['L7.1.1.1.1.0', { value: '5', parent: 'L7.1.1.1.1', children: [] }],
    ['L7.1.1.1.1.1', { value: '6', parent: 'L7.1.1.1.1', children: [] }],
    ['L7.1.1.1.1.2', { value: '7', parent: 'L7.1.1.1.1', children: [] }],
    ['R7.1.1.1.1.0', { value: '5', parent: 'R7.1.1.1.1', children: [] }],
    ['R7.1.1.1.1.1', { value: '6', parent: 'R7.1.1.1.1', children: [] }],
    ['R7.1.1.1.1.2', { value: '0', parent: 'R7.1.1.1.1', children: [] }],
  ]),
};

describe('Day13', () => {
  describe('formatData', () => {
    it('Formats the data into an array', async () => {
      const args = path.join(__dirname, 'Day13TestData.txt');
      const actual = await formatData(args);
      expect(actual).toEqual({
        left: [
          '[1,1,3,1,1]',
          '[[1],[2,3,4]]',
          '[9]',
          '[[4,4],4,4]',
          '[7,7,7,7]',
          '[]',
          '[[[]]]',
          '[1,[2,[3,[4,[5,6,7]]]],8,9]',
        ],
        right: [
          '[1,1,5,1,1]',
          '[[1],4]',
          '[[8,7,6]]',
          '[[4,4],4,4,4]',
          '[7,7,7]',
          '[3]',
          '[[]]',
          '[1,[2,[3,[4,[5,6,0]]]],8,9]',
        ],
      });
    });
  });
  describe.skip('generateGraph', () => {
    it('generates a graph from the data', async () => {
      const actual = await generateGraph({
        left: [
          '[1,1,3,1,1]',
          '[[1],[2,3,4]]',
          '[9]',
          '[[4,4],4,4]',
          '[7,7,7,7]',
          '[]',
          '[[[]]]',
          '[1,[2,[3,[4,[5,6,7]]]],8,9]',
        ],
        right: [
          '[1,1,5,1,1]',
          '[[1],4]',
          '[[8,7,6]]',
          '[[4,4],4,4,4]',
          '[7,7,7]',
          '[3]',
          '[[]]',
          '[1,[2,[3,[4,[5,6,0]]]],8,9]',
        ],
      });
      expect(actual).toEqual(testGraph);
    });
  });
  describe.skip('partOne', () => {
    it('TK', async () => {
      const args = [];
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
