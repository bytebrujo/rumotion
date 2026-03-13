import React from 'react';
import {AbsoluteFill} from 'picus';

export const EmojiTestbed: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 100,
			}}
		>
			😂 Normal Test
		</AbsoluteFill>
	);
};
