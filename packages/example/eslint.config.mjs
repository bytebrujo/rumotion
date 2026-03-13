import {config} from '@picus/eslint-config-flat';

export default [
	...config,
	{
		ignores: ['**/webpack-override.mjs'],
	},
];
