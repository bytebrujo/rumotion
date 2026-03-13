import {getUserPolicy} from '@picus/lambda/policies';
import React from 'react';

export const UserPolicy: React.FC = () => {
	return (
		<div>
			<pre>{getUserPolicy()}</pre>
		</div>
	);
};
