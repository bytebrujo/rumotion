import {parseMedia} from '@picus/media-parser';
import {getVideoMetadata} from '@picus/media-utils';
import {useEffect} from 'react';
import {staticFile} from 'picus';

const src = staticFile('blush-2x.mp4');

export const VideoParser: React.FC = () => {
	useEffect(() => {
		const start = Date.now();
		parseMedia({
			src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.720p.vp9.webm',
			fields: {
				durationInSeconds: true,
				dimensions: true,
			},
		}).then(({durationInSeconds, dimensions}) => {
			console.log(
				'@picus/media-parser',
				durationInSeconds,
				dimensions,
				'in ',
				Date.now() - start,
				'ms',
			);
		});

		getVideoMetadata(src).then(({durationInSeconds}) => {
			console.log(
				'getVideoMetadata',
				durationInSeconds,
				'in ',
				Date.now() - start,
				'ms',
			);
		});
	}, []);

	return <div>VideoParser</div>;
};
