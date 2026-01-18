/**
 * Constructs the full path to a puzzle input file
 *
 * @param {string} dayNum - Two-digit day number (e.g., '01', '15')
 * @param {string} importMetaUrl - The import.meta.url from the calling module
 * @returns {string} - Absolute path to the puzzle input file
 *
 * @example
 * import { getPuzzleInputPath } from '../../Utils/paths.js';
 * const dataPath = getPuzzleInputPath('01', import.meta.url);
 */
export function getPuzzleInputPath(dayNum, importMetaUrl) {
  return new URL(`../puzzleInputs/Day${dayNum}Input.txt`, importMetaUrl)
    .pathname;
}

/**
 * Constructs the full path to a test data file
 *
 * @param {string} dayNum - Two-digit day number (e.g., '01', '15')
 * @param {string} importMetaUrl - The import.meta.url from the calling module
 * @returns {string} - Absolute path to the test data file
 *
 * @example
 * import { getTestDataPath } from '../../Utils/paths.js';
 * const testPath = getTestDataPath('01', import.meta.url);
 */
export function getTestDataPath(dayNum, importMetaUrl) {
  return new URL(`./Day${dayNum}TestData.txt`, importMetaUrl).pathname;
}
