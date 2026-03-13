import {existsSync} from 'node:fs';
import path from 'node:path';
import {BrowserSafeApis} from '@picus/renderer/client';
import {loadConfigFile} from './load-config';
import {Log} from './log';
import {parsedCli} from './parsed-cli';

const {configOption} = BrowserSafeApis.options;

const defaultConfigFileJavascript = 'picus.config.js';
const defaultConfigFileTypescript = 'picus.config.ts';

export const loadConfig = (picusRoot: string): Promise<string | null> => {
	const configFile = configOption.getValue({commandLine: parsedCli}).value;
	if (configFile) {
		const fullPath = path.resolve(process.cwd(), configFile);
		if (!existsSync(fullPath)) {
			Log.error(
				{indent: false, logLevel: 'error'},
				`You specified a config file location of "${configFile}" but no file under ${fullPath} was found.`,
			);
			process.exit(1);
		}

		return loadConfigFile(picusRoot, configFile, fullPath.endsWith('.js'));
	}

	if (picusRoot === null) {
		return Promise.resolve(null);
	}

	if (existsSync(path.resolve(picusRoot, defaultConfigFileTypescript))) {
		return loadConfigFile(picusRoot, defaultConfigFileTypescript, false);
	}

	if (existsSync(path.resolve(picusRoot, defaultConfigFileJavascript))) {
		return loadConfigFile(picusRoot, defaultConfigFileJavascript, true);
	}

	return Promise.resolve(null);
};
