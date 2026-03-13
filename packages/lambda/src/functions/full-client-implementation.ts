import {bundle} from '@picus/bundler';
import type {AwsProvider} from '@picus/lambda-client';
import type {FullClientSpecifics} from '@picus/serverless';
import {createFunction} from '../api/create-function';
import {uploadDir} from '../api/upload-dir';
import {readDirectory} from '../shared/read-dir';

export const awsFullClientSpecifics: FullClientSpecifics<AwsProvider> = {
	bundleSite: bundle,
	id: '__picus_full_client_specifics',
	readDirectory,
	uploadDir,
	createFunction,
};
