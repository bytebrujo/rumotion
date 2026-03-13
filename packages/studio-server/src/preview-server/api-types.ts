import type {IncomingMessage, ServerResponse} from 'node:http';
import type {LogLevel} from '@picus/renderer';
import type {RenderJobWithCleanup} from '@picus/studio-shared';

export type QueueMethods = {
	removeJob: (jobId: string) => void;
	cancelJob: (jobId: string) => void;
	addJob: ({
		job,
		entryPoint,
		picusRoot,
		logLevel,
	}: {
		job: RenderJobWithCleanup;
		entryPoint: string;
		picusRoot: string;
		logLevel: LogLevel;
	}) => void;
};

export type ApiHandler<ReqData, ResData> = (params: {
	input: ReqData;
	entryPoint: string;
	picusRoot: string;
	request: IncomingMessage;
	response: ServerResponse;
	logLevel: LogLevel;
	methods: QueueMethods;
	publicDir: string;
	binariesDirectory: string | null;
}) => Promise<ResData>;
