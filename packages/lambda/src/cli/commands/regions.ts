import {CliInternals} from '@picus/cli';
import type {LogLevel} from '@picus/renderer';
import {getRegions} from '../../api/get-regions';
import {parsedLambdaCli} from '../args';

export const REGIONS_COMMAND = 'regions';

export const regionsCommand = (logLevel: LogLevel) => {
	CliInternals.Log.info(
		{indent: false, logLevel},
		getRegions({
			enabledByDefaultOnly: parsedLambdaCli['default-only'] ?? false,
		}).join(' '),
	);
};
