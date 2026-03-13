import type {LogLevel} from '@picus/renderer';
import {RenderInternals} from '@picus/renderer';
import type {ServerlessRoutines} from '@picus/serverless-client';

export type PrintLoggingHelper = (
	type: ServerlessRoutines,
	data: Record<string, string | boolean>,
	logLevel: LogLevel,
) => void;

export const printLoggingGrepHelper: PrintLoggingHelper = (
	type,
	data,
	logLevel,
) => {
	const d = Object.keys(data).reduce((a, b) => {
		return [...a, `${b}=${data[b]}`];
	}, [] as string[]);
	const msg = [`method=${type}`, ...d].join(',');
	RenderInternals.Log.info({indent: false, logLevel}, msg);
};
