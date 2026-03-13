import {picusFlatConfig} from '@picus/eslint-config-internal';

const config = picusFlatConfig({react: true});

export default {
	...config,
	files: [...config.files, 'components/**/*.ts', 'components/**/*.tsx'],
	rules: {
		...config.rules,
		'no-console': 'off',
	},
};
