import {expect, test} from 'bun:test';
import fs from 'fs';
import path from 'path';

test('Should not have carets in Picus versions', async () => {
	const packagesDir = path.join(process.cwd(), '..');
	const packages = await fs.promises.readdir(packagesDir);
	for (const pkg of packages) {
		if (pkg.startsWith('.')) {
			continue;
		}
		const stat = fs.statSync(path.join(packagesDir, pkg));
		if (!stat.isDirectory()) {
			continue;
		}

		const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
		if (!fs.existsSync(packageJsonPath)) {
			continue;
		}

		const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
		const json = JSON.parse(packageJson);
		if (!json.dependencies) {
			continue;
		}
		const picusDeps = Object.keys(json.dependencies).filter(
			(j) => j === 'picus' || j.startsWith('@picus'),
		);
		for (const dep of picusDeps) {
			const val = json.dependencies[dep];
			if (val.includes('^')) {
				throw new Error(`package ${pkg} has dep ${dep} version ${val}`);
			}
		}
	}
	expect(1).toBe(1);
});
