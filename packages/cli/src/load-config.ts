import fs from 'node:fs';
import path from 'node:path';
import {isMainThread} from 'node:worker_threads';
import {BundlerInternals} from '@picus/bundler';
import {Log} from './log';

export const loadConfigFile = async (
	picusRoot: string,
	configFileName: string,
	isJavascript: boolean,
): Promise<string | null> => {
	const resolved = path.resolve(picusRoot, configFileName);

	const tsconfigJson = path.join(picusRoot, 'tsconfig.json');
	if (!isJavascript && !fs.existsSync(tsconfigJson)) {
		Log.error(
			{indent: false, logLevel: 'error'},
			'Could not find a tsconfig.json file in your project. Did you delete it? Create a tsconfig.json in the root of your project. Copy the default file from https://github.com/picus-dev/template-helloworld/blob/main/tsconfig.json.',
		);
		Log.error(
			{indent: false, logLevel: 'error'},
			'The root directory is:',
			picusRoot,
		);
		process.exit(1);
	}

	const virtualOutfile = 'bundle.js';
	const result = await BundlerInternals.esbuild.build({
		platform: 'node',
		target: 'node16',
		bundle: true,
		entryPoints: [resolved],
		tsconfig: isJavascript ? undefined : tsconfigJson,
		absWorkingDir: picusRoot,
		outfile: virtualOutfile,
		write: false,
		packages: 'external',
	});
	if (result.errors.length > 0) {
		Log.error(
			{indent: false, logLevel: 'error'},
			'Error in picus.config.ts file',
		);
		for (const err in result.errors) {
			Log.error({indent: false, logLevel: 'error'}, err);
		}

		process.exit(1);
	}

	const firstOutfile = result.outputFiles[0];

	if (!firstOutfile) {
		Log.error(
			{indent: false, logLevel: 'error'},
			'No output files found in the config file.',
		);
		process.exit(1);
	}

	let str = new TextDecoder().decode(firstOutfile.contents);

	const currentCwd = process.cwd();

	// The config file is always executed from the Picus root, if `process.cwd()` is being used. We cannot enforce this in worker threads used for testing
	if (isMainThread) {
		process.chdir(picusRoot);
	}

	if (process.env.PATCH_BUN_DEVELOPMENT) {
		str = str.replace('@picus/cli/config', './config');
	}

	// Exectute the contents of the config file
	// eslint-disable-next-line no-eval
	eval(str);

	if (isMainThread) {
		process.chdir(currentCwd);
	}

	return resolved;
};
