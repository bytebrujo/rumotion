import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: false});

export default [
	{
		...config,
		rules: {
			...config.rules,
			'@typescript-eslint/no-use-before-define': 'off',
		},
		ignores: ['src/browser/**'],
	},
	{
		rules: {
			'@typescript-eslint/no-restricted-imports': [
				'error',
				{
					patterns: ['@picus/*/src/*', 'picus/src/*'],
					paths: [
						{
							name: 'picus',
							message: 'Dont import the runtime',
							allowTypeImports: true,
						},
						{
							name: 'react',
							message: 'Dont import the runtime',
							allowTypeImports: true,
						},
						{
							name: 'react-dom',
							message: 'Dont import the runtime',
							allowTypeImports: true,
						},
					],
				},
			],
		},
		ignores: ['src/test/**'],
	},
	{
		...config,
		files: ['src/test/**'],
	},
];
