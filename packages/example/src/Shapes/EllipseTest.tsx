import {Ellipse} from '@picus/shapes';
import React from 'react';
import {AbsoluteFill} from 'picus';

const EllipseTest: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
			}}
		>
			<Ellipse rx={200} ry={100} fill="green" stroke="red" strokeWidth={1} />
		</AbsoluteFill>
	);
};

export default EllipseTest;
