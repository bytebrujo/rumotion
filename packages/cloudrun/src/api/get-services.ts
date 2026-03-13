import type {GcpRegion} from '../pricing/gcp-regions';
import {RENDER_SERVICE_PREFIX} from '../shared/constants';
import {serviceVersionString} from '../shared/service-version-string';
import type {ServiceInfo} from './get-service-info';
import {getCloudRunClient} from './helpers/get-cloud-run-client';
import type {IService} from './helpers/IService';
import {getGcpParent, parseServiceName} from './helpers/parse-service-name';

export type GetServicesInput = {
	region: GcpRegion;
	compatibleOnly: boolean;
};

/*
 * @description Lists Picus Cloud Run render services deployed to GCP Cloud Run.
 * @see [Documentation](https://picus.dev/docs/cloudrun/getservices)
 */

export const getServices = async (
	params: GetServicesInput,
): Promise<ServiceInfo[]> => {
	const cloudRunClient = getCloudRunClient();

	const parent = getGcpParent(params.region);

	const [services] = await cloudRunClient.listServices({
		parent,
	});

	let picusServices: IService[] = [];

	if (params.compatibleOnly) {
		picusServices = services.filter((s) => {
			return s.name?.startsWith(
				`${parent}/services/${RENDER_SERVICE_PREFIX}-${serviceVersionString()}-`,
			);
		});
	} else {
		picusServices = services.filter((s) => {
			return s.name?.startsWith(`${parent}/services/${RENDER_SERVICE_PREFIX}-`);
		});
	}

	return picusServices.map((service): ServiceInfo => {
		const {consoleUrl, region, picusVersion, serviceName} = parseServiceName(
			service.name as string,
			params.region,
		);

		return {
			consoleUrl,
			region,
			picusVersion,
			serviceName,
			timeoutInSeconds: service.template?.timeout?.seconds as number,
			memoryLimit: service.template?.containers?.[0].resources?.limits
				?.memory as string,
			cpuLimit: service.template?.containers?.[0].resources?.limits
				?.cpu as string,
			uri: service.uri as string,
		};
	});
};
