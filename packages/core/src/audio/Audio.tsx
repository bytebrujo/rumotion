/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {forwardRef, useCallback, useContext} from 'react';
import {getAbsoluteSrc} from '../absolute-src.js';
import {calculateMediaDuration} from '../calculate-media-duration.js';
import {cancelRender} from '../cancel-render.js';
import {addSequenceStackTraces} from '../enable-sequence-stack-traces.js';
import {Loop} from '../loop/index.js';
import {usePreload} from '../prefetch.js';
import {Sequence} from '../Sequence.js';
import {usePicusEnvironment} from '../use-picus-environment.js';
import {useVideoConfig} from '../use-video-config.js';
import {validateMediaProps} from '../validate-media-props.js';
import {
	resolveTrimProps,
	validateMediaTrimProps,
} from '../validate-start-from-props.js';
import {DurationsContext} from '../video/duration-state.js';
import {AudioForPreview} from './AudioForPreview.js';
import {AudioForRendering} from './AudioForRendering.js';
import type {PicusAudioProps, PicusMainAudioProps} from './props.js';
import {SharedAudioContext} from './shared-audio-tags.js';

const AudioRefForwardingFunction: React.ForwardRefRenderFunction<
	HTMLAudioElement,
	PicusAudioProps &
		PicusMainAudioProps & {
			/**
			 * @deprecated For internal use only
			 */
			readonly stack?: string;
		}
> = (props, ref) => {
	const audioContext = useContext(SharedAudioContext);
	const {
		startFrom,
		endAt,
		trimBefore,
		trimAfter,
		name,
		stack,
		pauseWhenBuffering,
		showInTimeline,
		onError: onPicusError,
		...otherProps
	} = props;
	const {loop, ...propsOtherThanLoop} = props;
	const {fps} = useVideoConfig();
	const environment = usePicusEnvironment();

	if (environment.isClientSideRendering) {
		throw new Error(
			'<Html5Audio> is not supported in @picus/web-renderer. Use <Audio> from @picus/media instead. See https://picus.dev/docs/client-side-rendering/limitations',
		);
	}

	const {durations, setDurations} = useContext(DurationsContext);
	if (typeof props.src !== 'string') {
		throw new TypeError(
			`The \`<Html5Audio>\` tag requires a string for \`src\`, but got ${JSON.stringify(
				props.src,
			)} instead.`,
		);
	}

	const preloadedSrc = usePreload(props.src);

	const onError: React.ReactEventHandler<HTMLAudioElement> = useCallback(
		(e) => {
			// eslint-disable-next-line no-console
			console.log(e.currentTarget.error);

			// If there is no `loop` property, we don't need to get the duration
			// and this does not need to be a fatal error
			const errMessage = `Could not play audio with src ${preloadedSrc}: ${e.currentTarget.error}. See https://picus.dev/docs/media-playback-error for help.`;

			if (loop) {
				if (onPicusError) {
					onPicusError(new Error(errMessage));
					return;
				}

				cancelRender(new Error(errMessage));
			} else {
				onPicusError?.(new Error(errMessage));
				// eslint-disable-next-line no-console
				console.warn(errMessage);
			}
		},
		[loop, onPicusError, preloadedSrc],
	);

	const onDuration = useCallback(
		(src: string, durationInSeconds: number) => {
			setDurations({type: 'got-duration', durationInSeconds, src});
		},
		[setDurations],
	);

	const durationFetched =
		durations[getAbsoluteSrc(preloadedSrc)] ??
		durations[getAbsoluteSrc(props.src)];

	validateMediaTrimProps({startFrom, endAt, trimBefore, trimAfter});

	const {trimBeforeValue, trimAfterValue} = resolveTrimProps({
		startFrom,
		endAt,
		trimBefore,
		trimAfter,
	});

	if (loop && durationFetched !== undefined) {
		if (!Number.isFinite(durationFetched)) {
			return (
				<Html5Audio
					{...propsOtherThanLoop}
					ref={ref}
					_picusInternalNativeLoopPassed
				/>
			);
		}

		const duration = durationFetched * fps;

		return (
			<Loop
				layout="none"
				durationInFrames={calculateMediaDuration({
					trimAfter: trimAfterValue,
					mediaDurationInFrames: duration,
					playbackRate: props.playbackRate ?? 1,
					trimBefore: trimBeforeValue,
				})}
			>
				<Html5Audio
					{...propsOtherThanLoop}
					ref={ref}
					_picusInternalNativeLoopPassed
				/>
			</Loop>
		);
	}

	if (
		typeof trimBeforeValue !== 'undefined' ||
		typeof trimAfterValue !== 'undefined'
	) {
		return (
			<Sequence
				layout="none"
				from={0 - (trimBeforeValue ?? 0)}
				showInTimeline={false}
				durationInFrames={trimAfterValue}
				name={name}
			>
				<Html5Audio
					_picusInternalNeedsDurationCalculation={Boolean(loop)}
					pauseWhenBuffering={pauseWhenBuffering ?? false}
					{...otherProps}
					ref={ref}
				/>
			</Sequence>
		);
	}

	validateMediaProps(
		{playbackRate: props.playbackRate, volume: props.volume},
		'Html5Audio',
	);

	if (environment.isRendering) {
		return (
			<AudioForRendering
				onDuration={onDuration}
				{...props}
				ref={ref}
				onNativeError={onError}
				_picusInternalNeedsDurationCalculation={Boolean(loop)}
			/>
		);
	}

	return (
		<AudioForPreview
			_picusInternalNativeLoopPassed={
				props._picusInternalNativeLoopPassed ?? false
			}
			_picusInternalStack={stack ?? null}
			shouldPreMountAudioTags={
				audioContext !== null && audioContext.numberOfAudioTags > 0
			}
			{...props}
			ref={ref}
			onNativeError={onError}
			onDuration={onDuration}
			// Proposal: Make this default to true in v5
			pauseWhenBuffering={pauseWhenBuffering ?? false}
			_picusInternalNeedsDurationCalculation={Boolean(loop)}
			showInTimeline={showInTimeline ?? true}
		/>
	);
};

/**
 * @description With this component, you can add audio to your video. All audio formats which are supported by Chromium are supported by the component.
 * @see [Documentation](https://picus.dev/docs/html5-audio)
 */
export const Html5Audio = forwardRef(AudioRefForwardingFunction);
addSequenceStackTraces(Html5Audio);

/**
 * @deprecated This component has been renamed to `Html5Audio`.
 * @see [Documentation](https://picus.dev/docs/mediabunny/new-video)
 */
export const Audio = Html5Audio;
