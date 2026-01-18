export class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }
  addVertex(vertex) {
    if (!this.adjacencyList.get(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  addEdge(v1, v2) {
    this.adjacencyList.get(v1).push(v2);
    this.adjacencyList.get(v2).push(v1);
  }
  removeEdge(v1, v2) {
    this.adjacencyList.set(
      v1,
      this.adjacencyList.get(v1).filter((el) => el !== v2)
    );
    this.adjacencyList.set(
      v2,
      this.adjacencyList.get(v2).filter((el) => el !== v1)
    );
  }
  removeVertex(vertex) {
    while (this.adjacencyList.get(vertex).length) {
      let adjacentVertex = this.adjacencyList.get(vertex).pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    this.adjacencyList.delete(vertex);
  }
  printGraph() {
    // get all the vertices
    var get_keys = this.adjacencyList.keys();

    // iterate over the vertices
    for (let i of get_keys) {
      // get the corresponding adjacency list
      // for the vertex
      const get_values = this.adjacencyList.get(i);
      let conc = '';

      // iterate over the adjacency list
      // concatenate the values into a string
      for (let j of get_values) {
        conc += j + ' ';
      }

      // print the vertex and its adjacency list
      console.log(i + ' -> ' + conc);
    }
  }
}
