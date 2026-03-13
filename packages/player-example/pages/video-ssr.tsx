import {Video} from '@picus/media';
import {Player} from '@picus/player';
import React from 'react';

const NewVideoTag: React.FC = () => {
	return <Video src={'https://picus.media/video.mp4'} />;
};

export default () => {
	return (
		<Player
			component={NewVideoTag}
			compositionHeight={1080}
			compositionWidth={1920}
			fps={30}
			durationInFrames={30}
		/>
	);
};
