import {LightLeak} from '@picus/light-leaks';
import React from 'react';
import {AbsoluteFill} from 'picus';

export const LightLeakExample: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<LightLeak durationInFrames={60} seed={1 + 2} hueShift={30} />
			<LightLeak durationInFrames={60} seed={3} hueShift={30} />
		</AbsoluteFill>
	);
};
