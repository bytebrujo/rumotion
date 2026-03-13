import {build} from 'bun';

const output = await build({
	entrypoints: ['src/index.ts'],
	naming: '[name].mjs',
	external: ['react', 'picus', 'picus/no-react', 'react/jsx-runtime'],
});

const [file] = output.outputs;
const text = await file.text();

await Bun.write('dist/esm/index.mjs', text);

export {};
