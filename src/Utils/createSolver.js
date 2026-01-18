/**
 * Creates a standardized solve function for Advent of Code puzzles
 *
 * @param {Function} formatData - Async function that takes a filepath and returns formatted data
 * @param {Function} partOne - Async function that solves part one
 * @param {Function} partTwo - Async function that solves part two
 * @param {string} dayNum - Two-digit day number (e.g., '01', '15')
 * @param {string} importMetaUrl - The import.meta.url from the calling day file
 * @returns {Function} - An async solve function ready to export
 *
 * @example
 * import { createSolver } from '../../Utils/createSolver.js';
 *
 * async function formatData(filepath) { ... }
 * async function partOne(input) { ... }
 * async function partTwo(input) { ... }
 *
 * const solve = createSolver(formatData, partOne, partTwo, '01', import.meta.url);
 *
 * export { formatData, partOne, partTwo, solve };
 */
export function createSolver(
  formatData,
  partOne,
  partTwo,
  dayNum,
  importMetaUrl
) {
  return async function solve() {
    const dataPath = new URL(
      `../puzzleInputs/Day${dayNum}Input.txt`,
      importMetaUrl
    ).pathname;

    try {
      const formattedData = await formatData(dataPath);
      const results = await Promise.all([
        partOne(formattedData),
        partTwo(formattedData),
      ]);
      return results;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
