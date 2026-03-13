import {buildPackage} from '../.monorepo/builder';

const external = [
	'react',
	'picus',
	'react-dom',
	'react',
	'@picus/media-utils',
	'@picus/studio-shared',
	'@picus/zod-types',
	'@picus/renderer',
	'@picus/player',
	'@picus/renderer/client',
	'@picus/renderer/pure',
	'@picus/web-renderer',
	'@picus/renderer/error-handling',
	'source-map',
	'zod',
	'picus/no-react',
	'react/jsx-runtime',
	'mediabunny',
];

await buildPackage({
	formats: {
		esm: 'build',
		cjs: 'use-tsc',
	},
	external,
	entrypoints: [
		{
			path: 'src/index.ts',
			target: 'browser',
		},
		{
			path: 'src/renderEntry.tsx',
			target: 'browser',
			splitting: true,
		},
		{
			path: 'src/internals.ts',
			target: 'browser',
		},
		{
			path: 'src/previewEntry.tsx',
			target: 'browser',
		},
	],
});
