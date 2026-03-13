import {LightLeak} from '@picus/light-leaks';
import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'picus';

interface Props {
	readonly seed: number;
	readonly hueShift: number;
}

export const LightLeakDemoComp: React.FC<Props> = ({seed, hueShift}) => {
	const {durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<LightLeak
				seed={seed}
				hueShift={hueShift}
				durationInFrames={durationInFrames}
			/>
		</AbsoluteFill>
	);
};
