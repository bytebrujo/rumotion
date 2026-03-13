import type {AwsRegion} from '@picus/lambda-client';
import {
	AWS_REGIONS,
	DEFAULT_AWS_REGIONS,
} from '@picus/lambda-client/regions';

type Options = {
	enabledByDefaultOnly?: boolean;
};

/*
 * @description Gets an array of all supported GCP regions of this release of Picus Cloud Run.
 * @see [Documentation](https://picus.dev/docs/cloudrun/getregions)
 */
export const getRegions = (options?: Options): readonly AwsRegion[] => {
	const onlyEnabledByDefault = options?.enabledByDefaultOnly ?? false;
	return onlyEnabledByDefault ? DEFAULT_AWS_REGIONS : AWS_REGIONS;
};
