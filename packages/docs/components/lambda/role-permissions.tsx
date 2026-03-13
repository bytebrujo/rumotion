import {getRolePolicy} from '@picus/lambda/policies';
import React from 'react';

export const RolePolicy: React.FC = () => {
	return (
		<div>
			<pre>{getRolePolicy()}</pre>
		</div>
	);
};
