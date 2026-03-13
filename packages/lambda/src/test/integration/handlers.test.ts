import {expect, test} from 'bun:test';
import {ServerlessRoutines} from '@picus/serverless';
import {VERSION} from 'picus/version';
import {mockImplementation} from '../mocks/mock-implementation';

test('Call function locally', async () => {
	expect(
		await mockImplementation.callFunctionSync({
			payload: {
				type: ServerlessRoutines.info,
				logLevel: 'info',
			},
			type: ServerlessRoutines.info,
			functionName: 'picus-dev-lambda',
			region: 'us-east-1',
			timeoutInTest: 120000,
			requestHandler: null,
		}),
	).toEqual({type: 'success', version: VERSION});
});
