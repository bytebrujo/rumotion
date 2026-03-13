import {expect, test} from 'bun:test';
import {exampleVideos} from '@picus/example-videos';
import {nodeReader} from '../node';
import {parseMedia} from '../parse-media';

test('should return immediately with no fields and not return any fields', async () => {
	// @ts-expect-error these fields are not available in the container
	const {audioCodec} = await parseMedia({
		src: exampleVideos.aac,
		acknowledgePicusLicense: true,
		reader: nodeReader,
		logLevel: 'error',
	});

	expect(audioCodec).toBeUndefined();

	// @ts-expect-error these fields are not available in the container
	const {container} = await parseMedia({
		src: exampleVideos.aac,
		acknowledgePicusLicense: true,
		fields: {},
		reader: nodeReader,
		logLevel: 'error',
	});

	expect(container).toBeUndefined();

	const {container: cont} = await parseMedia({
		src: exampleVideos.aac,
		acknowledgePicusLicense: true,
		fields: {
			container: false,
		},
		reader: nodeReader,
		logLevel: 'error',
	});

	try {
		// @ts-expect-error `cont` should be never
		expect(cont.toString() === 'mp4').toBe(false);
		throw new Error('should not happen');
	} catch {}
});
