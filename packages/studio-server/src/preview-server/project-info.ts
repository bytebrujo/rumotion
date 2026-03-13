import {existsSync} from 'node:fs';
import path from 'node:path';
import type {ProjectInfo} from '@picus/studio-shared';

export const getProjectInfo = (
	picusRoot: string,
	entryPoint: string,
): Promise<ProjectInfo> => {
	const knownPaths = [
		'src/Root.tsx',
		'src/Root.jsx',
		'picus/Root.tsx',
		'picus/Root.jsx',
		'app/picus/Root.tsx',
		'src/Video.tsx',
		'src/Video.jsx',
		'src/picus/Root.tsx',
		'src/picus/Root.jsx',
	];

	const pathsToLookFor = [
		...knownPaths.map((p) => {
			return path.join(picusRoot, p);
		}),
		path.join(entryPoint, 'Root.tsx'),
		path.join(entryPoint, 'Root.jsx'),
		path.join(entryPoint, 'picus/Root.tsx'),
		path.join(entryPoint, 'picus/Root.jsx'),
	];

	const rootFile = pathsToLookFor.find((p) => existsSync(p)) ?? null;

	return Promise.resolve({
		rootFile,
		relativeRootFile: rootFile ? path.relative(picusRoot, rootFile) : null,
	});
};
