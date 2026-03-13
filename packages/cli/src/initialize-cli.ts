import path from 'path';
import type {LogLevel} from '@picus/renderer';
import {BrowserSafeApis} from '@picus/renderer/client';
import {loadConfig} from './get-config-file-name';
import {makeHyperlink} from './hyperlinks/make-link';
import {Log} from './log';
import {parseCommandLine} from './parse-command-line';
import {parsedCli} from './parsed-cli';

export const initializeCli = async (
	picusRoot: string,
): Promise<LogLevel> => {
	const appliedName = await loadConfig(picusRoot);

	parseCommandLine();
	const logLevel = BrowserSafeApis.options.logLevelOption.getValue({
		commandLine: parsedCli,
	}).value;
	// Only now Log.verbose is available
	Log.verbose(
		{indent: false, logLevel},
		'Picus root directory:',
		makeHyperlink({
			fallback: picusRoot,
			text: path.relative(process.cwd(), picusRoot) || '.',
			url: `file://${picusRoot}`,
		}),
	);
	if (picusRoot !== process.cwd()) {
		Log.warn(
			{indent: false, logLevel},
			`Warning: The root directory of your project is ${picusRoot}, but you are executing this command from ${process.cwd()}. The recommendation is to execute commands from the root directory.`,
		);
	}

	if (appliedName) {
		Log.verbose(
			{indent: false, logLevel},
			`Applied configuration from ${makeHyperlink({url: `file://${appliedName}`, text: path.relative(process.cwd(), appliedName), fallback: appliedName})}.`,
		);
	} else {
		Log.verbose({indent: false, logLevel}, 'No config file loaded.');
	}

	return logLevel;
};
