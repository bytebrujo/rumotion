import React from 'react';
import {cancelRender, Internals, type LogLevel} from 'picus';
import {makeAudioManager} from './audio-extraction/audio-manager';
import {makeKeyframeManager} from './video-extraction/keyframe-manager';

// Frames can be out of order, but we don't expect them to be more than 0.2 seconds out of order
export const getSafeWindowOfMonotonicity = (fps: number) => (0.2 * 30) / fps;

export const keyframeManager = makeKeyframeManager();
export const audioManager = makeAudioManager();

export const getTotalCacheStats = () => {
	const keyframeManagerCacheStats = keyframeManager.getCacheStats();
	const audioManagerCacheStats = audioManager.getCacheStats();

	return {
		count: keyframeManagerCacheStats.count + audioManagerCacheStats.count,
		totalSize:
			keyframeManagerCacheStats.totalSize + audioManagerCacheStats.totalSize,
	};
};

const getUncachedMaxCacheSize = (logLevel: LogLevel) => {
	if (
		typeof window !== 'undefined' &&
		window.picus_mediaCacheSizeInBytes !== undefined &&
		window.picus_mediaCacheSizeInBytes !== null
	) {
		if (window.picus_mediaCacheSizeInBytes < 240 * 1024 * 1024) {
			cancelRender(
				new Error(
					`The minimum value for the "mediaCacheSizeInBytes" prop is 240MB (${240 * 1024 * 1024}), got: ${window.picus_mediaCacheSizeInBytes}`,
				),
			);
		}

		if (window.picus_mediaCacheSizeInBytes > 20_000 * 1024 * 1024) {
			cancelRender(
				new Error(
					`The maximum value for the "mediaCacheSizeInBytes" prop is 20GB (${20000 * 1024 * 1024}), got: ${window.picus_mediaCacheSizeInBytes}`,
				),
			);
		}

		Internals.Log.verbose(
			{logLevel, tag: '@picus/media'},
			`Using cache size set using "mediaCacheSizeInBytes": ${(window.picus_mediaCacheSizeInBytes / 1024 / 1024).toFixed(1)} MB`,
		);
		return window.picus_mediaCacheSizeInBytes;
	}

	if (
		typeof window !== 'undefined' &&
		window.picus_initialMemoryAvailable !== undefined &&
		window.picus_initialMemoryAvailable !== null
	) {
		const value = window.picus_initialMemoryAvailable / 2;
		if (value < 500 * 1024 * 1024) {
			Internals.Log.verbose(
				{logLevel, tag: '@picus/media'},
				`Using cache size set based on minimum value of 500MB (which is more than half of the available system memory!)`,
			);
			return 500 * 1024 * 1024;
		}

		if (value > 20_000 * 1024 * 1024) {
			Internals.Log.verbose(
				{logLevel, tag: '@picus/media'},
				`Using cache size set based on maximum value of 20GB (which is less than half of the available system memory)`,
			);
			return 20_000 * 1024 * 1024;
		}

		Internals.Log.verbose(
			{logLevel, tag: '@picus/media'},
			`Using cache size set based on available memory (50% of available memory): ${(value / 1024 / 1024).toFixed(1)} MB`,
		);
		return value;
	}

	return 1000 * 1000 * 1000; // 1GB
};

let cachedMaxCacheSize: number | null = null;

export const getMaxVideoCacheSize = (logLevel: LogLevel) => {
	if (cachedMaxCacheSize !== null) {
		return cachedMaxCacheSize;
	}

	cachedMaxCacheSize = getUncachedMaxCacheSize(logLevel);
	return cachedMaxCacheSize;
};

export const useMaxMediaCacheSize = (logLevel: LogLevel) => {
	const context = React.useContext(Internals.MaxMediaCacheSizeContext);
	if (context === null) {
		return getMaxVideoCacheSize(logLevel);
	}

	return context;
};
