import type {GcpRegion} from '../pricing/gcp-regions';
import {PICUS_BUCKET_PREFIX} from '../shared/constants';
import {makeBucketName} from '../shared/validate-bucketname';
import {createBucket} from './create-bucket';
import {getPicusStorageBuckets} from './get-buckets';

export type GetOrCreateBucketInput = {
	region: GcpRegion;
	updateBucketState?: (
		state:
			| 'Checking bucket'
			| 'Creating bucket'
			| 'Created bucket'
			| 'Used bucket',
	) => void;
};

export type GetOrCreateBucketOutput = {
	bucketName: string;
	alreadyExisted: boolean;
};
/*
 * @description Creates a Cloud Storage bucket for Picus Cloud Run in your GCP project. If one already exists, it will get returned instead.
 * @see [Documentation](https://picus.dev/docs/cloudrun/getorcreatebucket)
 */
export const getOrCreateBucket = async (
	params: GetOrCreateBucketInput,
): Promise<GetOrCreateBucketOutput> => {
	const {picusBuckets} = await getPicusStorageBuckets(params.region);

	if (picusBuckets.length > 1) {
		throw new Error(
			`You have multiple buckets (${picusBuckets
				.map((b) => b.name)
				.join(', ')}) in your Cloud Storage region (${
				params.region
			}) starting with "${PICUS_BUCKET_PREFIX}". This is an error, please delete buckets so that you have one maximum.`,
		);
	}

	if (picusBuckets.length === 1) {
		params?.updateBucketState?.('Used bucket');
		return {
			bucketName: picusBuckets[0].name,
			alreadyExisted: true,
		};
	}

	if (params?.region) {
		params.updateBucketState?.('Creating bucket');

		const bucketName = makeBucketName();
		await createBucket({
			bucketName,
			region: params.region,
		});

		params.updateBucketState?.('Created bucket');

		return {bucketName, alreadyExisted: false};
	}

	throw new Error(
		'Bucket creation is required, but no region has been passed.',
	);
};
