class Graph {
  constructor() {
    this = new Map();
  }
  addList(item, val) {
    if (!this.get(item)) {
      this.set(item, { value: val, parent: '', children: [] });
    }
  }
  addChild(list1, list2) {
    this.get(list1).children.push(list2);
    this.get(list2).parent = list1;
  }
  getValue(item) {
    return JSON.parse(this.get(item).value);
  }
  getParent(item) {
    return this.get(item).parent;
  }
  getChildren(item) {
    return this.get(item).children;
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

const data = {
  left: [
    '[1,1,3,1,1]',
    '[[1],[2,3,4]]',
    '[9]',
    '[[4,4],4,4]',
    '[7,7,7,7]',
    '[]',
    '[[[]]]',
    '[1,[2,[3,[4,[5,6,7]]]],8,9]',
  ],
  right: [
    '[1,1,5,1,1]',
    '[[1],4]',
    '[[8,7,6]]',
    '[[4,4],4,4,4]',
    '[7,7,7]',
    '[3]',
    '[[]]',
    '[1,[2,[3,[4,[5,6,0]]]],8,9]',
  ],
};

let checked = [];
let g = new Graph();

let queue = new Queue();

for (let pi = 0; pi < data.left.length; pi++) {
  const packet = data.left[pi];
  const packetName = 'L' + pi;
  g.addList(packetName, packet);
  queue.enqueue(packetName);
}

for (let pi = 0; pi < data.right.length; pi++) {
  const packet = data.right[pi];
  const packetName = 'R' + pi;
  g.addList(packetName, packet);
  queue.enqueue(packetName);
}

while (!queue.isEmpty()) {
  let item = queue.front();
  let value = g.getValue(item);

  if (Array.isArray(value)) {
    value.forEach((v, i) => {
      let newList = `${item}.${i}`;
      g.addList(newList, JSON.stringify(v));
      g.addChild(item, newList);
      queue.enqueue(newList);
    });
  }

  queue.dequeue();
}

console.log(g);
