module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    'testing/structures/(.*)': '<rootDir>/testing/structures/$1',
    'testing/commands/(.*)': '<rootDir>/testing/commands/$1'
  },
}