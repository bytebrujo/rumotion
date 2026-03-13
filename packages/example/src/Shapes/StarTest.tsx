import {Star} from '@picus/shapes';
import React from 'react';
import {AbsoluteFill} from 'picus';
const StarTest: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
				flexDirection: 'row',
			}}
		>
			<Star points={5} innerRadius={80} outerRadius={200} />
		</AbsoluteFill>
	);
};

export default StarTest;
