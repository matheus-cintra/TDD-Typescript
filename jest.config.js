module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverageFrom: [
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
