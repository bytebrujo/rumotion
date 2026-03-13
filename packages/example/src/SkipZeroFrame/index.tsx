import React from 'react';
import {useCurrentFrame, usePicusEnvironment} from 'picus';

// Try to render using:
// npx picus render src/index.ts skip-zero-frame --frames=10-20 skip.mp4

export const SkipZeroFrame: React.FC = () => {
	const frame = useCurrentFrame();
	const env = usePicusEnvironment();

	if (frame === 0 && env.isRendering) {
		throw new Error('should not render frame 0');
	}

	return <div>{frame}</div>;
};
