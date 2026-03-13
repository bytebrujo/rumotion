import {Starburst} from '@picus/starburst';
import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'picus';

interface Props {
	readonly rays: number;
	readonly rotation: number;
	readonly smoothness: number;
	readonly vignette: number;
	readonly originOffsetX: number;
	readonly originOffsetY: number;
}

export const StarburstDemoComp: React.FC<Props> = ({
	rays,
	rotation,
	smoothness,
	vignette,
	originOffsetX,
	originOffsetY,
}) => {
	const {durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<Starburst
				rays={rays}
				colors={['#ffdd00', '#ff8800']}
				rotation={rotation}
				smoothness={smoothness}
				vignette={vignette}
				originOffsetX={originOffsetX}
				originOffsetY={originOffsetY}
				durationInFrames={durationInFrames}
			/>
		</AbsoluteFill>
	);
};
