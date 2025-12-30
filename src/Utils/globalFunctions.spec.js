const {
  getData,
  Queue,
  Graph,
  PriorityQueue,
} = require('./globalFunctions.js');
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

    it('should handle mixed operations', () => {
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

  describe('Graph', () => {
    let graph;

    beforeEach(() => {
      graph = new Graph();
    });

    it('should add multiple vertices correctly', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      expect(graph.adjacencyList.get('A')).toEqual([]);
      expect(graph.adjacencyList.get('B')).toEqual([]);
      expect(graph.adjacencyList.get('C')).toEqual([]);
    });

    it('should add multiple edges correctly', () => {
      graph.addVertex('A');
      /*
       A
      */
      graph.addVertex('B');
      /*
       A.B
      */
      graph.addVertex('C');
      /*
       A.B
       ...
       C..
      */
      graph.addEdge('A', 'B');
      /*
       A-B
       ...
       C..
      */
      graph.addEdge('A', 'C');
      /*
       A-B
       |..
       C..
      */
      graph.addEdge('B', 'C');
      /*
       A-B
       |/.
       C..
      */

      expect(graph.adjacencyList.get('A')).toEqual(['B', 'C']);
      expect(graph.adjacencyList.get('B')).toEqual(['A', 'C']);
      expect(graph.adjacencyList.get('C')).toEqual(['A', 'B']);
    });

    it('should remove edges correctly in a graph with multiple vertices', () => {
      /* 
        before:  after:
        A-B      A.B
        |/.      |/.
        C..      C..
     */
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'C');

      graph.removeEdge('A', 'B');
      expect(graph.adjacencyList.get('A')).toEqual(['C']);
      expect(graph.adjacencyList.get('B')).toEqual(['C']);
    });

    it('should remove a vertex and its associated edges in a graph with multiple vertices', () => {
      /* 
        before:  after:
        A-B    A.B
        |/.    ./.
        C..    C..
     */

      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'C');

      graph.removeVertex('A');

      expect(graph.adjacencyList.has('A')).toBe(false);
      expect(graph.adjacencyList.get('B')).toEqual(['C']);
      expect(graph.adjacencyList.get('C')).toEqual(['B']);
    });

    it('should handle a graph with disconnected components', () => {
      /* graph:
        A-B
        |.|
        C-D
     */
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addVertex('D');
      graph.addEdge('A', 'B');
      graph.addEdge('C', 'D');

      expect(graph.adjacencyList.get('A')).toEqual(['B']);
      expect(graph.adjacencyList.get('B')).toEqual(['A']);
      expect(graph.adjacencyList.get('C')).toEqual(['D']);
      expect(graph.adjacencyList.get('D')).toEqual(['C']);
    });

    it('should correctly print a graph with multiple vertices and edges', () => {
      /* graph:
        A-B
        |\|
        C-D
     */
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addVertex('D');
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('A', 'D');
      graph.addEdge('B', 'D');
      graph.addEdge('C', 'D');

      console.log = jest.fn();
      graph.printGraph();

      expect(console.log).toHaveBeenCalledWith('A -> B C D ');
      expect(console.log).toHaveBeenCalledWith('B -> A D ');
      expect(console.log).toHaveBeenCalledWith('C -> A D ');
    });
  });

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
});
