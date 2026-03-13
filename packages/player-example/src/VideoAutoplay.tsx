import {preloadAudio, preloadVideo} from '@picus/preload';
import {
	AbsoluteFill,
	Html5Audio,
	Html5Video,
	Sequence,
	Series,
	staticFile,
} from 'picus';

if (typeof window !== 'undefined') {
	preloadVideo('https://picus.media/ForBiggerJoyrides.mp4');

	preloadAudio(staticFile('sample.mp3'));
}

export const VideoautoplayDemo = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'red',
			}}
		>
			<Sequence from={20}>
				<Html5Audio src={staticFile('sample.mp3')} volume={0.2} />
			</Sequence>
			<Series>
				<Series.Sequence durationInFrames={10}>
					<AbsoluteFill />
				</Series.Sequence>
			</Series>
			<AbsoluteFill>
				<Html5Video
					pauseWhenBuffering
					src="https://picus.media/BigBuckBunny.mp4"
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
