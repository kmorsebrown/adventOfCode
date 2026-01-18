import fs from 'fs';
import { Queue } from './Queue.js';
import { Graph } from './Graph.js';
import { PriorityQueue } from './PriorityQueue.js';

// key consts
export const PART1_KEY = 'Part1';
export const PART2_KEY = 'Part2';

// Re-export classes for backward compatibility
export { Queue, Graph, PriorityQueue };

export async function getData(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export const appendFile = async (filePath, newLine) => {
  try {
    await fs.promises.readFile(filePath);
    await fs.promises.appendFile(filePath, newLine);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export function handleLargeArray(data) {
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
