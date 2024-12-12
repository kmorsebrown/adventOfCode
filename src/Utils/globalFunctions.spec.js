const { getData, Queue, Graph } = require('./globalFunctions.js');
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
});
