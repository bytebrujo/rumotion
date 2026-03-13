import fs from 'node:fs';
import path from 'node:path';

const allowedFileExtensions = ['js', 'ts', 'tsx', 'jsx', 'map', 'mjs'];

// Must be async function for proper error handling
export const getFileSource = (
	picusRoot: string,
	p: string,
): Promise<string> => {
	if (!allowedFileExtensions.find((extension) => p.endsWith(extension))) {
		return Promise.reject(new Error(`Not allowed to open ${p}`));
	}

	const resolved = path.resolve(picusRoot, p);
	const relativeToProcessCwd = path.relative(picusRoot, resolved);
	if (relativeToProcessCwd.startsWith('..')) {
		return Promise.reject(
			new Error(`Not allowed to open ${relativeToProcessCwd}`),
		);
	}

	return fs.promises.readFile(p, 'utf-8');
};
