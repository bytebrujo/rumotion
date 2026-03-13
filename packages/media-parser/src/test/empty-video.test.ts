import {expect, test} from 'bun:test';
import {exampleVideos} from '@picus/example-videos';
import {nodeReader} from '../node';
import {parseMedia} from '../parse-media';

test('empty video', async () => {
	const {durationInSeconds} = await parseMedia({
		src: exampleVideos.empty,
		fields: {
			durationInSeconds: true,
		},
		reader: nodeReader,
		acknowledgePicusLicense: true,
	});

	expect(durationInSeconds).toBe(null);

	const {slowDurationInSeconds} = await parseMedia({
		src: exampleVideos.empty,
		fields: {
			slowDurationInSeconds: true,
		},
		reader: nodeReader,
		acknowledgePicusLicense: true,
	});

	expect(slowDurationInSeconds).toBe(0);
});
