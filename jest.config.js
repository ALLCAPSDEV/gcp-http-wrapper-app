module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov'],
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': '@swc-node/jest',
  },
};
