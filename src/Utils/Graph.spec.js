import { Graph } from './Graph.js';
import { jest } from '@jest/globals';

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

    const spy = jest.spyOn(console, 'log').mockImplementation();
    graph.printGraph();

    expect(spy).toHaveBeenCalledWith('A -> B C D ');
    expect(spy).toHaveBeenCalledWith('B -> A D ');
    expect(spy).toHaveBeenCalledWith('C -> A D ');
    spy.mockRestore();
  });
});
