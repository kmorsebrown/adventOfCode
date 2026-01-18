// https://www.geeksforgeeks.org/javascript/implementation-priority-queue-javascript/
// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

export class PriorityQueue {
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
