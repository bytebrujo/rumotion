import {Html5Audio, staticFile} from 'picus';

export const HandleAudioRenderError = () => {
	return <Html5Audio src={staticFile('balloons.json')} />;
};
