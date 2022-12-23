const fs = require('fs');
const path = require('path');

// key consts
const PART1_KEY = 'Part1';
const PART2_KEY = 'Part2';

async function getData(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

const appendFile = async (filePath, newLine) => {
  try {
    await fs.promises.readFile(filePath);
    await fs.promises.appendFile(filePath, newLine);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

class Graph {
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

// Queue class
class Queue {
  // Array is used to implement a Queue
  constructor() {
    this.items = [];
  }

  // Functions to be implemented
  enqueue(element) {
    // adds an element at the rear of the queue
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) {
      // returns underflow when called on empty queue
      return 'Underflow';
    }
    // removes element from the front of a queue
    return this.items.shift();
  }
  front() {
    if (this.isEmpty()) {
      return 'No elements in Queue';
    }
    // returns the front element of the queue
    return this.items[0];
  }
  isEmpty() {
    // return true if the queue is empty
    return this.items.length == 0;
  }
  printQueue() {
    let str = '';
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + ' ';
    }
    return str;
  }
}

module.exports = {
  getData,
  appendFile,
  PART1_KEY,
  PART2_KEY,
  Graph,
  Queue,
};
