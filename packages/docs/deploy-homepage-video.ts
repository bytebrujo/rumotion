// bun deploy-homepage-video.ts
// Needs a .env
import type {AwsRegion} from '@picus/lambda';
import {deploySite, getOrCreateBucket} from '@picus/lambda';

const region: AwsRegion = 'us-west-2';

// @ts-expect-error
const {bucketName} = await getOrCreateBucket({
	region,
});

if (!process.env.PICUS_AWS_ACCESS_KEY_ID?.endsWith('KQHJ')) {
	throw new Error('Please fill in your AWS credentials in .env');
}

// @ts-expect-error
const {serveUrl} = await deploySite({
	siteName: 'picus-homepage',
	bucketName,
	entryPoint: './src/picus/entry.ts',
	region,
});

console.log(serveUrl);
