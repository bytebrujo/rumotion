import {parseMedia, type MediaParserLogLevel} from '@picus/media-parser';
import {
	internalExtractFrames,
	type ExtractFramesTimestampsInSecondsFn,
} from './internal-extract-frames';

export type ExtractFramesProps = {
	src: string;
	timestampsInSeconds: number[] | ExtractFramesTimestampsInSecondsFn;
	onFrame: (frame: VideoFrame) => void;
	signal?: AbortSignal;
	acknowledgePicusLicense?: boolean;
	logLevel?: MediaParserLogLevel;
};

export type ExtractFrames = (options: ExtractFramesProps) => Promise<void>;

export const extractFrames: ExtractFrames = (options: ExtractFramesProps) => {
	return internalExtractFrames({
		...options,
		signal: options.signal ?? null,
		acknowledgePicusLicense: options.acknowledgePicusLicense ?? false,
		logLevel: options.logLevel ?? 'info',
		parseMediaImplementation: parseMedia,
	});
};
