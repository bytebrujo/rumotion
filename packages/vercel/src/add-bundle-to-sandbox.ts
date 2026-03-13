import {readdir, readFile} from 'fs/promises';
import path from 'path';
import type {Sandbox} from '@vercel/sandbox';
import {PICUS_SANDBOX_BUNDLE_DIR} from './internals/add-bundle';

async function getPicusBundleFiles(
	bundleDir: string,
): Promise<{path: string; content: Buffer}[]> {
	const fullBundleDir = path.join(process.cwd(), bundleDir);

	const files: {path: string; content: Buffer}[] = [];

	async function readDirRecursive(dir: string, basePath: string = '') {
		const entries = await readdir(dir, {withFileTypes: true});
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			const relativePath = path.join(basePath, entry.name);
			if (entry.isDirectory()) {
				await readDirRecursive(fullPath, relativePath);
			} else {
				const content = await readFile(fullPath);
				files.push({path: relativePath, content});
			}
		}
	}

	await readDirRecursive(fullBundleDir);
	return files;
}

export async function addBundleToSandbox({
	sandbox,
	bundleDir,
}: {
	sandbox: Sandbox;
	bundleDir: string;
}): Promise<void> {
	const bundleFiles = await getPicusBundleFiles(bundleDir);

	const dirs = new Set<string>();
	for (const file of bundleFiles) {
		const dir = path.dirname(file.path);
		if (dir && dir !== '.') {
			dirs.add(dir);
		}
	}

	for (const dir of Array.from(dirs).sort()) {
		await sandbox.mkDir(PICUS_SANDBOX_BUNDLE_DIR + '/' + dir);
	}

	await sandbox.writeFiles(
		bundleFiles.map((file) => ({
			path: PICUS_SANDBOX_BUNDLE_DIR + '/' + file.path,
			content: file.content,
		})),
	);
}
