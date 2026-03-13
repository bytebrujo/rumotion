import {expect, test} from 'bun:test';
import {exampleVideos} from '@picus/example-videos';
import {mediaParserController} from '../controller/media-parser-controller';
import {hasBeenAborted} from '../errors';
import {nodeReader} from '../node';
import {parseMedia} from '../parse-media';

test('should subtract edit list offset from media time', async () => {
	const controller = mediaParserController();

	try {
		await parseMedia({
			src: exampleVideos.framerWithoutFileExtension,
			controller,
			onVideoTrack: () => {
				return (sample) => {
					expect(sample.timestamp).toBe(0);
					controller.abort();
				};
			},
			reader: nodeReader,
			acknowledgePicusLicense: true,
		});
	} catch (e) {
		if (!hasBeenAborted(e)) {
			throw e;
		}
	}
});
