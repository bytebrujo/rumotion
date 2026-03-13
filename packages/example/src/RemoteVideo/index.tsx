import {Html5Video, interpolate} from 'picus';

const RemoteVideo: React.FC = () => {
	return (
		<Html5Video
			volume={(f) =>
				interpolate(f, [0, 500], [1, 0], {extrapolateRight: 'clamp'})
			}
			src="https://picus.media/BigBuckBunny.mp4"
		/>
	);
};

export default RemoteVideo;
