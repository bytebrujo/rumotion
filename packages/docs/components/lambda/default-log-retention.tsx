import {DEFAULT_CLOUDWATCH_RETENTION_PERIOD} from '@picus/lambda-client/constants';
import React from 'react';

export const DefaultLogRetention: React.FC = () => {
	return <span>{DEFAULT_CLOUDWATCH_RETENTION_PERIOD}</span>;
};
