'use strict';

const path = require('path');

const configPath = path.join(__dirname, '/../../config/jest');

module.exports = {
  name: 'unit',
  displayName: 'unit',
  verbose: true,
  testURL: 'http://localhost/',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
  setupFiles: [`${configPath}/jest.stubs.ts`],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', `${configPath}/jest.tests.ts`],
  //roots: ['<rootDir>/../../', '<rootDir>/../../'],
  testMatch: ['<rootDir>/test/**/*.{spec,test}.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    '^.+\\.css$': `${configPath}/cssTransform.js`,
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': `${configPath}/fileTransform.js`,
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss|less)$'],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${configPath}/fileTransform.js`,
  },

  globals: {
    window: {},
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
