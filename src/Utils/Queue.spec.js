import { Queue } from './Queue.js';

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

  describe('fromArray', () => {
    it('should create a queue from an empty array', () => {
      const emptyArray = [];
      const q = Queue.fromArray(emptyArray);

      // Empty array creates empty queue
      expect(q.isEmpty()).toBe(true);
      expect(q.size()).toBe(0);
      expect(q.front()).toBeUndefined();
    });

    it('should create a queue maintaining FIFO order from array', () => {
      // Array order: [1, 2, 3, 4]
      const q = Queue.fromArray([1, 2, 3, 4]);

      // Queue maintains array order: first in, first out
      expect(q.size()).toBe(4);
      expect(q.front()).toBe(1); // Front is first array element

      // Dequeuing removes from front
      expect(q.dequeue()).toBe(1);
      expect(q.front()).toBe(2); // Next element now at front
      expect(q.size()).toBe(3);

      expect(q.dequeue()).toBe(2);
      expect(q.dequeue()).toBe(3);
      expect(q.dequeue()).toBe(4);
      expect(q.isEmpty()).toBe(true);
    });

    it('should preserve string order when creating queue from array', () => {
      const commands = ['start', 'process', 'finish'];
      const q = Queue.fromArray(commands);

      expect(q.size()).toBe(3);

      // Commands execute in order they were added
      expect(q.dequeue()).toBe('start');   // First command
      expect(q.dequeue()).toBe('process'); // Second command
      expect(q.dequeue()).toBe('finish');  // Third command
      expect(q.isEmpty()).toBe(true);
    });

    it('should maintain object references from array', () => {
      const task1 = { id: 1, name: 'Task A' };
      const task2 = { id: 2, name: 'Task B' };
      const tasks = [task1, task2];

      const q = Queue.fromArray(tasks);

      expect(q.size()).toBe(2);

      // Same object reference, not a copy
      const dequeuedTask = q.dequeue();
      expect(dequeuedTask).toBe(task1);
      expect(dequeuedTask.name).toBe('Task A');

      // Modifying original object affects dequeued reference
      task2.name = 'Task B Modified';
      expect(q.front().name).toBe('Task B Modified');
    });
  });

  describe('Symbol.iterator', () => {
    it('should be a consuming iterator that dequeues as it iterates', () => {
      const q = Queue.fromArray([1, 2, 3, 4, 5]);

      // Before iteration: queue has 5 items
      expect(q.size()).toBe(5);

      const result = [];
      for (const item of q) {
        result.push(item);
        // Each iteration dequeues an item from the queue
      }

      // After iteration: all items consumed
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(q.isEmpty()).toBe(true); // Queue is now empty!
      expect(q.size()).toBe(0);
    });

    it('should handle empty queue iteration without errors', () => {
      const q = new Queue();
      const result = [];

      // Iterating over empty queue doesn't crash
      for (const item of q) {
        result.push(item); // Never executes
      }

      expect(result).toEqual([]);
      expect(q.isEmpty()).toBe(true);
    });

    it('should demonstrate early exit with break (and dequeue behavior)', () => {
      const q = Queue.fromArray([1, 2, 3, 4, 5]);
      const processed = [];

      for (const item of q) {
        // Process items until we hit 3
        if (item === 3) {
          // Breaking AFTER dequeuing 3 but BEFORE processing it
          break;
        }
        processed.push(item);
      }

      // We processed 1 and 2, then broke when we saw 3
      expect(processed).toEqual([1, 2]);

      // IMPORTANT: Item 3 was already dequeued when we checked the condition!
      // So queue now contains: [4, 5]
      expect(q.size()).toBe(2);
      expect(q.front()).toBe(4);
      expect(q.toArray()).toEqual([4, 5]);
    });

    it('should work with spread operator (consumes entire queue)', () => {
      const q = Queue.fromArray(['a', 'b', 'c']);

      // Spread operator uses Symbol.iterator internally
      const arr = [...q];

      expect(arr).toEqual(['a', 'b', 'c']);
      // Queue is consumed by spread operator
      expect(q.isEmpty()).toBe(true);
    });

    it('should demonstrate the difference between consuming and non-consuming', () => {
      const original = [10, 20, 30];

      // Consuming: for...of with Symbol.iterator
      const q1 = Queue.fromArray(original);
      const consumed = [];
      for (const item of q1) {
        consumed.push(item);
      }
      expect(consumed).toEqual([10, 20, 30]);
      expect(q1.isEmpty()).toBe(true); // Queue destroyed!

      // Non-consuming: toArray()
      const q2 = Queue.fromArray(original);
      const preserved = q2.toArray();
      expect(preserved).toEqual([10, 20, 30]);
      expect(q2.size()).toBe(3); // Queue still intact!
    });
  });

  describe('toArray', () => {
    it('should be non-destructive (queue remains unchanged)', () => {
      const q = Queue.fromArray([1, 2, 3, 4]);

      // Before toArray: queue has 4 items
      expect(q.size()).toBe(4);

      // Convert to array
      const arr = q.toArray();

      // After toArray: queue STILL has 4 items (non-destructive!)
      expect(arr).toEqual([1, 2, 3, 4]);
      expect(q.size()).toBe(4); // Queue unchanged
      expect(q.front()).toBe(1); // Front still at 1

      // Can still dequeue from queue
      expect(q.dequeue()).toBe(1);
      expect(q.size()).toBe(3);
    });

    it('should return empty array for empty queue', () => {
      const emptyQueue = new Queue();

      const arr = emptyQueue.toArray();

      expect(arr).toEqual([]);
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBe(0);
    });

    it('should snapshot queue state at current moment', () => {
      const q = new Queue();

      // Build up queue with some operations
      q.enqueue('first');
      q.enqueue('second');
      q.dequeue(); // Remove 'first'
      q.enqueue('third');

      // toArray shows current state: ['second', 'third']
      const snapshot = q.toArray();
      expect(snapshot).toEqual(['second', 'third']);

      // Queue operations after snapshot don't affect the array
      q.enqueue('fourth');
      expect(snapshot).toEqual(['second', 'third']); // Unchanged
      expect(q.toArray()).toEqual(['second', 'third', 'fourth']);
    });

    it('should create independent array instances', () => {
      const q = Queue.fromArray([1, 2, 3]);

      const arr1 = q.toArray();
      const arr2 = q.toArray();

      // Same content
      expect(arr1).toEqual(arr2);
      expect(arr1).toEqual([1, 2, 3]);

      // Different array objects
      expect(arr1).not.toBe(arr2);

      // Modifying one doesn't affect the other
      arr1.push(999);
      expect(arr1).toEqual([1, 2, 3, 999]);
      expect(arr2).toEqual([1, 2, 3]); // Unchanged
    });
  });

  describe('clone', () => {
    it('should create truly independent queue copies', () => {
      const q1 = Queue.fromArray([1, 2, 3]);

      // Clone creates separate queue with same content
      const q2 = q1.clone();

      // Initially identical
      expect(q1.size()).toBe(3);
      expect(q2.size()).toBe(3);
      expect(q1.toArray()).toEqual([1, 2, 3]);
      expect(q2.toArray()).toEqual([1, 2, 3]);

      // Modify original queue
      q1.dequeue(); // Remove 1
      expect(q1.size()).toBe(2);
      expect(q1.toArray()).toEqual([2, 3]);

      // Clone is unaffected!
      expect(q2.size()).toBe(3);
      expect(q2.toArray()).toEqual([1, 2, 3]);
    });

    it('should clone empty queue correctly', () => {
      const emptyQueue = new Queue();
      const clonedEmpty = emptyQueue.clone();

      // Both are empty
      expect(emptyQueue.isEmpty()).toBe(true);
      expect(clonedEmpty.isEmpty()).toBe(true);

      // Adding to one doesn't affect the other
      clonedEmpty.enqueue('something');
      expect(emptyQueue.isEmpty()).toBe(true); // Still empty
      expect(clonedEmpty.size()).toBe(1);
    });

    it('should clone queue preserving current state (not original state)', () => {
      const q1 = new Queue();

      // Build up queue with operations
      q1.enqueue('a');
      q1.enqueue('b');
      q1.enqueue('c');
      q1.dequeue(); // Remove 'a', queue is now ['b', 'c']

      // Clone captures CURRENT state, not original
      const q2 = q1.clone();
      expect(q2.toArray()).toEqual(['b', 'c']); // Not ['a', 'b', 'c']!

      // Both queues can be modified independently
      q1.enqueue('original');
      q2.enqueue('clone');

      expect(q1.toArray()).toEqual(['b', 'c', 'original']);
      expect(q2.toArray()).toEqual(['b', 'c', 'clone']);
    });

    it('should perform SHALLOW copy (objects share references)', () => {
      const sharedObject = { count: 1 };
      const q1 = Queue.fromArray([sharedObject]);
      const q2 = q1.clone();

      // Both queues contain reference to SAME object
      expect(q1.front()).toBe(sharedObject); // Same reference
      expect(q2.front()).toBe(sharedObject); // Same reference

      // Mutating the object affects BOTH queues
      sharedObject.count = 999;
      expect(q1.front().count).toBe(999);
      expect(q2.front().count).toBe(999); // Also changed!

      // But queue operations are independent
      q1.dequeue();
      expect(q1.isEmpty()).toBe(true);
      expect(q2.size()).toBe(1); // Clone still has the object
    });

    it('should be useful for branching queue processing', () => {
      // Scenario: Try two different processing strategies
      const tasks = Queue.fromArray(['task1', 'task2', 'task3']);

      // Strategy A: process all tasks
      const strategyA = tasks.clone();
      const resultA = [];
      for (const task of strategyA) {
        resultA.push(task);
      }
      expect(resultA).toEqual(['task1', 'task2', 'task3']);
      expect(strategyA.isEmpty()).toBe(true);

      // Strategy B: process only first 2 tasks (using different approach)
      const strategyB = tasks.clone();
      const resultB = [];
      resultB.push(strategyB.dequeue()); // task1
      resultB.push(strategyB.dequeue()); // task2
      // Don't dequeue task3

      expect(resultB).toEqual(['task1', 'task2']);
      expect(strategyB.size()).toBe(1); // 'task3' remains
      expect(strategyB.front()).toBe('task3');

      // Original queue unchanged by either strategy
      expect(tasks.size()).toBe(3);
      expect(tasks.toArray()).toEqual(['task1', 'task2', 'task3']);
    });
  });

  describe('real-world usage patterns from AoC solutions', () => {
    it('should replace the old manual enqueue loop pattern', () => {
      // OLD PATTERN (before fromArray):
      const input = ['L10', 'R25', 'L5', 'R30'];
      let oldQueue = new Queue();
      for (let i = 0; i < input.length; i++) {
        oldQueue.enqueue(input[i]);
      }

      // NEW PATTERN (with fromArray):
      const newQueue = Queue.fromArray(input);

      // Both produce identical queues
      expect(oldQueue.toArray()).toEqual(newQueue.toArray());
      expect(oldQueue.size()).toBe(newQueue.size());
    });

    it('should replace the old while+dequeue loop pattern', () => {
      const rotations = ['L10', 'R25', 'L5'];

      // OLD PATTERN (before Symbol.iterator):
      const oldQueue = Queue.fromArray(rotations);
      const oldResults = [];
      while (!oldQueue.isEmpty()) {
        const rotation = oldQueue.front();
        oldResults.push(rotation);
        oldQueue.dequeue();
      }

      // NEW PATTERN (with for...of):
      const newQueue = Queue.fromArray(rotations);
      const newResults = [];
      for (const rotation of newQueue) {
        newResults.push(rotation);
      }

      // Both produce identical results
      expect(newResults).toEqual(oldResults);
      expect(newResults).toEqual(['L10', 'R25', 'L5']);
    });

    it('should demonstrate complete before/after refactor', () => {
      const input = [1, 2, 3, 4, 5];
      let sum = 0;

      // ========== BEFORE ==========
      let oldQueue = new Queue();
      for (let i = 0; i < input.length; i++) {
        oldQueue.enqueue(input[i]);
      }

      while (!oldQueue.isEmpty()) {
        let num = oldQueue.front();
        sum += num;
        oldQueue.dequeue();
      }
      expect(sum).toBe(15);

      // ========== AFTER ==========
      sum = 0; // Reset
      const newQueue = Queue.fromArray(input);
      for (const num of newQueue) {
        sum += num;
      }
      expect(sum).toBe(15);

      // Same result, 10 lines → 4 lines! 🎉
    });
  });
});
