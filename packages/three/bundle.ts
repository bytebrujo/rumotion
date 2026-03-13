import {build} from 'bun';

if (process.env.NODE_ENV !== 'production') {
	throw new Error('This script must be run using NODE_ENV=production');
}

const output = await build({
	entrypoints: ['src/index.ts'],
	naming: '[name].mjs',
	external: [
		'react',
		'picus',
		'@picus/media-utils',
		'picus/no-react',
		'react/jsx-runtime',
		'@react-three/fiber',
		'three/src/textures/VideoTexture.js',
		'three/src/loaders/TextureLoader.js',
	],
});

const [file] = output.outputs;
const text = await file.text();

await Bun.write('dist/esm/index.mjs', text);

export {};
