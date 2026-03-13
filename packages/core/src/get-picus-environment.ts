import type {PicusEnvironment} from './picus-environment-context';

// Avoid VITE obfuscation
function getNodeEnvString() {
	return ['NOD', 'E_EN', 'V'].join('');
}

const getEnvString = (): 'env' => {
	return ['e', 'nv'].join('') as 'env';
};

/*
 * @description Provides information about the Picus Environment.
 * @note Prefer using the `usePicusEnvironment()` hook as it will support future scoped contexts for browser rendering scenarios.
 * @see [Documentation](https://picus.dev/docs/get-picus-environment)
 */
export const getPicusEnvironment = (): PicusEnvironment => {
	const isPlayer = typeof window !== 'undefined' && window.picus_isPlayer;
	const isRendering =
		typeof window !== 'undefined' &&
		typeof window.process !== 'undefined' &&
		typeof window.process.env !== 'undefined' &&
		(window.process[getEnvString()][getNodeEnvString()] === 'test' ||
			(window.process[getEnvString()][getNodeEnvString()] === 'production' &&
				typeof window !== 'undefined' &&
				typeof window.picus_puppeteerTimeout !== 'undefined'));
	const isStudio = typeof window !== 'undefined' && window.picus_isStudio;
	const isReadOnlyStudio =
		typeof window !== 'undefined' && window.picus_isReadOnlyStudio;

	return {
		isStudio,
		isRendering,
		isPlayer,
		isReadOnlyStudio,
		isClientSideRendering: false,
	};
};
