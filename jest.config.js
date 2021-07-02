module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    'tests/commands/(.*)': '<rootDir>/tests/commands/$1'
  },
}