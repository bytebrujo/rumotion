import type {Browser} from '@picus/renderer';

const currentBrowser: Browser | null = null;

export const getBrowser = () => {
	return currentBrowser;
};
