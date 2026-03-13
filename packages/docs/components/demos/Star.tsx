import {Star} from '@picus/shapes';
import React from 'react';
import {AbsoluteFill} from 'picus';

export const StarDemo: React.FC<{
	readonly darkMode: boolean;
	readonly innerRadius: number;
	readonly outerRadius: number;
	readonly cornerRadius: number;
	readonly edgeRoundness: number | null;
	readonly points: number;
}> = ({
	innerRadius,
	points,
	outerRadius,
	darkMode,
	cornerRadius,
	edgeRoundness,
}) => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Star
				fill={darkMode ? 'white' : 'var(--ifm-link-color)'}
				points={points}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				cornerRadius={cornerRadius}
				edgeRoundness={edgeRoundness}
			/>
		</AbsoluteFill>
	);
};
