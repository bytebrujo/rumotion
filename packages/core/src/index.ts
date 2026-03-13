import './_check-rsc.js';
import './asset-types.js';
import {Clipper} from './Clipper.js';
import type {Codec} from './codec.js';
import type {
	AnyCompMetadata,
	AnyComposition,
	AudioOrVideoAsset,
	LoopDisplay,
	SequenceControls,
	TRenderAsset,
} from './CompositionManager.js';
import type {DelayRenderScope} from './delay-render.js';
import {addSequenceStackTraces} from './enable-sequence-stack-traces.js';
import type {StaticFile} from './get-static-files.js';
import {useIsPlayer} from './is-player.js';
import type {LogLevel} from './log.js';
import {checkMultiplePicusVersions} from './multiple-versions-warning.js';
import {Null} from './Null.js';
import type {ProResProfile} from './prores-profile.js';
import type {PixelFormat, VideoImageFormat} from './render-types.js';
import type {
	SequenceFieldSchema,
	SequenceSchema,
} from './sequence-field-schema.js';
import {Sequence} from './Sequence.js';
import type {UseBufferState} from './use-buffer-state';
import type {VideoConfig} from './video-config.js';

export type VideoConfigWithSerializedProps = Omit<
	VideoConfig,
	'defaultProps' | 'props'
> & {
	serializedDefaultPropsWithCustomSchema: string;
	serializedResolvedPropsWithCustomSchema: string;
};

declare global {
	interface Window {
		picus_renderReady: boolean;
		picus_delayRenderTimeouts: {
			[key: string]: {
				label: string | null;
				timeout: number | Timer;
				startTime: number;
			};
		};
		picus_delayRenderHandles: number[];
		picus_cancelledError: string | undefined;
		picus_getCompositionNames: () => string[];
		// Fallback list of seen composition IDs, populated as early as possible by <Composition>
		picus_seenCompositionIds: string[];
		getStaticCompositions: () => Promise<VideoConfigWithSerializedProps[]>;
		picus_calculateComposition: (
			compId: string,
		) => Promise<VideoConfigWithSerializedProps>;
		picus_setBundleMode: (bundleMode: BundleState) => void;
		picus_staticBase: string;
		picus_staticFiles: StaticFile[];
		picus_publicPath: string;
		picus_publicFolderExists: string | null;
		picus_editorName: string | null;
		picus_ignoreFastRefreshUpdate: number | null;
		picus_numberOfAudioTags: number;
		picus_audioLatencyHint: AudioContextLatencyCategory | undefined;
		picus_logLevel: LogLevel;
		picus_projectName: string;
		picus_cwd: string;
		picus_studioServerCommand: string;
		picus_setFrame: (
			frame: number,
			composition: string,
			attempt: number,
		) => void;
		picus_attempt: number;
		picus_initialFrame: number;
		picus_proxyPort: number;
		picus_audioEnabled: boolean;
		picus_videoEnabled: boolean;
		picus_puppeteerTimeout: number;
		picus_broadcastChannel: BroadcastChannel | undefined;
		picus_inputProps: string;
		picus_envVariables: string;
		picus_isMainTab: boolean;
		picus_mediaCacheSizeInBytes: number | null;
		picus_initialMemoryAvailable: number | null;
		picus_collectAssets: () => TRenderAsset[];
		picus_isPlayer: boolean;
		picus_isStudio: boolean;
		picus_isReadOnlyStudio: boolean;
		picus_isBuilding: undefined | (() => void);
		picus_finishedBuilding: undefined | (() => void);
		siteVersion: '11';
		picus_version: string;
		picus_imported: string | boolean;
		picus_unsavedProps: boolean | undefined;
	}
}

export type BundleCompositionState = {
	type: 'composition';
	compositionName: string;
	serializedResolvedPropsWithSchema: string;
	compositionHeight: number;
	compositionDurationInFrames: number;
	compositionWidth: number;
	compositionFps: number;
	compositionDefaultCodec: Codec;
	compositionDefaultOutName: string | null;
	compositionDefaultVideoImageFormat: VideoImageFormat | null;
	compositionDefaultPixelFormat: PixelFormat | null;
	compositionDefaultProResProfile: ProResProfile | null;
};

export type BundleIndexState = {
	type: 'index';
};

export type BundleEvaluationState = {
	type: 'evaluation';
};

export type BundleState =
	| BundleIndexState
	| BundleEvaluationState
	| BundleCompositionState;

