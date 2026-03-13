import React from 'react';
import {AbsoluteFill, Sequence} from 'picus';
import {FastUpdatesSubtree} from './FastUpdatesSubtree';

export const FastUpdatesNested: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<Sequence durationInFrames={10}>hi</Sequence>
			<FastUpdatesSubtree />
			<Sequence durationInFrames={5}>hi</Sequence>
		</AbsoluteFill>
	);
};
