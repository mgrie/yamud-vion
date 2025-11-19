/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testMatch: [
        "**/tests/**/*.test.ts",
        "**/__tests__/**/*.test.ts"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ]
};
