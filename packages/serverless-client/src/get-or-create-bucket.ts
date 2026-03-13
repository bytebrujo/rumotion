import type {LogLevel} from 'picus';
import {checkBucketListing} from './check-bucket-listing';
import type {CustomCredentials} from './constants';
import {makeBucketName} from './make-bucket-name';
import type {ProviderSpecifics} from './provider-implementation';
import type {CloudProvider} from './types';

type GetOrCreateBucketInputInner<Provider extends CloudProvider> = {
	region: Provider['region'];
	enableFolderExpiry: boolean | null;
	customCredentials: CustomCredentials<Provider> | null;
	providerSpecifics: ProviderSpecifics<Provider>;
	forcePathStyle: boolean;
	skipPutAcl: boolean;
	logLevel: LogLevel;
	requestHandler: Provider['requestHandler'] | null;
};

export type GetOrCreateBucketInput<Provider extends CloudProvider> = {
	region: Provider['region'];
	enableFolderExpiry?: boolean;
	customCredentials?: CustomCredentials<Provider>;
	forcePathStyle?: boolean;
	requestHandler?: Provider['requestHandler'];
	logLevel?: LogLevel;
};

export type GetOrCreateBucketOutput = {
	bucketName: string;
	alreadyExisted: boolean;
};

export const internalGetOrCreateBucket = async <Provider extends CloudProvider>(
	params: GetOrCreateBucketInputInner<Provider>,
): Promise<GetOrCreateBucketOutput> => {
	const picusBuckets = await params.providerSpecifics.getBuckets({
		region: params.region,
		forceBucketName: null,
		forcePathStyle: params.forcePathStyle,
		requestHandler: params.requestHandler,
	});
	if (picusBuckets.length > 1) {
		throw new Error(
			`You have multiple buckets (${picusBuckets.map(
				(b) => b.name,
			)}) in your S3 region (${
				params.region
			}) starting with "${params.providerSpecifics.getBucketPrefix()}". Please see https://picus.dev/docs/lambda/multiple-buckets.`,
		);
	}

	const {enableFolderExpiry, region} = params;
	if (picusBuckets.length === 1) {
		const existingBucketName = picusBuckets[0].name;
		// apply to existing bucket
		await params.providerSpecifics.applyLifeCycle({
			enableFolderExpiry: enableFolderExpiry ?? null,
			bucketName: existingBucketName,
			region,
			customCredentials: params.customCredentials,
			forcePathStyle: params.forcePathStyle,
			requestHandler: params.requestHandler,
		});

		await checkBucketListing({bucketName: existingBucketName, region});

		return {bucketName: picusBuckets[0].name, alreadyExisted: true};
	}

	const bucketName = makeBucketName(params.region, params.providerSpecifics);

	await params.providerSpecifics.createBucket({
		bucketName,
		region: params.region,
		forcePathStyle: params.forcePathStyle,
		skipPutAcl: params.skipPutAcl,
		requestHandler: params.requestHandler,
		logLevel: params.logLevel,
	});

	// apply to newly created bucket
	await params.providerSpecifics.applyLifeCycle({
		enableFolderExpiry: enableFolderExpiry ?? null,
		bucketName,
		region,
		customCredentials: params.customCredentials,
		forcePathStyle: params.forcePathStyle,
		requestHandler: params.requestHandler,
	});

	return {bucketName, alreadyExisted: false};
};
