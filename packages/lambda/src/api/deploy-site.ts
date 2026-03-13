import fs from 'node:fs';
import {type GitSource, type WebpackOverrideFn} from '@picus/bundler';
import type {AwsRegion, RequestHandler} from '@picus/lambda-client';
import {LambdaClientInternals, type AwsProvider} from '@picus/lambda-client';
import {
	getSitesKey,
	PICUS_BUCKET_PREFIX,
} from '@picus/lambda-client/constants';
import type {ToOptions} from '@picus/renderer';
import type {BrowserSafeApis} from '@picus/renderer/client';
import {wrapWithErrorHandling} from '@picus/renderer/error-handling';
import type {
	FullClientSpecifics,
	ProviderSpecifics,
	UploadDirProgress,
} from '@picus/serverless';
import {validateBucketName, validatePrivacy} from '@picus/serverless';
import {awsFullClientSpecifics} from '../functions/full-client-implementation';
import {getS3DiffOperations} from '../shared/get-s3-operations';
import {validateSiteName} from '../shared/validate-site-name';

type MandatoryParameters = {
	entryPoint: string;
	bucketName: string;
	region: AwsRegion;
};

type OptionalParameters = {
	siteName: string;
	options: {
		onBundleProgress?: (progress: number) => void;
		onUploadProgress?: (upload: UploadDirProgress) => void;
		onDiffingProgress?: (bytes: number, done: boolean) => void;
		webpackOverride?: WebpackOverrideFn;
		ignoreRegisterRootWarning?: boolean;
		enableCaching?: boolean;
		publicDir?: string | null;
		rootDir?: string;
		bypassBucketNameValidation?: boolean;
		keyboardShortcutsEnabled?: boolean;
		askAIEnabled?: boolean;
		experimentalClientSideRenderingEnabled?: boolean;
		experimentalVisualModeEnabled?: boolean;
		rspack?: boolean;
	};
	privacy: 'public' | 'no-acl';
	gitSource: GitSource | null;
	indent: boolean;
	forcePathStyle: boolean;
	requestHandler: RequestHandler | null;
} & ToOptions<typeof BrowserSafeApis.optionsMap.deploySiteLambda>;

export type DeploySiteInput = MandatoryParameters & Partial<OptionalParameters>;

export type DeploySiteOutput = Promise<{
	serveUrl: string;
	siteName: string;
	stats: {
		uploadedFiles: number;
		deletedFiles: number;
		untouchedFiles: number;
	};
}>;

