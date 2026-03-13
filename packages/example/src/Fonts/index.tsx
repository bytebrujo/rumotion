import {loadFont} from '@picus/fonts';
import React from 'react';
import {AbsoluteFill, staticFile} from 'picus';

loadFont({
	family: 'Bangers',
	url: staticFile('bangers.woff2'),
	weight: '500',
	format: 'opentype',
});

export const FontDemo: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				fontFamily: 'Bangers',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 100,
				backgroundColor: 'whitesmoke',
			}}
		>
			<h1>Font Demo</h1>
		</AbsoluteFill>
	);
};
