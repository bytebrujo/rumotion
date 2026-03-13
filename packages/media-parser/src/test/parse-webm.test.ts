import {expect, test} from 'bun:test';
import {exampleVideos} from '@picus/example-videos';
import {parseMedia} from '../parse-media';
import {nodeReader} from '../readers/from-node';

test('should be able to parse a WebM', async () => {
	const webm = await parseMedia({
		src: exampleVideos.transparentWebm,
		fields: {
			durationInSeconds: true,
			videoCodec: true,
		},
		acknowledgePicusLicense: true,
		reader: nodeReader,
	});
	expect(webm.durationInSeconds).toBe(5.008);
	expect(webm.videoCodec).toBe('vp8');
});
