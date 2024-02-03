export {};
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
      // if your using tsconfig.paths thers is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@/(.*)$': '<rootDir>/src/$1',
      
      // mocking assests and styling
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/mocks/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/__tests__/mocks/styleMock.ts',
    /* mock models and services folder */
    '(assets|models|services)': '<rootDir>/__tests__/mocks/fileMock.ts',
  },
   // to obtain access to the matchers.
  setupFilesAfterEnv: ['./__tests__/setupTests.ts'],
      
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.[jt]s?(x)', '!app/**/*.d.[jt]s?(x)', '!**/*.stories.[jt]s?(x)'],
  coverageReporters: [['text-summary', { file: 'coverage-summary.txt' }]],
};