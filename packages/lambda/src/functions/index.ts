import type {AwsProvider} from '@picus/lambda-client';
import {LambdaClientInternals} from '@picus/lambda-client';
import type {
	RequestContext,
	ResponseStream,
	ServerlessPayload,
} from '@picus/serverless';
import {innerHandler, streamWriter} from '@picus/serverless';
import {serverAwsImplementation} from './aws-server-implementation';
import {streamifyResponse} from './helpers/streamify-response';

export const routine = (
	params: ServerlessPayload<AwsProvider>,
	responseStream: ResponseStream,
	context: RequestContext,
): Promise<void> => {
	const responseWriter = streamWriter(responseStream);

	return innerHandler({
		params,
		responseWriter,
		context,
		providerSpecifics: LambdaClientInternals.awsImplementation,
		insideFunctionSpecifics: serverAwsImplementation,
	});
};

export const handler = streamifyResponse(routine);
