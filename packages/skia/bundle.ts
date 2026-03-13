import {build} from 'bun';

if (process.env.NODE_ENV !== 'production') {
	throw new Error('This script must be run using NODE_ENV=production');
}

const mainModule = await build({
	entrypoints: ['src/index.ts'],
	naming: '[name].mjs',
	external: [
		'react',
		'picus',
		'picus/no-react',
		'react/jsx-runtime',
		'@shopify/react-native-skia',
	],
});

const [file] = mainModule.outputs;
const text = await file.text();

await Bun.write('dist/esm/index.mjs', text);

const skiaModule = await build({
	entrypoints: ['src/enable.ts'],
	naming: '[name].mjs',
	target: 'node',
	external: ['@picus/bundler', 'canvaskit-wasm/bin/full/canvaskit.wasm'],
});

const [enableFile] = skiaModule.outputs;
const skiaEnable = await enableFile.text();

await Bun.write('dist/esm/enable.mjs', skiaEnable);

export {};
