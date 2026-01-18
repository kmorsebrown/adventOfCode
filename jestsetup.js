import { jest } from '@jest/globals';

global.console = {
  log: jest.fn(),
  debug: console.debug,
  trace: console.trace,
  group: jest.fn(),
  error: console.error,
  groupEnd: jest.fn(),
  info: console.info,
  // map other methods that you want to use like console.table
};
