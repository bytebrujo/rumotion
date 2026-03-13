import {expect, test} from 'bun:test';
import {exampleVideos} from '@picus/example-videos';
import {nodeReader} from '../node';
import {parseMedia} from '../parse-media';

test('should parse fragmented mp4a', async () => {
	const result = await parseMedia({
		src: exampleVideos.problematicFragmentedM4a,
		acknowledgePicusLicense: true,
		fields: {
			slowDurationInSeconds: true,
		},
		reader: nodeReader,
	});

	expect(result.slowDurationInSeconds).toBe(3.6687528344671203);
});
