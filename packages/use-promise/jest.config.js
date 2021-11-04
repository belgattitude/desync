// @ts-check
'use strict';

const { defaults: tsPreset } = require('ts-jest/presets');

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  name: 'use-promise:unit',
  testRunner: 'jest-circus/runner',
  testEnvironment: 'jsdom',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  verbose: true,
  rootDir: '.',
  transform: {
    ...tsPreset.transform,
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  // false by default, overrides in cli, ie: yarn test:unit --collect-coverage=true
  collectCoverage: false,
  coverageDirectory: '<rootDir>/../coverage',
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx,js,jsx}', '!**/*.test.ts'],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};

module.exports = config;
