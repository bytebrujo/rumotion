import React from 'react';
import {AbsoluteFill, Sequence} from 'picus';
import {AnimatedLogo} from './animated-logo/AnimatedLogo';

export const EmailSignature: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<Sequence
				from={25}
				style={{
					transform: `scale(1.34)`,
				}}
			>
				<AnimatedLogo scaleLogo theme="light" />
			</Sequence>
		</AbsoluteFill>
	);
};
