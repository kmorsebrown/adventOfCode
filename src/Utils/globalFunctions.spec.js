const { getData, Queue } = require('./globalFunctions.js');
const path = require('path');

describe('globalFunctions', () => {
  describe('getData', () => {
    it('Reads text file', async () => {
      const args = require.resolve('./testDataForSpec.txt');
      const actual = await getData(args);
      expect(actual).toEqual('Hello.');
    });
  });

  describe('Queue', () => {
    let queue;
    beforeEach(() => {
      queue = new Queue();
    });

    it('should initialize as an empty queue', () => {
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.front()).toBeUndefined();
    });

    it('should enqueue elements correctly', () => {
      queue.enqueue('an item');
      queue.enqueue('another item');
      expect(queue.isEmpty()).toBe(false);
      expect(queue.size()).toBe(2);
      expect(queue.front()).toBe('an item');
    });

    it('should dequeue elements correctly', () => {
      queue.enqueue('an item');
      queue.enqueue('another item');
      const dequeued = queue.dequeue();
      expect(dequeued).toBe('an item');
      expect(queue.size()).toBe(1);
      expect(queue.front()).toBe('another item');
    });
    it('should return undefined when dequeuing an empty queue', () => {
      expect(queue.dequeue()).toBeUndefined();
    });

    it('should clear the queue', () => {
      queue.enqueue('an item');
      queue.enqueue('another item');
      queue.clear();
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.front()).toBeUndefined();
    });

    test('should handle mixed operations', () => {
      queue.enqueue('an item');
      queue.enqueue('another item');
      expect(queue.dequeue()).toBe('an item');
      queue.enqueue('wow, a third item');
      expect(queue.front()).toBe('another item');
      expect(queue.size()).toBe(2);
      expect(queue.dequeue()).toBe('another item');
      expect(queue.dequeue()).toBe('wow, a third item');
      expect(queue.isEmpty()).toBe(true);
    });
  });
});
