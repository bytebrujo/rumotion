import type {LogLevel} from 'picus';
import {Internals} from 'picus';
import type {GetSink} from './video-extraction/get-frames-since-keyframe';
import {getSinks} from './video-extraction/get-frames-since-keyframe';

export const sinkPromises: Record<string, Promise<GetSink>> = {};

export const getSink = (src: string, logLevel: LogLevel) => {
	let promise = sinkPromises[src];
	if (!promise) {
		Internals.Log.verbose(
			{
				logLevel,
				tag: '@picus/media',
			},
			`Sink for ${src} was not found, creating new sink`,
		);
		promise = getSinks(src);
		sinkPromises[src] = promise;
	}

	return promise;
};
