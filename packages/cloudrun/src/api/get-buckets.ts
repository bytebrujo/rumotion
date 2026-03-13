import type {Bucket} from '@google-cloud/storage';
import type {GcpRegion} from '../pricing/gcp-regions';
import {PICUS_BUCKET_PREFIX} from '../shared/constants';
import {getCloudStorageClient} from './helpers/get-cloud-storage-client';

/**
 * @description Get a list of all buckets that were created by Picus.
 * @param params.region GCP region to check. If not passed, all regions will be checked.
 * @returns {Promise<Bucket[]>} List of buckets returned by GCP.
 */
export const getPicusStorageBuckets = async (
	region: GcpRegion | 'all regions',
): Promise<{
	picusBuckets: Bucket[];
}> => {
	const cloudStorageClient = getCloudStorageClient();
	const [buckets] = await cloudStorageClient.getBuckets();
	if (!buckets) {
		return {picusBuckets: []};
	}

	let picusBuckets = buckets.filter((b) =>
		b.name?.startsWith(PICUS_BUCKET_PREFIX),
	);

	if (region !== 'all regions') {
		picusBuckets = buckets.filter(
			(b) =>
				b.metadata.location === region.toUpperCase() &&
				b.name?.startsWith(PICUS_BUCKET_PREFIX),
		);
	}

	return {picusBuckets};
};
