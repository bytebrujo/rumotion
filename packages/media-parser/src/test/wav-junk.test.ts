import {expect, test} from 'bun:test';
import {exampleVideos} from '@picus/example-videos';
import {nodeReader} from '../node';
import {parseMedia} from '../parse-media';

test('junk wav', async () => {
	let samples = 0;
	await parseMedia({
		src: exampleVideos.junk,
		acknowledgePicusLicense: true,
		reader: nodeReader,
		onAudioTrack: () => {
			return () => {
				samples++;
			};
		},
	});

	expect(samples).toBe(84);
});
