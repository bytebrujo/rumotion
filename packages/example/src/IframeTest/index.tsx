import React from 'react';
import {IFrame, useVideoConfig} from 'picus';

const IFrameTest: React.FC = () => {
	const {width, height} = useVideoConfig();
	return <IFrame style={{width, height}} src="https://picus.dev" />;
};

export default IFrameTest;
