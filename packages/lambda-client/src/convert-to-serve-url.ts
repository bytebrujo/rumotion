import {DOCS_URL} from '@picus/serverless-client';
import type {AwsRegion} from './regions';

export const convertToServeUrlImplementation = ({
	urlOrId,
	region,
	bucketName,
}: {
	urlOrId: string;
	region: AwsRegion;
	bucketName: string;
}) => {
	if (urlOrId.startsWith('src/')) {
		throw new Error(
			`Picus Lambda can only render based on a URL in the cloud. It seems like you passed a local file: ${urlOrId}. Read the setup guide for Picus Lambda ${DOCS_URL}/docs/lambda/setup`,
		);
	}

	if (urlOrId.startsWith('http://') || urlOrId.startsWith('https://')) {
		return urlOrId;
	}

	return `https://${bucketName}.s3.${region}.amazonaws.com/sites/${urlOrId}/index.html`;
};
