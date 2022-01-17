module.exports = {
  roots: ['<rootDir>/src'],
  resetMocks: false,
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/data/test/index.ts',
    '!<rootDir>/src/data/usecases/authentication/index.ts',
    '!<rootDir>/src/domain/models/index.ts',
    '!<rootDir>/src/domain/usecases/index.ts',
    '!<rootDir>/src/presentation/pages/index.tsx',
    '!<rootDir>/src/presentation/components/index.ts',
    '!<rootDir>/src/validations/protocols/index.ts',
    '!<rootDir>/src/presentation/components/router/router.tsx',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
};
