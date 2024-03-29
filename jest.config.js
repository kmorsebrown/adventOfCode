/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{ts,js}'],
  coveragePathIgnorePatterns: ['DayXX'],
  setupFilesAfterEnv: ['<rootDir>/jestsetup.js'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '/DayXX'],
  verbose: true,
};
