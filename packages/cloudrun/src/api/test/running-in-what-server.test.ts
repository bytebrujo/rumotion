import {beforeEach, expect, test} from 'bun:test';
import {
	getProjectId,
	isInCloudTask,
} from '../../functions/helpers/is-in-cloud-task';

beforeEach(() => {
	delete process.env.GCLOUD_PROJECT;
	delete process.env.PICUS_GCP_PROJECT_ID;
	delete process.env.K_CONFIGURATION;
});

test('is running in cloud tasks = true', () => {
	process.env.GCLOUD_PROJECT = 'picus-test-cloudtask';
	process.env.K_CONFIGURATION = 'config';
	const isInCloud = isInCloudTask();

	expect(isInCloud).toBe(true);
});

test('is running in cloud tasks = false', () => {
	process.env.PICUS_GCP_PROJECT_ID = 'picus-test-cloudtask';
	const isInCloud = isInCloudTask();
	expect(isInCloud).toBe(false);
});

test('which project Id = picus-test', () => {
	process.env.PICUS_GCP_PROJECT_ID = 'picus-test';
	const projectId = getProjectId();
	expect(projectId).toBe('picus-test');
});

test('which project Id = picus-test-cloudtask', () => {
	process.env.GCLOUD_PROJECT = 'picus-test-cloudtask';
	process.env.K_CONFIGURATION = 'config';
	const projectId = getProjectId();
	expect(projectId).toBe('picus-test-cloudtask');
});
