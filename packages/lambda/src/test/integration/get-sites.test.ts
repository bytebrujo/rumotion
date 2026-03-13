import {expect, test} from 'bun:test';
import {LambdaClientInternals} from '@picus/lambda-client';
import {internalGetOrCreateBucket} from '@picus/serverless';
import {VERSION} from 'picus/version';
import {internalDeploySite} from '../../api/deploy-site';
import {mockFullClientSpecifics} from '../mock-implementation';
import {mockImplementation} from '../mocks/mock-implementation';
import {resetMockStore} from '../mocks/mock-store';

test('Should have no buckets at first', async () => {
	resetMockStore();
	expect(
		await LambdaClientInternals.internalGetSites({
			region: 'us-east-1',
			providerSpecifics: mockImplementation,
			forcePathStyle: false,
			forceBucketName: null,
			compatibleOnly: false,
			requestHandler: null,
		}),
	).toEqual({buckets: [], sites: []});
});

test('Should have a site after deploying', async () => {
	resetMockStore();
	await internalGetOrCreateBucket({
		region: 'eu-central-1',
		providerSpecifics: mockImplementation,
		customCredentials: null,
		enableFolderExpiry: null,
		forcePathStyle: false,
		skipPutAcl: false,
		requestHandler: null,
		logLevel: 'info',
	});
	expect(
		await internalDeploySite({
			bucketName: 'picuslambda-eucentral1-abcdef',
			entryPoint: 'first',
			region: 'eu-central-1',
			siteName: 'testing',
			gitSource: null,
			logLevel: 'info',
			indent: false,
			providerSpecifics: mockImplementation,
			privacy: 'public',
			throwIfSiteExists: true,
			options: {},
			forcePathStyle: false,
			fullClientSpecifics: mockFullClientSpecifics,
			requestHandler: null,
		}),
	).toEqual({
		serveUrl:
			'https://picuslambda-eucentral1-abcdef.s3.eu-central-1.amazonaws.com/sites/testing/index.html',
		siteName: 'testing',
		stats: {
			deletedFiles: 0,
			untouchedFiles: 0,
			uploadedFiles: 3,
		},
	});
	expect(
		await LambdaClientInternals.internalGetSites({
			region: 'eu-central-1',
			providerSpecifics: mockImplementation,
			forcePathStyle: false,
			forceBucketName: null,
			compatibleOnly: false,
			requestHandler: null,
		}),
	).toEqual({
		buckets: [
			{
				creationDate: 0,
				name: 'picuslambda-eucentral1-abcdef',
				region: 'eu-central-1',
			},
		],
		sites: [
			{
				bucketName: 'picuslambda-eucentral1-abcdef',
				id: 'testing',
				lastModified: 0,
				sizeInBytes: expect.any(Number),
				serveUrl:
					'https://picuslambda-eucentral1-abcdef.s3.eu-central-1.amazonaws.com/sites/testing/index.html',
				version: VERSION,
			},
		],
	});
});

test('Should filter sites by compatibleOnly', async () => {
	resetMockStore();
	await internalGetOrCreateBucket({
		region: 'eu-central-1',
		providerSpecifics: mockImplementation,
		customCredentials: null,
		enableFolderExpiry: null,
		forcePathStyle: false,
		skipPutAcl: false,
		requestHandler: null,
		logLevel: 'info',
	});
	await internalDeploySite({
		bucketName: 'picuslambda-eucentral1-abcdef',
		entryPoint: 'first',
		region: 'eu-central-1',
		siteName: 'testing',
		gitSource: null,
		logLevel: 'info',
		indent: false,
		providerSpecifics: mockImplementation,
		privacy: 'public',
		throwIfSiteExists: true,
		options: {},
		forcePathStyle: false,
		fullClientSpecifics: mockFullClientSpecifics,
		requestHandler: null,
	});

	const {sites} = await LambdaClientInternals.internalGetSites({
		region: 'eu-central-1',
		providerSpecifics: mockImplementation,
		forcePathStyle: false,
		forceBucketName: null,
		compatibleOnly: true,
		requestHandler: null,
	});

	expect(sites.length).toBe(1);
	expect(sites[0].version).toBe(VERSION);
});
