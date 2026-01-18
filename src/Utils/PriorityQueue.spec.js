import { PriorityQueue } from './PriorityQueue.js';

describe('PriorityQueue', () => {
  describe('initialization and basic operations', () => {
    it('should create an empty queue and handle basic state checks', () => {
      const pq = new PriorityQueue();
      expect(pq.isEmpty()).toBe(true);
      expect(pq.size()).toBe(0);
      expect(pq.peek()).toBeNull();
      expect(pq.pop()).toBeNull();
    });

    it('should accept a custom comparator for max heap', () => {
      const maxHeap = new PriorityQueue((a, b) => b < a);
      maxHeap.push(1, 5, 3);
      expect(maxHeap.pop()).toBe(5);
    });
  });

  describe('push() and peek()', () => {
    it('should add elements and maintain min heap order', () => {
      const pq = new PriorityQueue();
      expect(pq.push(5)).toBe(1);
      expect(pq.peek()).toBe(5);
      expect(pq.size()).toBe(1);

      pq.push(3, 7, 1);
      expect(pq.size()).toBe(4);
      expect(pq.peek()).toBe(1);
    });

    it('should maintain heap order with custom comparator and objects', () => {
      const pq = new PriorityQueue((a, b) => a.priority - b.priority < 0);
      pq.push(
        { value: 'low', priority: 10 },
        { value: 'high', priority: 1 },
        { value: 'medium', priority: 5 }
      );
      expect(pq.peek()).toEqual({ value: 'high', priority: 1 });
    });
  });

  describe('pop()', () => {
    it('should remove and return elements in priority order', () => {
      const pq = new PriorityQueue();
      pq.push(5, 3, 7, 1, 9, 2);

      expect(pq.pop()).toBe(1);
      expect(pq.size()).toBe(5);

      const result = [];
      while (!pq.isEmpty()) {
        result.push(pq.pop());
      }
      expect(result).toEqual([2, 3, 5, 7, 9]);
      expect(pq.isEmpty()).toBe(true);
    });

    it('should handle objects in priority order', () => {
      const pq = new PriorityQueue((a, b) => a.priority - b.priority < 0);
      pq.push(
        { value: 'low', priority: 10 },
        { value: 'high', priority: 1 },
        { value: 'medium', priority: 5 }
      );

      expect(pq.pop().value).toBe('high');
      expect(pq.pop().value).toBe('medium');
      expect(pq.pop().value).toBe('low');
    });
  });

  describe('replace()', () => {
    it('should handle empty queue by pushing new value', () => {
      const pq = new PriorityQueue();
      const result = pq.replace(5);
      expect(result).toBeNull();
      expect(pq.peek()).toBe(5);
    });

    it('should replace top element and maintain heap property', () => {
      const pq = new PriorityQueue();
      pq.push(1, 3, 5);

      const replaced = pq.replace(4);
      expect(replaced).toBe(1);
      expect(pq.peek()).toBe(3);

      // Verify heap integrity by replacing with smaller value
      pq.push(10, 15, 20);
      pq.replace(2);
      expect(pq.pop()).toBe(2);
    });

    it('should work with objects and custom comparator', () => {
      const pq = new PriorityQueue((a, b) => a.priority - b.priority < 0);
      pq.push(
        { value: 'first', priority: 1 },
        { value: 'second', priority: 5 }
      );
      const replaced = pq.replace({ value: 'new', priority: 3 });
      expect(replaced.value).toBe('first');
      expect(pq.peek().value).toBe('new');
    });
  });

  describe('custom comparators', () => {
    it('should work as max heap', () => {
      const maxHeap = new PriorityQueue((a, b) => b - a < 0);
      maxHeap.push(1, 5, 3, 9, 2);
      const result = [];
      while (!maxHeap.isEmpty()) {
        result.push(maxHeap.pop());
      }
      expect(result).toEqual([9, 5, 3, 2, 1]);
    });

    it('should sort by multiple fields', () => {
      const pq = new PriorityQueue((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority < 0;
        return a.timestamp - b.timestamp < 0;
      });

      pq.push(
        { value: 'later', priority: 1, timestamp: 200 },
        { value: 'first', priority: 1, timestamp: 100 },
        { value: 'low', priority: 5, timestamp: 50 }
      );

      expect(pq.pop().value).toBe('first');
      expect(pq.pop().value).toBe('later');
      expect(pq.pop().value).toBe('low');
    });

    it('should handle string comparison', () => {
      const pq = new PriorityQueue((a, b) => a.localeCompare(b) < 0);
      pq.push('banana', 'apple', 'cherry');
      expect(pq.pop()).toBe('apple');
      expect(pq.pop()).toBe('banana');
      expect(pq.pop()).toBe('cherry');
    });
  });

  describe('edge cases', () => {
    it('should handle duplicate values', () => {
      const pq = new PriorityQueue();
      pq.push(3, 1, 3, 1, 2);
      expect(pq.pop()).toBe(1);
      expect(pq.pop()).toBe(1);
      expect(pq.pop()).toBe(2);
      expect(pq.pop()).toBe(3);
      expect(pq.pop()).toBe(3);
    });

    it('should handle negative and mixed sign numbers', () => {
      const pq = new PriorityQueue();
      pq.push(-5, 3, -10, 0, 7);
      expect(pq.pop()).toBe(-10);
      expect(pq.pop()).toBe(-5);
      expect(pq.pop()).toBe(0);
      expect(pq.pop()).toBe(3);
      expect(pq.pop()).toBe(7);
    });

    it('should handle large number of elements', () => {
      const pq = new PriorityQueue();
      const numbers = Array.from({ length: 1000 }, () =>
        Math.floor(Math.random() * 10000)
      );
      pq.push(...numbers);

      const sorted = [...numbers].sort((a, b) => a - b);
      const result = [];
      while (!pq.isEmpty()) {
        result.push(pq.pop());
      }
      expect(result).toEqual(sorted);
    });
  });
});
