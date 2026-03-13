import {Starburst} from '@picus/starburst';
import React from 'react';
import {AbsoluteFill} from 'picus';

export const StarburstExample: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<Starburst rays={16} colors={['#ffdd00', '#ff8800']} />
		</AbsoluteFill>
	);
};
