module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testMatch: ['<rootDir>/__tests__/**/*.test.js'],
    testEnvironment: 'jsdom',
};