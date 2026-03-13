import React from 'react';
import {Img} from 'picus';

export const MissingImg = (): React.ReactNode => {
	// eslint-disable-next-line @picus/no-string-assets
	return <Img src="doesnotexist" />;
};
