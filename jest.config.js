/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          allowJs: true,
          module: 'esnext',
        },
      },
    ],
  },
  transformIgnorePatterns: [],
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{ts,js}'],
  coveragePathIgnorePatterns: ['DayXX'],
  setupFilesAfterEnv: ['<rootDir>/jestsetup.js'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '/DayXX'],
  verbose: true,
};
