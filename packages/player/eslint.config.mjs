import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: true});

export default {
	...config,
	rules: {
		...config.rules,
		'no-console': 'error',
		'@typescript-eslint/no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'zod',
						message: 'Can only import zod as a type',
						allowTypeImports: true,
					},
				],
			},
		],
	},
};
