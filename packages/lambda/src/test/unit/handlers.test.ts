import {expect, test} from 'bun:test';
import {ServerlessRoutines} from '@picus/serverless';
import {mockImplementation} from '../mocks/mock-implementation';

test('Info handler should return version', async () => {
	const response = await mockImplementation.callFunctionSync({
		type: ServerlessRoutines.info,
		payload: {
			logLevel: 'info',
			type: ServerlessRoutines.info,
		},
		functionName: 'picus-dev-lambda',
		region: 'us-east-1',
		timeoutInTest: 120000,
		requestHandler: null,
	});

	expect(typeof response.version === 'string').toBe(true);
});
