import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: true});

const flatConfig = {
	...config,
	rules: {
		...config.rules,
		'no-console': 'error',
	},
};

export default flatConfig;
