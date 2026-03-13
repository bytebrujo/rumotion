import type {GetOutputUrl} from '@picus/serverless-client';
import {getExpectedOutName} from '@picus/serverless-client';
import type {AwsProvider} from './aws-provider';
import {PICUS_BUCKET_PREFIX} from './constants';

export const getOutputUrlFromMetadata: GetOutputUrl<AwsProvider> = ({
	renderMetadata,
	bucketName,
	customCredentials,
	currentRegion,
}) => {
	const {key, renderBucketName} = getExpectedOutName({
		renderMetadata,
		bucketName,
		customCredentials,
		bucketNamePrefix: PICUS_BUCKET_PREFIX,
	});

	return {
		url: `https://s3.${currentRegion}.amazonaws.com/${renderBucketName}/${key}`,
		key,
	};
};
