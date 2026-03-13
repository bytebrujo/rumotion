import {buildPackage} from '../.monorepo/builder';

await buildPackage({
	formats: {
		cjs: 'build',
		esm: 'build',
	},
	external: ['@picus/layout-utils', '@picus/paths'],
	entrypoints: [
		{
			path: 'src/index.ts',
			target: 'node',
		},
	],
});
