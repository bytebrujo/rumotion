import path from 'node:path';
import type {AwsRegion, RequestHandler} from '@picus/lambda-client';
import {LambdaClientInternals, type AwsProvider} from '@picus/lambda-client';
import {PICUS_BUCKET_PREFIX} from '@picus/lambda-client/constants';
import type {LogLevel} from '@picus/renderer';
import {RenderInternals} from '@picus/renderer';
import type {ProviderSpecifics} from '@picus/serverless';
import {
	getExpectedOutName,
	getOverallProgressFromStorage,
	type CustomCredentials,
} from '@picus/serverless';
import type {LambdaReadFileProgress} from '../functions/helpers/read-with-progress';
import {lambdaDownloadFileWithProgress} from '../functions/helpers/read-with-progress';

type InternalDownloadMediaInput = {
	region: AwsRegion;
	bucketName: string;
	renderId: string;
	outPath: string;
	onProgress: LambdaReadFileProgress;
	customCredentials: CustomCredentials<AwsProvider> | null;
	logLevel: LogLevel;
	forcePathStyle: boolean;
	requestHandler: RequestHandler | null;
	signal: AbortSignal;
};

export type DownloadMediaInput = {
	region: AwsRegion;
	bucketName: string;
	renderId: string;
	outPath: string;
	onProgress?: LambdaReadFileProgress;
	customCredentials?: CustomCredentials<AwsProvider>;
	logLevel?: LogLevel;
	forcePathStyle?: boolean;
	requestHandler?: RequestHandler;
	signal?: AbortSignal;
};

export type DownloadMediaOutput = {
	outputPath: string;
	sizeInBytes: number;
};

export const internalDownloadMedia = async (
	input: InternalDownloadMediaInput & {
		providerSpecifics: ProviderSpecifics<AwsProvider>;
		forcePathStyle: boolean;
	},
): Promise<DownloadMediaOutput> => {
	const expectedBucketOwner = await input.providerSpecifics.getAccountId({
		region: input.region,
	});
	const overallProgress = await getOverallProgressFromStorage({
		bucketName: input.bucketName,
		expectedBucketOwner,
		region: input.region,
		renderId: input.renderId,
		providerSpecifics: input.providerSpecifics,
		forcePathStyle: input.forcePathStyle,
		requestHandler: input.requestHandler,
	});

	if (!overallProgress.renderMetadata) {
		throw new Error('Render did not finish yet');
	}

	const outputPath = path.resolve(process.cwd(), input.outPath);
	RenderInternals.ensureOutputDirectory(outputPath);

	const {key, renderBucketName, customCredentials} = getExpectedOutName({
		renderMetadata: overallProgress.renderMetadata,
		bucketName: input.bucketName,
		customCredentials: input.customCredentials ?? null,
		bucketNamePrefix: PICUS_BUCKET_PREFIX,
	});

	const {sizeInBytes} = await lambdaDownloadFileWithProgress({
		bucketName: renderBucketName,
		expectedBucketOwner,
		key,
		region: input.region,
		onProgress: input.onProgress ?? (() => undefined),
		outputPath,
		customCredentials,
		logLevel: input.logLevel ?? 'info',
		forcePathStyle: input.forcePathStyle ?? false,
		requestHandler: input.requestHandler ?? undefined,
		abortSignal: input.signal,
	});

	return {
		outputPath,
		sizeInBytes,
	};
};

/*
 * @description Downloads a rendered video, audio or still to the disk of the machine this API is called from.
 * @see [Documentation](https://picus.dev/docs/lambda/downloadmedia)
 */

export const downloadMedia = (
	input: DownloadMediaInput,
): Promise<DownloadMediaOutput> => {
	return internalDownloadMedia({
		...input,
		providerSpecifics: LambdaClientInternals.awsImplementation,
		forcePathStyle: false,
		onProgress: input.onProgress ?? (() => undefined),
		logLevel: input.logLevel ?? 'info',
		customCredentials: input.customCredentials ?? null,
		signal: input.signal ?? new AbortController().signal,
		requestHandler: input.requestHandler ?? undefined,
	});
};
