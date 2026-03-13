import React, {useState} from 'react';
import {AbsoluteFill, useDelayRender} from 'picus';

export const Timeout: React.FC = () => {
	const {delayRender} = useDelayRender();
	useState(() => delayRender('This error should appear'));

	return <AbsoluteFill>hi there</AbsoluteFill>;
};
