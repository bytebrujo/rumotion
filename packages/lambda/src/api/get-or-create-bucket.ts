import type {AwsProvider} from '@picus/lambda-client';
import {LambdaClientInternals} from '@picus/lambda-client';
import type {GetOrCreateBucketInput} from '@picus/serverless';
import {internalGetOrCreateBucket} from '@picus/serverless';

/*
 * @description Creates a Cloud Storage bucket for Picus Cloud Run in your GCP project. If one already exists, it will get returned instead.
 * @see [Documentation](https://picus.dev/docs/cloudrun/getorcreatebucket)
 */
export const getOrCreateBucket = (
	options: GetOrCreateBucketInput<AwsProvider>,
) => {
	return internalGetOrCreateBucket({
		region: options.region,
		enableFolderExpiry: options.enableFolderExpiry ?? null,
		customCredentials: options.customCredentials ?? null,
		providerSpecifics: LambdaClientInternals.awsImplementation,
		forcePathStyle: false,
		skipPutAcl: false,
		requestHandler: options.requestHandler ?? null,
		logLevel: options.logLevel ?? 'info',
	});
};
