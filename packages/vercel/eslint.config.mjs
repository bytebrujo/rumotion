import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: false});

export default [
	config,
	{
		files: ['src/scripts/**'],
		rules: {
			'no-console': 'off',
			'prefer-destructuring': 'off',
		},
	},
];
