/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/lib/prisma$': '<rootDir>/tests/mocks/prisma.ts',
    '^@/lib/telemetry$': '<rootDir>/tests/mocks/telemetry.ts',
    '^@clerk/nextjs/server$': '<rootDir>/tests/mocks/clerkServer.ts'
  },
  // Run this setup file before tests to provide minimal env and mocks
  setupFiles: ['<rootDir>/tests/jest.setup.ts'],
};
