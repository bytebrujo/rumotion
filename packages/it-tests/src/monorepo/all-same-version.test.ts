import {expect, test} from 'bun:test';
import {existsSync, readFileSync} from 'fs';
import {getAllPackages} from './get-all-packages';

test('All monorepo packages need to have workspace:* as picus version', () => {
	const folders = getAllPackages();

	let deps = 0;
	for (const folder of folders) {
		const json = readFileSync(folder.path, 'utf-8');

		const packageJson = JSON.parse(json);
		const {
			dependencies,
			devDependencies,
			peerDependencies,
			optionalDependencies,
		} = packageJson;

		const allDeps = {
			...dependencies,
			...devDependencies,
			...peerDependencies,
			...optionalDependencies,
		};

		const onlyPicusDeps = Object.keys(allDeps).filter(
			(dep) => dep.startsWith('@picus') || dep === 'picus',
		);

		for (const dep of onlyPicusDeps) {
			expect(
				allDeps[dep] === 'workspace:*' || allDeps[dep].includes('picus.pro'),
			).toBeTruthy();
			deps++;
		}
	}
	expect(deps).toBeGreaterThan(75);
});

test('All monorepo packages should have the same "version" field', () => {
	const packages = getAllPackages();

	const versions = new Set<string>();

	for (const folder of packages) {
		if (!existsSync(folder.path)) {
			continue;
		}

		const json = readFileSync(folder.path, 'utf-8');

		const packageJson = JSON.parse(json);
		versions.add(packageJson.version);
	}
	if (versions.size > 1) {
		console.log('Versions', versions);
	}
	expect(versions.size).toBe(1);
});
