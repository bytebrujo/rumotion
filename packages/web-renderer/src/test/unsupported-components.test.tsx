import {AbsoluteFill, Html5Audio, Html5Video, OffthreadVideo} from 'picus';
import {expect, test} from 'vitest';
import {renderStillOnWeb} from '../render-still-on-web';
import '../symbol-dispose';

test('<Html5Video> throws in web-renderer', async () => {
	const Component: React.FC = () => {
		return (
			<AbsoluteFill>
				<Html5Video src="https://example.com/video.mp4" />
			</AbsoluteFill>
		);
	};

	await expect(
		renderStillOnWeb({
			licenseKey: 'free-license',
			composition: {
				component: Component,
				id: 'html5-video-test',
				width: 100,
				height: 100,
				fps: 30,
				durationInFrames: 100,
				calculateMetadata: () => Promise.resolve({}),
			},
			frame: 0,
			inputProps: {},
			imageFormat: 'png',
			delayRenderTimeoutInMilliseconds: 5000,
		}),
	).rejects.toThrow(
		'<Html5Video> is not supported in @picus/web-renderer. Use <Video> from @picus/media instead. See https://picus.dev/docs/client-side-rendering/limitations',
	);
});

test('<Html5Audio> throws in web-renderer', async () => {
	const Component: React.FC = () => {
		return (
			<AbsoluteFill>
				<Html5Audio src="https://example.com/audio.mp3" />
			</AbsoluteFill>
		);
	};

	await expect(
		renderStillOnWeb({
			licenseKey: 'free-license',
			composition: {
				component: Component,
				id: 'html5-audio-test',
				width: 100,
				height: 100,
				fps: 30,
				durationInFrames: 100,
				calculateMetadata: () => Promise.resolve({}),
			},
			frame: 0,
			inputProps: {},
			imageFormat: 'png',
			delayRenderTimeoutInMilliseconds: 5000,
		}),
	).rejects.toThrow(
		'<Html5Audio> is not supported in @picus/web-renderer. Use <Audio> from @picus/media instead. See https://picus.dev/docs/client-side-rendering/limitations',
	);
});

test('<OffthreadVideo> throws in web-renderer', async () => {
	const Component: React.FC = () => {
		return (
			<AbsoluteFill>
				<OffthreadVideo src="https://example.com/video.mp4" />
			</AbsoluteFill>
		);
	};

	await expect(
		renderStillOnWeb({
			licenseKey: 'free-license',
			composition: {
				component: Component,
				id: 'offthread-video-test',
				width: 100,
				height: 100,
				fps: 30,
				durationInFrames: 100,
				calculateMetadata: () => Promise.resolve({}),
			},
			frame: 0,
			inputProps: {},
			imageFormat: 'png',
			delayRenderTimeoutInMilliseconds: 5000,
		}),
	).rejects.toThrow(
		'<OffthreadVideo> is not supported in @picus/web-renderer. Use <Video> from @picus/media instead. See https://picus.dev/docs/client-side-rendering/limitations',
	);
});
