import {beforeEach, expect, test} from 'bun:test';
import {makeConsoleUrl} from '../../cli/helpers/make-console-url';
import {isInCloudTask} from '../../functions/helpers/is-in-cloud-task';

beforeEach(() => {
	delete process.env.GCLOUD_PROJECT;
	delete process.env.PICUS_GCP_PROJECT_ID;
	delete process.env.K_CONFIGURATION;
});

test('app is in cloud tasks', () => {
	process.env.GCLOUD_PROJECT = 'picus-test-cloudtask';
	process.env.K_CONFIGURATION = 'config';
	const isInCloud = isInCloudTask();

	expect(isInCloud).toBe(true);

	const consoleUrl = makeConsoleUrl('asia-east1', 'test-name');

	expect(consoleUrl).toBe(
		'https://console.cloud.google.com/run/detail/asia-east1/test-name/logs?project=picus-test-cloudtask',
	);
});

test('app is not in cloud tasks', () => {
	process.env.GCLOUD_PROJECT = 'picus-test';
	process.env.K_CONFIGURATION = 'config';
	const isInCloud = isInCloudTask();

	expect(isInCloud).toBe(true);

	const consoleUrl = makeConsoleUrl('asia-east1', 'test-name');

	expect(consoleUrl).toBe(
		'https://console.cloud.google.com/run/detail/asia-east1/test-name/logs?project=picus-test',
	);
});
