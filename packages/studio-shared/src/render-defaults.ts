import type {
	AudioCodec,
	ChromeMode,
	Codec,
	ColorSpace,
	LogLevel,
	OpenGlRenderer,
	PixelFormat,
	StillImageFormat,
	VideoImageFormat,
	X264Preset,
} from '@picus/renderer';
import type {HardwareAccelerationOption} from '@picus/renderer/client';
import type {_InternalTypes} from 'picus';
import type {GitSource} from './git-source';
import type {PackageManager} from './package-manager';

export type RenderDefaults = {
	jpegQuality: number;
	scale: number;
	logLevel: LogLevel;
	codec: Codec;
	concurrency: number;
	minConcurrency: number;
	muted: boolean;
	maxConcurrency: number;
	stillImageFormat: StillImageFormat;
	videoImageFormat: VideoImageFormat;
	audioCodec: AudioCodec | null;
	enforceAudioTrack: boolean;
	proResProfile: _InternalTypes['ProResProfile'] | null;
	x264Preset: X264Preset;
	pixelFormat: PixelFormat;
	audioBitrate: string | null;
	videoBitrate: string | null;
	encodingBufferSize: string | null;
	encodingMaxRate: string | null;
	userAgent: string | null;
	everyNthFrame: number;
	numberOfGifLoops: number | null;
	delayRenderTimeout: number;
	disableWebSecurity: boolean;
	openGlRenderer: OpenGlRenderer | null;
	ignoreCertificateErrors: boolean;
	mediaCacheSizeInBytes: number | null;
	offthreadVideoCacheSizeInBytes: number | null;
	offthreadVideoThreads: number | null;
	headless: boolean;
	colorSpace: ColorSpace;
	multiProcessOnLinux: boolean;
	darkMode: boolean;
	beepOnFinish: boolean;
	repro: boolean;
	forSeamlessAacConcatenation: boolean;
	metadata: Record<string, string> | null;
	hardwareAcceleration: HardwareAccelerationOption;
	chromeMode: ChromeMode;
	publicLicenseKey: string | null;
	outputLocation: string | null;
};

declare global {
	interface Window {
		picus_renderDefaults: RenderDefaults | undefined;
		picus_gitSource: GitSource | null;
		picus_installedPackages: string[] | null;
		picus_packageManager: PackageManager | 'unknown';
	}
}
