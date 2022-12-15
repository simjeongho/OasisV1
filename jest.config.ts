const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	clearMocks: true,
	moduleNameMapper: {
		'hooks/(.*)': '<rootDir>/hooks/$1',
		'components/(.*)': '<rootDir>/components/$1',
		'pages/(.*)': '<rootDir>/pages/$1',
		'utils/(.*)': '<rootDir>/utils/$1',
		'stores/(.*)': '<rootDir>/stores/$1',
		'constants/(.*)': '<rootDir>/constants/$1',
		'apis/(.*)': '<rootDir>/apis/$1',
		'types/(.*)': '<rootDir>/types/$1',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
};

module.exports = createJestConfig(customJestConfig);

export {};
