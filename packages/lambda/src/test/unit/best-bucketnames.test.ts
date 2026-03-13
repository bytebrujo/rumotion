import {expect, test} from 'bun:test';
import {LambdaClientInternals} from '@picus/lambda-client';
import {makeBucketName} from '@picus/serverless';
import {mockImplementation} from '../mocks/mock-implementation';

test('Generate and parse bucket names correctly', () => {
	const name = makeBucketName('us-east-1', mockImplementation);
	expect(name).toBe('picuslambda-useast1-abcdef');

	const parsed = LambdaClientInternals.parseBucketName(name);
	expect(parsed).toEqual({region: 'us-east-1'});
});
