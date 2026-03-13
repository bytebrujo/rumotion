import {Circle} from '@picus/shapes';
import React from 'react';
import {AbsoluteFill} from 'picus';

export const CircleDemo: React.FC<{
	readonly radius: number;
	readonly darkMode: boolean;
}> = ({radius, darkMode}) => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Circle
				fill={darkMode ? 'white' : 'var(--ifm-link-color)'}
				radius={radius}
			/>
		</AbsoluteFill>
	);
};
