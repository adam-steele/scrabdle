module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/setupTest.ts'], // Ensure this path matches your setupTests.ts location
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
};
