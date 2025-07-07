module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': ['ts-jest', {
        tsconfig: {
            jsx: 'react-jsx',
            esModuleInterop: true,
        }
      }],
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(d3-array|d3)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '\\.(css|scss|svg)$': 'identity-obj-proxy',
      'd3': '<rootDir>/node_modules/d3/dist/d3.min.js',
    },
  };
  