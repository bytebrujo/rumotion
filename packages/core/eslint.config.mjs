import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: true});

export default {
	...config,
	rules: {
		...config.rules,
		'no-console': 'error',
	},
};
