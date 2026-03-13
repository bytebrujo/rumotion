import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: true});

export default {
	...config,
	rules: {
		...config.rules,
		'no-console': 'error',
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					'@picus/*/src',
					'@picus/*/src/*',
					'@picus/*/dist/*',
					'picus/src/*',
				],
			},
		],
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'zod',
						message: 'Can only import zod as a type',
						allowTypeImports: true,
					},
					{
						name: '@picus/zod-types',
						message: 'Can only import @picus/zod-types as a type',
						allowTypeImports: true,
					},
				],
			},
		],
	},
};
