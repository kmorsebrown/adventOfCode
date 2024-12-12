const fs = require('fs');

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
  /*
    Could implement with an array, but it's inefficient for dequeue (removing from the front)
    because shift() has O(n) complexity (n = num elements) b/c all subsequent elements must be shifted

    More efficient approach is to use an object with two pointers: head and tail
    This avoids shifting elements and keeps all operations at constant time O(1)
  */
  constructor() {
    this.data = {}; // Object to store queue elements
    this.head = 0; // Pointer to the front of the queue
    this.tail = 0; // Pointer to the next available position

    /* array implementation for posterity

      this.items = [];

    */
  }

  // adds an element at the rear of the queue
  enqueue(item) {
    this.data[this.tail] = item;
    this.tail++;

    /* array implementation for posterity

      this.items.push(element);

    */
  }

  // Remove an element from the front of the queue
  dequeue() {
    if (this.isEmpty()) {
      console.error('Queue is empty');
      return undefined;
    }

    const item = this.data[this.head];
    delete this.data[this.head]; // Clean up memory
    this.head++;
    return item;

    /* array implementation for posterity

      return this.items.shift();

    */
  }

  // Get the front element without removing it
  front() {
    if (this.isEmpty()) {
      console.error('Queue is empty');
      return undefined;
    }

    return this.data[this.head];

    /* array implementation for posterity

      return this.items[this.frontIndex];

    */
  }

  // Check if the queue is empty
  isEmpty() {
    return this.head === this.tail;
    /* array implementation for posterity

    return this.items.length == 0;

    */
  }

  // Get the size of the queue
  size() {
    return this.tail - this.head;
  }

  // Clear the queue
  clear() {
    this.data = {};
    this.head = 0;
    this.tail = 0;
  }

  // Print the queue elements

  printQueue() {
    if (this.isEmpty()) {
      console.log('Queue is empty');
      return;
    }

    const elements = [];
    for (let i = this.head; i < this.tail; i++) {
      elements.push(this.data[i]);
    }
    console.log(elements.join(' -> ')); // Customize format as needed

    /* array implementation for posterity

      let str = '';
      for (let i = 0; i < this.items.length; i++) {
        str += this.items[i] + ' ';
      }
      return str;

    */
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
