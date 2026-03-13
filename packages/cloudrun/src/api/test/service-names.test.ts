import {expect, test} from 'bun:test';
import {VERSION} from 'picus';
import type {GcpRegion} from '../../pricing/gcp-regions';
import {getGcpParent, parseServiceName} from '../helpers/parse-service-name';
import {speculateServiceName} from '../speculate-service-name';

const dashedVersion = VERSION.replace(/\./g, '-');
const region: GcpRegion = 'asia-east1';

test('Parse service names', () => {
	process.env.PICUS_GCP_PROJECT_ID = 'picus-test-project';

	const shortServiceName = speculateServiceName({
		cpuLimit: '8.0',
		memoryLimit: '100000k',
		// max timeout
		timeoutSeconds: 3600,
	});

	expect(shortServiceName).toBe(
		`picus-${VERSION.replace(/\./g, '-')}-mem100000k-cpu8-0-t3600`,
	);

	const fullServiceName = `${getGcpParent(
		region,
	)}/services/${shortServiceName}`;

	process.env.PICUS_GCP_PROJECT_ID = 'picus-test-project';
	const parsed = parseServiceName(fullServiceName, region);
	expect(parsed).toEqual({
		consoleUrl: `https://console.cloud.google.com/run/detail/asia-east1/picus-${dashedVersion}-mem100000k-cpu8-0-t3600/logs?project=picus-test-project`,
		region: 'asia-east1',
		picusVersion: VERSION.replace(/\./g, '-'),
		serviceName: `picus-${dashedVersion}-mem100000k-cpu8-0-t3600`,
	});
	// Max length of service name is 49 characters, asking for less in case the version string gets longer
	expect(shortServiceName.length).toBeLessThanOrEqual(47);
});
