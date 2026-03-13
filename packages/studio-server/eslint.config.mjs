import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: false});

export default {
	...config,
	rules: {
		...config.rules,
		'no-console': 'error',
		'@typescript-eslint/no-use-before-define': 'off',
	},
};
