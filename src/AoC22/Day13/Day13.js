const fs = require('fs');
const path = require('path');
const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2022/day/13

// Unifinished WIP

// seperate packets into left and right
async function formatData(filepath) {
  const data = await getData(filepath);
  const splitData = data.split('\n\n').map((pair) => pair.split('\n'));
  return {
    left: splitData.map((x) => x[0]),
    right: splitData.map((x) => x[1]),
  };
}

// create a graph of all the lists
class Graph {
  constructor() {
    this.list = new Map();
  }
  addList(item, val) {
    if (!this.list.get(item)) {
      this.list.set(item, { value: val, parent: '', children: [] });
    }
  }
  addChild(list1, list2) {
    this.list.get(list1).children.push(list2);
    this.list.get(list2).parent = list1;
  }
  getValue(item) {
    return JSON.parse(this.list.get(item).value);
  }
  getParent(item) {
    return this.list.get(item).parent;
  }
  getChildren(item) {
    return this.list.get(item).children;
  }
}

async function generateGraph(input) {
  let g = new Graph();

  let queue = new Queue();

  for (let pi = 0; pi < input.left.length; pi++) {
    const packet = input.left[pi];
    const packetName = 'L' + pi;
    g.addList(packetName, packet);
    queue.enqueue(packetName);
  }

  for (let pi = 0; pi < input.right.length; pi++) {
    const packet = input.right[pi];
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
  return g;
}

// Part One

// compare left and right values

// if both integers
// if left < right, correct order
// if right < left, wrong order
// if left = right, compare next value

// if both lists
// compare values of each list in order - follow existing comparison rules
// if integer values within a list are equal
// if left_list.length < right_list.length, correct order
// if right_list.length < left_list.length , wrong order
// if equal lengths, compare next value

// if one value is an integer and the other is a list
// convert integer to a list containing the integer as its only value
// try the comparison again

async function partOne(input) {
  return input;
}

// Part Two
async function partTwo(input) {
  return input;
}

async function runDay13() {
  const dataPath = require.resolve(
    '../../../src/AoC22/puzzleInputs/Day13Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  formatData,
  generateGraph,
  Graph,
  partOne,
  partTwo,
  runDay13,
};
