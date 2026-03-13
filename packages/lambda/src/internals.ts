import type {
	AwsProvider,
	AwsRegion,
	RuntimePreference,
} from '@picus/lambda-client';
import type {LogLevel} from '@picus/renderer';
import type {
	FullClientSpecifics,
	ProviderSpecifics,
} from '@picus/serverless';
import type {
	DeploySiteOutput,
	InternalDeploySiteInput,
} from './api/deploy-site';
import {internalDeploySite} from './api/deploy-site';
import {executeCommand} from './cli/index';
import {getLayers} from './shared/get-layers';
import type {AwsLayer} from './shared/hosted-layers';

export const LambdaInternals: {
	executeCommand: (
		args: string[],
		picusRoot: string,
		logLevel: LogLevel,
		providerSpecifics: ProviderSpecifics<AwsProvider> | null,
		fullClientSpecifics: FullClientSpecifics<AwsProvider> | null,
	) => Promise<void>;
	internalDeploySite: (input: InternalDeploySiteInput) => DeploySiteOutput;
	getLayers: (options: {
		option: RuntimePreference;
		region: AwsRegion;
	}) => AwsLayer[];
} = {
	executeCommand,
	internalDeploySite,
	getLayers,
};

export type {OverallRenderProgress as _InternalOverallRenderProgress} from '@picus/serverless';
