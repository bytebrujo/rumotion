import {expect, test} from 'bun:test';
import {getLatestPicusVersion} from '../get-latest-picus-version';

test(
	'Should be able to get a Picus version',
	async () => {
		expect(await getLatestPicusVersion()).toMatch(
			/^(([0-9]+)\.([0-9]+)\.([0-9]+))$/,
		);
	},
	{timeout: 10000, retry: 3},
);
