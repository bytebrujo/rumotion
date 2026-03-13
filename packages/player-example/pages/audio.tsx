import {Player} from '@picus/player';
import React, {useCallback, useState} from 'react';
import {Html5Audio} from 'picus';

export const Comp1 = () => {
	return <Html5Audio src="https://picus.media/audio.wav" muted={false} />;
};

export const Comp2 = () => {
	return <Html5Audio src="https://picus.media/dialogue.wav" />;
};

const Page: React.FC = () => {
	const [comp1, setComp1] = useState(false);

	const callback = useCallback(() => {
		setComp1((c) => !c);
	}, []);

	return (
		<>
			<Player
				component={comp1 ? Comp1 : Comp2}
				compositionWidth={1920}
				compositionHeight={1080}
				fps={30}
				durationInFrames={1200}
				acknowledgePicusLicense
				controls
				style={{
					width: 500,
				}}
			/>
			<button type="button" onClick={callback}>
				Click to toggle
			</button>
		</>
	);
};

export default Page;
