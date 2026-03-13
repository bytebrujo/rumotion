import React from 'react';
import {AbsoluteFill} from 'picus';

export const TextStroke: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				fontFamily: 'Arial',
				fontSize: 100,
				color: 'blue',
				justifyContent: 'center',
				alignItems: 'center',
				WebkitTextStroke: '10px red',
				paintOrder: 'stroke fill',
			}}
		>
			TextStroke
		</AbsoluteFill>
	);
};
