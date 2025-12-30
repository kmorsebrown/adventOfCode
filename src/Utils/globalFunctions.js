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
  }

  // adds an element at the rear of the queue
  enqueue(item) {
    this.data[this.tail] = item;
    this.tail++;
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
  }

  // Get the front element without removing it
  front() {
    if (this.isEmpty()) {
      console.error('Queue is empty');
      return undefined;
    }

    return this.data[this.head];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }

  clear() {
    this.data = {};
    this.head = 0;
    this.tail = 0;
  }

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
  }
}

function handleLargeArray(data) {
  const MAX_ARRAY_LENGTH = Math.pow(2, 32) - 2; // Maximum allowed array length in JavaScript

  if (data.length > MAX_ARRAY_LENGTH) {
    // Handle the large array
    const chunks = [];
    let startIndex = 0;

    while (startIndex < data.length) {
      const endIndex = Math.min(startIndex + MAX_ARRAY_LENGTH, data.length);
      const chunk = data.slice(startIndex, endIndex);
      chunks.push(chunk);
      startIndex = endIndex;
    }

    // Process the chunks
    for (const chunk of chunks) {
      // Your logic to process each chunk
      console.log('Processing chunk:', chunk);
    }
  } else {
    // Process the array directly
    console.log('Processing array:', data);
  }
}

// https://www.geeksforgeeks.org/javascript/implementation-priority-queue-javascript/
// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

class PriorityQueue {
  static #top = 0;
  static #parent(i) {
    return ((i + 1) >>> 1) - 1;
  }
  static #left(i) {
    return (i << 1) + 1;
  }
  static #right(i) {
    return (i + 1) << 1;
  }

  #heap;
  #comparator;

  // smaller values have priority by default
  constructor(comparator = (a, b) => a - b < 0) {
    this.#heap = [];
    this.#comparator = comparator;
  }

  // Public Methods
  size() {
    return this.#heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.#heap[PriorityQueue.#top] ?? null;
  }

  push(...values) {
    for (const value of values) {
      this.#heap.push(value);
      this.#siftUp();
    }
    return this.size();
  }

  pop() {
    if (this.#heap.length === 0) return null;
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > PriorityQueue.#top) {
      this.#swap(PriorityQueue.#top, bottom);
    }
    this.#heap.pop();
    this.#siftDown();
    return poppedValue;
  }

  replace(value) {
    if (this.#heap.length === 0) {
      this.#heap.push(value);
      return null;
    }
    const replacedValue = this.peek();
    this.#heap[PriorityQueue.#top] = value;
    this.#siftDown();
    return replacedValue;
  }

  // Private methods
  #isHigherPriority(i, j) {
    return this.#comparator(this.#heap[i], this.#heap[j]);
  }

  #swap(i, j) {
    [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
  }

  #siftUp() {
    let node = this.#heap.length - 1;
    while (
      node > PriorityQueue.#top &&
      this.#isHigherPriority(node, PriorityQueue.#parent(node))
    ) {
      this.#swap(node, PriorityQueue.#parent(node));
      node = PriorityQueue.#parent(node);
    }
  }

  #siftDown() {
    const { length } = this.#heap;
    let node = PriorityQueue.#top;

    while (
      (PriorityQueue.#left(node) < length &&
        this.#isHigherPriority(PriorityQueue.#left(node), node)) ||
      (PriorityQueue.#right(node) < length &&
        this.#isHigherPriority(PriorityQueue.#right(node), node))
    ) {
      const bestChild =
        PriorityQueue.#right(node) < length &&
        this.#isHigherPriority(
          PriorityQueue.#right(node),
          PriorityQueue.#left(node)
        )
          ? PriorityQueue.#right(node)
          : PriorityQueue.#left(node);

      this.#swap(node, bestChild);
      node = bestChild;
    }
  }
}

module.exports = {
  getData,
  appendFile,
  PART1_KEY,
  PART2_KEY,
  Graph,
  Queue,
  PriorityQueue,
};
