const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
    '^assets/(.*)': '<rootDir>/src/assets/$1',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^pages/(.*)': '<rootDir>/src/pages/$1',
    '^queries/(.*)': '<rootDir>/src/queries/$1',
    '^styles/(.*)': '<rootDir>/src/styles/$1',
    '^tests/(.*)': '<rootDir>/src/tests/$1',
    '^utils/(.*)': '<rootDir>/src/utils/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/tests/**',
    '!src/**/types.ts',
  ],
};

module.exports = createJestConfig(customJestConfig);
