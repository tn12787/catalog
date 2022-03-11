const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const moduleMap = {
  '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/src/__mocks__/fileMock.ts',
  '^__mocks__/(.*)': '<rootDir>/src/__mocks__/$1',
  '^assets/(.*)': '<rootDir>/src/assets/$1',
  '^backend/(.*)': '<rootDir>/src/backend/$1',
  '^common/(.*)': '<rootDir>/src/common/$1',
  '^components/(.*)': '<rootDir>/src/components/$1',
  '^events/(.*)': '<rootDir>/src/events/$1',
  '^firebaseDetails/(.*)': '<rootDir>/src/firebaseDetails/$1',
  '^images/(.*)': '<rootDir>/src/images/$1',
  '^hooks/(.*)': '<rootDir>/src/hooks/$1',
  '^pages/(.*)': '<rootDir>/src/pages/$1',
  '^queries/(.*)': '<rootDir>/src/queries/$1',
  '^ssr/(.*)': '<rootDir>/src/ssr/$1',
  '^tests/(.*)': '<rootDir>/src/tests/$1',
  '^types/(.*)': '<rootDir>/src/types/$1',
  '^utils/(.*)': '<rootDir>/src/utils/$1',
};

const customJestConfig = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  projects: [
    {
      displayName: 'frontend',
      setupFilesAfterEnv: ['<rootDir>/setupFrontendTests.ts'],
      testMatch: ['<rootDir>/src/tests/frontend/**/*.(test|spec).{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: ['/src/tests/api', '/node_modules/'],
      moduleNameMapper: moduleMap,
      testEnvironment: 'jest-environment-jsdom',
    },
    {
      displayName: 'api',
      setupFilesAfterEnv: ['<rootDir>/setupBackendTests.ts'],
      testMatch: ['<rootDir>/src/tests/api/**/*.(test|spec).{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: ['/src/tests/frontend', '/node_modules/'],
      moduleNameMapper: moduleMap,
      testEnvironment: 'node',
    },
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/tests/**',
    '!src/**/types.ts',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 20,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
