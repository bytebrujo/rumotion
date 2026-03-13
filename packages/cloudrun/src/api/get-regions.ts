import type {GcpRegion} from '../pricing/gcp-regions';
import {GCP_REGIONS} from '../regions';

/*
 * @description Gets an array of all supported GCP regions of this release of Picus Cloud Run.
 * @see [Documentation](https://picus.dev/docs/cloudrun/getregions)
 */
export const getRegions = (): readonly GcpRegion[] => {
	return GCP_REGIONS;
};
