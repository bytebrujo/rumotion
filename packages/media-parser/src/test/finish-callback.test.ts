import {expect, test} from 'bun:test';
import {exampleVideos} from '@picus/example-videos';
import {mediaParserController} from '../controller/media-parser-controller';
import {nodeReader} from '../node';
import {parseMedia} from '../parse-media';

test('finish callback', async () => {
	let done = 0;

	const controller = mediaParserController();

	await parseMedia({
		src: exampleVideos.fragmentedMp4WithNoDurationMetadata,
		acknowledgePicusLicense: true,
		reader: nodeReader,
		controller,
		onVideoTrack: () => {
			return () => {
				return () => {
					if (done === 0) {
						// Loop once
						controller.seek(0);
					}

					done++;
				};
			};
		},
	});

	expect(done).toBe(2);
});
