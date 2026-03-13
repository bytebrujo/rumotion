import React from 'react';
import {getInputProps} from 'picus';

export const PrintProps: React.FC = () => {
	return (
		<div
			style={{
				color: 'red',
				fontSize: 40,
			}}
		>
			{JSON.stringify(getInputProps())}
		</div>
	);
};
