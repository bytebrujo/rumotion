import type {LogLevel} from '@picus/renderer';
import {RenderInternals} from '@picus/renderer';

let message: string | null = null;

export const setServerReadyComment = (newMessage: string) => {
	message = newMessage;
};

export const printServerReadyComment = (prefix: string, logLevel: LogLevel) => {
	RenderInternals.Log.info({indent: false, logLevel}, `${prefix} - ${message}`);
};