checkMultiplePicusVersions();
export * from './AbsoluteFill.js';
export * from './animated-image/index.js';
export type {AnyZodObject} from './any-zod-type.js';
export {Artifact} from './Artifact.js';
export {Audio, Html5Audio, PicusAudioProps} from './audio/index.js';
export type {LoopVolumeCurveBehavior} from './audio/use-audio-frame.js';
export {cancelRender} from './cancel-render.js';
export type {Codec} from './codec.js';
export {
	CalculateMetadataFunction,
	Composition,
	CompositionProps,
	CompProps,
	StillProps,
} from './Composition.js';
export type {CanvasContent} from './CompositionManagerContext.js';
export {getInputProps} from './config/input-props.js';
export {continueRender, delayRender} from './delay-render.js';
export {DownloadBehavior} from './download-behavior.js';
export * from './easing.js';
export * from './Folder.js';
export * from './freeze.js';
export type {NonceHistory} from './nonce.js';
export {getPicusEnvironment} from './get-picus-environment.js';
export {getStaticFiles, StaticFile} from './get-static-files.js';
export * from './IFrame.js';
export {Img, ImgProps} from './Img.js';
export * from './internals.js';
export {interpolateColors} from './interpolate-colors.js';
export {LogLevel} from './log.js';
export {Loop} from './loop/index.js';
export {
	EasingFunction,
	ExtrapolateType,
	interpolate,
	InterpolateOptions,
	random,
	RandomSeed,
} from './no-react';
export {prefetch, PrefetchOnProgress} from './prefetch.js';
export {registerRoot} from './register-root.js';
export type {PixelFormat, VideoImageFormat} from './render-types.js';
export {
	AbsoluteFillLayout,
	LayoutAndStyle,
	Sequence,
	SequenceProps,
	SequencePropsWithoutDuration,
} from './Sequence.js';
export {Series} from './series/index.js';
export * from './spring/index.js';
export {staticFile} from './static-file.js';
export * from './Still.js';
export type {PlayableMediaTag} from './timeline-position-state.js';
export {useBufferState} from './use-buffer-state';
export {useCurrentFrame} from './use-current-frame.js';
export {
	CurrentScaleContextType,
	PreviewSize,
	PreviewSizeCtx,
	Translation,
	useCurrentScale,
} from './use-current-scale';
export {useDelayRender} from './use-delay-render';
export {usePicusEnvironment} from './use-picus-environment.js';
export * from './use-video-config.js';
export * from './version.js';
export * from './video-config.js';
export {
	Html5Video,
	OffthreadVideo,
	OffthreadVideoProps,
	PicusMainVideoProps,
	PicusOffthreadVideoProps,
	PicusVideoProps,
	Video,
} from './video/index.js';
export type {OnVideoFrame} from './video/props.js';
export type {VolumeProp} from './volume-prop.js';
export {watchStaticFile} from './watch-static-file.js';

export const Experimental = {
	/**
	 * @description This is a special component that will cause Picus to only partially capture the frame of the video.
	 * @see [Documentation](https://www.picus.dev/docs/clipper)
	 */
	Clipper,
	/**
	 * @description This is a special component, that, when rendered, will skip rendering the frame altogether.
	 * @see [Documentation](https://www.picus.dev/docs/null)
	 */
	Null,
	useIsPlayer,
};

const proxyObj = {};

export const Config = new Proxy(proxyObj, {
	get(_, prop): unknown {
		if (
			prop === 'Bundling' ||
			prop === 'Rendering' ||
			prop === 'Log' ||
			prop === 'Puppeteer' ||
			prop === 'Output'
		) {
			return Config;
		}

		return () => {
			/* eslint-disable no-console */
			console.warn(
				'⚠️  The CLI configuration has been extracted from Picus Core.',
			);
			console.warn('Update the import from the config file:');
			console.warn();
			console.warn('- Delete:');
			console.warn('import {Config} from "picus";');
			console.warn('+ Replace:');
			console.warn('import {Config} from "@picus/cli/config";');
			console.warn();
			console.warn(
				'For more information, see https://www.picus.dev/docs/4-0-migration.',
			);
			/* eslint-enable no-console */

			process.exit(1);
		};
	},
});

Sequence.displayName = 'Sequence';
addSequenceStackTraces(Sequence);

export type _InternalTypes = {
	AnyComposition: AnyComposition;
	BundleCompositionState: BundleCompositionState;
	BundleState: BundleState;
	VideoConfigWithSerializedProps: VideoConfigWithSerializedProps;
	AnyCompMetadata: AnyCompMetadata;
	AudioOrVideoAsset: AudioOrVideoAsset;
	TRenderAsset: TRenderAsset;
	ProResProfile: ProResProfile;
};

export type {
	AnyComposition,
	DelayRenderScope,
	LoopDisplay,
	SequenceControls,
	SequenceFieldSchema,
	SequenceSchema,
	UseBufferState,
};
