import type {LogLevel} from '@picus/renderer';
import {StudioServerInternals} from '@picus/studio-server';
import {Log} from './log';

export const lambdaCommand = async (
	picusRoot: string,
	args: string[],
	logLevel: LogLevel,
) => {
	try {
		const path = require.resolve('@picus/lambda', {
			paths: [picusRoot],
		});
		const {LambdaInternals} = require(path);

		await LambdaInternals.executeCommand(
			args,
			picusRoot,
			logLevel,
			null,
			null,
		);
		process.exit(0);
	} catch (err) {
		const manager = StudioServerInternals.getPackageManager({
			picusRoot,
			packageManager: undefined,
			dirUp: 0,
			logLevel,
		});
		const installCommand =
			manager === 'unknown' ? 'npm i' : manager.installCommand;
		Log.error({indent: false, logLevel}, err);
		Log.error({indent: false, logLevel}, 'Picus Lambda is not installed.');
		Log.info({indent: false, logLevel}, '');
		Log.info({indent: false, logLevel}, 'You can install it using:');
		Log.info(
			{indent: false, logLevel},
			`${installCommand} @picus/lambda@${StudioServerInternals.getPicusVersion()}`,
		);
		process.exit(1);
	}
};
