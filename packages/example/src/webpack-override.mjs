import path from 'node:path';
import {enableScss} from '@picus/enable-scss';
import {enableSkia} from '@picus/skia/enable';
import {enableTailwind} from '@picus/tailwind-v4';

const WEBPACK_OR_ESBUILD = 'esbuild';

const resolveCwd = (p) => {
	return require.resolve(p, {
		paths: [path.join(process.cwd(), 'node_modules')],
	});
};

// this is so the studio live reloads when the CJS modules are changed
// probably a bad idea and we should slowly get rid of the ones which compile MJS with turbo
const aliases = {
	'@picus/gif': resolveCwd('@picus/gif'),
	'@picus/layout-utils': resolveCwd('@picus/layout-utils'),
	'@picus/lottie': resolveCwd('@picus/lottie'),
	'@picus/media-utils': resolveCwd('@picus/media-utils'),
	'@picus/motion-blur': resolveCwd('@picus/motion-blur'),
	'@picus/noise': resolveCwd('@picus/noise'),
	'@picus/paths': resolveCwd('@picus/paths'),
	'@picus/fonts': resolveCwd('@picus/fonts'),
	'@picus/player': resolveCwd('@picus/player'),
	'@picus/preload': resolveCwd('@picus/preload'),
	'@picus/rive': resolveCwd('@picus/rive'),
	'@picus/shapes': resolveCwd('@picus/shapes'),
	'@picus/animated-emoji': resolveCwd('@picus/animated-emoji'),
	'@picus/skia': resolveCwd('@picus/skia'),
	'@picus/three': resolveCwd('@picus/three'),
	'@picus/transitions/fade': resolveCwd('@picus/transitions/fade'),
	'@picus/transitions/slide': resolveCwd('@picus/transitions/slide'),
	'@picus/transitions/flip': resolveCwd('@picus/transitions/flip'),
	'@picus/transitions/clock-wipe': resolveCwd(
		'@picus/transitions/clock-wipe',
	),
	'@picus/transitions/wipe': resolveCwd('@picus/transitions/wipe'),
	'@picus/transitions': resolveCwd('@picus/transitions'),
	'@picus/zod-types': resolveCwd('@picus/zod-types'),
};

/**
 * @typedef {import('@picus/bundler').WebpackOverrideFn} WebpackOverrideFn
 */
export const webpackOverride = (currentConfiguration) => {
	const replaced = (() => {
		if (WEBPACK_OR_ESBUILD === 'webpack') {
			const {replaceLoadersWithBabel} = require(
				path.join(
					// eslint-disable-next-line no-undef
					process.cwd(),
					'..',
					'..',
					'example',
					'node_modules',
					'@picus/babel-loader',
				),
			);
			return replaceLoadersWithBabel(currentConfiguration);
		}

		return currentConfiguration;
	})();
	return enableScss(
		enableSkia(
			enableTailwind({
				...replaced,
				module: {
					...replaced.module,
					rules: [
						...(replaced.module?.rules ?? []),
						{
							test: /\.mdx?$/,
							use: [
								{
									loader: '@mdx-js/loader',
									options: {},
								},
							],
						},
					],
				},
				resolve: {
					...replaced.resolve,
					alias: {
						...replaced.resolve.alias,
						// eslint-disable-next-line no-undef
						lib: path.join(process.cwd(), 'src', 'lib'),

						// ES Modules need to be generated with `pnpm build` in every package
						// So if you just make a change while you run `pnpm watch`, you don't see the difference
						// which is confusing for contributors
						...aliases,
					},
				},
			}),
		),
	);
};
