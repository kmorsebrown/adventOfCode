/**
 * Queue - First In First Out (FIFO) data structure
 *
 * Efficient implementation using an object with head/tail pointers
 * instead of an array to avoid O(n) shift() operations.
 * All operations (enqueue, dequeue, front) are O(1).
 */

export class Queue {
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

  /**
   * Creates a Queue from an array of items
   * @param {Array} array - Array of items to enqueue
   * @returns {Queue} - A new Queue instance with all items enqueued
   *
   * @example
   * const queue = Queue.fromArray([1, 2, 3, 4]);
   * queue.front(); // 1
   * queue.size();  // 4
   */
  static fromArray(array) {
    const queue = new Queue();
    array.forEach(item => queue.enqueue(item));
    return queue;
  }

  /**
   * Makes Queue iterable using for...of loops
   * Note: This is a consuming iterator - it dequeues items as it iterates
   *
   * @example
   * const queue = Queue.fromArray([1, 2, 3]);
   * for (const item of queue) {
   *   console.log(item); // 1, 2, 3
   * }
   * queue.isEmpty(); // true (queue is now empty)
   */
  *[Symbol.iterator]() {
    while (!this.isEmpty()) {
      yield this.dequeue();
    }
  }

  /**
   * Converts queue to array without modifying the queue
   * @returns {Array} - Array containing all queue elements in order
   *
   * @example
   * const queue = Queue.fromArray([1, 2, 3]);
   * const arr = queue.toArray(); // [1, 2, 3]
   * queue.size(); // 3 (queue unchanged)
   */
  toArray() {
    const elements = [];
    for (let i = this.head; i < this.tail; i++) {
      elements.push(this.data[i]);
    }
    return elements;
  }

  /**
   * Creates a shallow copy of the queue
   * @returns {Queue} - A new Queue with the same elements
   *
   * @example
   * const queue1 = Queue.fromArray([1, 2, 3]);
   * const queue2 = queue1.clone();
   * queue1.dequeue();
   * queue1.size(); // 2
   * queue2.size(); // 3
   */
  clone() {
    const newQueue = new Queue();
    for (let i = this.head; i < this.tail; i++) {
      newQueue.enqueue(this.data[i]);
    }
    return newQueue;
  }
}
