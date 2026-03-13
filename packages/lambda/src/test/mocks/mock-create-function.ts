import type {AwsProvider} from '@picus/lambda-client';
import type {CreateFunction} from '@picus/serverless';
import {VERSION} from 'picus/version';
import {addFunction} from './mock-functions';

export const mockCreateFunction: CreateFunction<AwsProvider> = (input) => {
	if (!input.alreadyCreated) {
		addFunction(
			{
				functionName: input.functionName,
				memorySizeInMb: input.memorySizeInMb,
				timeoutInSeconds: input.timeoutInSeconds,
				version: VERSION,
				diskSizeInMb: input.ephemerealStorageInMb,
			},
			input.region,
		);
	}

	return Promise.resolve({
		FunctionName: input.functionName,
	});
};
