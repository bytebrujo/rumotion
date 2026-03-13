import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: false});

export default [
	{
		ignores: ['src/test/integration/renders/old-version-bundle/**'],
	},
	{
		...config,
		ignores: ['src/cli/**'],
		rules: {
			...config.rules,
			'no-console': 'off',
			'arrow-body-style': 'off',
			'no-restricted-imports': [
				'error',
				{
					patterns: ['@picus/cli', '@picus/*/src/*', 'picus/src/*'],
					paths: ['picus', 'react', 'react-dom'],
				},
			],
		},
	},
	{
		...config,
		files: ['src/cli/**.ts'],
		rules: {
			'no-console': 'error',
			'no-restricted-imports': [
				'error',
				{
					patterns: ['@picus/*/src/*', 'picus/src/*'],
					paths: ['picus', 'react', 'react-dom'],
				},
			],
		},
	},
];
