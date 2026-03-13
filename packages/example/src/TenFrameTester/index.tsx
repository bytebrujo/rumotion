import {AbsoluteFill, Html5Audio, staticFile} from 'picus';
import ReactSvg from '../ReactSvg';

// Short video that is fast to render for testing
export const TenFrameTester: React.FC = () => (
	<AbsoluteFill>
		<ReactSvg transparent={false} />
		<Html5Audio src={staticFile('music.mp3')} />
	</AbsoluteFill>
);