const mandatoryDeploySite = async ({
	bucketName,
	entryPoint,
	siteName,
	options,
	region,
	privacy,
	gitSource,
	throwIfSiteExists,
	providerSpecifics,
	forcePathStyle,
	fullClientSpecifics,
	requestHandler,
}: MandatoryParameters &
	OptionalParameters & {
		providerSpecifics: ProviderSpecifics<AwsProvider>;
		fullClientSpecifics: FullClientSpecifics<AwsProvider>;
	}): DeploySiteOutput => {
	LambdaClientInternals.validateAwsRegion(region);
	validateBucketName({
		bucketName,
		bucketNamePrefix: PICUS_BUCKET_PREFIX,
		options: {
			mustStartWithPicus: !options?.bypassBucketNameValidation,
		},
	});

	validateSiteName(siteName);
	validatePrivacy(privacy, false);

	const accountId = await providerSpecifics.getAccountId({region});

	const bucketExists = await providerSpecifics.bucketExists({
		bucketName,
		region,
		expectedBucketOwner: accountId,
		forcePathStyle,
		requestHandler,
	});
	if (!bucketExists) {
		throw new Error(`No bucket with the name ${bucketName} exists`);
	}

	const subFolder = getSitesKey(siteName);

	const [files, bundled] = await Promise.all([
		providerSpecifics.listObjects({
			bucketName,
			expectedBucketOwner: accountId,
			region,
			// The `/` is important to not accidentially delete sites with the same name but containing a suffix.
			prefix: `${subFolder}/`,
			forcePathStyle,
			requestHandler,
		}),
		fullClientSpecifics.bundleSite({
			publicPath: `/${subFolder}/`,
			webpackOverride: options?.webpackOverride ?? ((f) => f),
			enableCaching: options?.enableCaching ?? true,
			publicDir: options?.publicDir ?? null,
			rootDir: options?.rootDir ?? null,
			ignoreRegisterRootWarning: options?.ignoreRegisterRootWarning ?? false,
			onProgress: options?.onBundleProgress ?? (() => undefined),
			entryPoint,
			gitSource,
			bufferStateDelayInMilliseconds: null,
			maxTimelineTracks: null,
			onDirectoryCreated: () => undefined,
			onPublicDirCopyProgress: () => undefined,
			onSymlinkDetected: () => undefined,
			outDir: null,
			askAIEnabled: options?.askAIEnabled ?? true,
			audioLatencyHint: null,
			experimentalClientSideRenderingEnabled:
				options?.experimentalClientSideRenderingEnabled ?? false,
			experimentalVisualModeEnabled:
				options?.experimentalVisualModeEnabled ?? false,
			keyboardShortcutsEnabled: options?.keyboardShortcutsEnabled ?? true,
			renderDefaults: null,
			rspack: options?.rspack ?? false,
		}),
	]);

	if (throwIfSiteExists && files.length > 0) {
		throw new Error(
			'`throwIfSiteExists` was passed as true, but there are already files in this folder: ' +
				files
					.slice(0, 5)
					.map((f) => f.Key)
					.join(', '),
		);
	}

	options.onDiffingProgress?.(0, false);

	let totalBytes = 0;

	const {toDelete, toUpload, existingCount} = await getS3DiffOperations({
		objects: files,
		bundle: bundled,
		prefix: subFolder,
		onProgress: (bytes) => {
			totalBytes = bytes;
			options.onDiffingProgress?.(bytes, false);
		},
		fullClientSpecifics,
	});

	options.onDiffingProgress?.(totalBytes, true);

	await Promise.all([
		fullClientSpecifics.uploadDir({
			bucket: bucketName,
			region,
			localDir: bundled,
			onProgress: options?.onUploadProgress ?? (() => undefined),
			keyPrefix: subFolder,
			privacy: privacy ?? 'public',
			toUpload,
			forcePathStyle,
			requestHandler,
		}),
		Promise.all(
			toDelete.map((d) => {
				return providerSpecifics.deleteFile({
					bucketName,
					customCredentials: null,
					key: d.Key as string,
					region,
					forcePathStyle,
					requestHandler,
				});
			}),
		),
	]);

	if (fs.existsSync(bundled)) {
		fs.rmSync(bundled, {
			recursive: true,
		});
	}

	return {
		serveUrl: LambdaClientInternals.makeS3ServeUrl({
			bucketName,
			subFolder,
			region,
		}),
		siteName,
		stats: {
			uploadedFiles: toUpload.length,
			deletedFiles: toDelete.length,
			untouchedFiles: existingCount,
		},
	};
};

export type InternalDeploySiteInput = MandatoryParameters &
	OptionalParameters & {
		providerSpecifics: ProviderSpecifics<AwsProvider>;
		fullClientSpecifics: FullClientSpecifics<AwsProvider>;
	};

export const internalDeploySite: (
	input: InternalDeploySiteInput,
) => DeploySiteOutput = wrapWithErrorHandling(mandatoryDeploySite);

/*
 * @description Deploys a Picus project to a GCP storage bucket to prepare it for rendering on Cloud Run.
 * @see [Documentation](https://picus.dev/docs/cloudrun/deploysite)
 */
export const deploySite = (args: DeploySiteInput) => {
	return internalDeploySite({
		bucketName: args.bucketName,
		entryPoint: args.entryPoint,
		region: args.region,
		gitSource: args.gitSource ?? null,
		options: args.options ?? {},
		privacy: args.privacy ?? 'public',
		siteName:
			args.siteName ?? LambdaClientInternals.awsImplementation.randomHash(),
		indent: false,
		logLevel: 'info',
		throwIfSiteExists: args.throwIfSiteExists ?? false,
		providerSpecifics: LambdaClientInternals.awsImplementation,
		forcePathStyle: args.forcePathStyle ?? false,
		fullClientSpecifics: awsFullClientSpecifics,
		requestHandler: args.requestHandler ?? null,
	});
};
