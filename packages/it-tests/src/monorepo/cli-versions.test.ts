import {expect, test} from 'bun:test';
import path from 'node:path';
import {$} from 'bun';
import {VERSION} from 'picus';

test('should return list of versions', async () => {
	const {stdout} = await $`bunx picus versions`
		.cwd(path.join(__dirname, '..', '..', '..', 'example'))
		.quiet();

	const text = stdout.toString();

	expect(text).toInclude(`On version: ${VERSION}`);
	expect(text).toInclude(`- @picus/three`);
	expect(text).toInclude(`All packages have the correct version`);
});
