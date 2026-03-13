import path from 'node:path';

export const resolveOutputPath = (
	picusRoot: string,
	filePath: string,
): string => {
	const absolutePath = path.join(picusRoot, filePath);

	const relativeToRoot = path.relative(picusRoot, absolutePath);
	if (relativeToRoot.startsWith('..')) {
		throw new Error(`Not allowed to write to ${relativeToRoot}`);
	}

	return absolutePath;
};
