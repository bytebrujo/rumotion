import type {LogLevel} from '@picus/renderer';
import {ensureBrowser} from '@picus/renderer';
import {BrowserSafeApis} from '@picus/renderer/client';
import {defaultBrowserDownloadProgress} from '../browser-download-bar';
import {Log} from '../log';
import {parsedCli, quietFlagProvided} from '../parsed-cli';

const {browserExecutableOption} = BrowserSafeApis.options;

export const ENSURE_COMMAND = 'ensure';

export const ensureCommand = async (logLevel: LogLevel) => {
	const indent = false;

	const browserExecutable = browserExecutableOption.getValue({
		commandLine: parsedCli,
	}).value;

	const status = await ensureBrowser({
		browserExecutable,
		logLevel,
		onBrowserDownload: defaultBrowserDownloadProgress({
			indent,
			logLevel,
			quiet: quietFlagProvided(),
			onProgress: () => undefined,
		}),
	});

	if (status.type === 'no-browser') {
		throw new Error('should have downloaded browser');
	}

	if (status.type === 'user-defined-path') {
		Log.info({indent, logLevel}, `Has browser at ${status.path}`);
		return;
	}

	if (status.type === 'local-puppeteer-browser') {
		Log.info({indent, logLevel}, `Has browser at ${status.path}`);
	}
};
