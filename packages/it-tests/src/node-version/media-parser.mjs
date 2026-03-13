import assert from 'node:assert';
import {test} from 'node:test';
import {exampleVideos} from '@picus/example-videos';
import {parseMedia} from '@picus/media-parser';
import {nodeReader} from '@picus/media-parser/node';

const major = parseInt(process.version.split('.')[0].slice(1));
if (major > 16) {
	test('parse media', async () => {
		const result = await parseMedia({
			src: exampleVideos.stretchedVp8,
			fields: {
				durationInSeconds: true,
			},
			acknowledgePicusLicense: true,
			reader: nodeReader,
		});

		assert(result.durationInSeconds === 12.043999999999999);
	});
}
