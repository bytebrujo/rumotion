import {type MediaParserLogLevel} from '@picus/media-parser';
import {parseMediaOnWebWorker} from '@picus/media-parser/worker';
import {
	internalExtractFrames,
	type ExtractFramesTimestampsInSecondsFn,
} from './internal-extract-frames';

export type ExtractFramesOnWebWorkerProps = {
	src: string;
	timestampsInSeconds: number[] | ExtractFramesTimestampsInSecondsFn;
	onFrame: (frame: VideoFrame) => void;
	signal?: AbortSignal;
	acknowledgePicusLicense?: boolean;
	logLevel?: MediaParserLogLevel;
};

export type ExtractFramesOnWebWorker = (
	options: ExtractFramesOnWebWorkerProps,
) => Promise<void>;

export const extractFramesOnWebWorker: ExtractFramesOnWebWorker = (
	options: ExtractFramesOnWebWorkerProps,
) => {
	return internalExtractFrames({
		...options,
		signal: options.signal ?? null,
		acknowledgePicusLicense: options.acknowledgePicusLicense ?? false,
		logLevel: options.logLevel ?? 'info',
		parseMediaImplementation: parseMediaOnWebWorker,
	});
};
