import fs from 'node:fs';
import path from 'node:path';
import type {LogLevel} from '@picus/renderer';
import {RenderInternals} from '@picus/renderer';
import type {PackageManager} from '@picus/studio-shared';

type LockfilePath = {
	manager: PackageManager;
	path: string;
	installCommand: string;
	startCommand: string;
};

export const lockFilePaths: LockfilePath[] = [
	{
		path: 'package-lock.json',
		manager: 'npm',
		installCommand: 'npm i',
		startCommand: 'npx picus studio',
	},
	{
		path: 'yarn.lock',
		manager: 'yarn',
		installCommand: 'yarn add',
		startCommand: 'yarn picus studio',
	},
	{
		path: 'pnpm-lock.yaml',
		manager: 'pnpm',
		installCommand: 'pnpm i',
		startCommand: 'pnpm exec picus studio',
	},
	{
		path: 'bun.lock',
		manager: 'bun',
		installCommand: 'bun i',
		startCommand: 'bunx picus studio',
	},
	{
		path: 'bun.lockb',
		manager: 'bun',
		installCommand: 'bun i',
		startCommand: 'bunx picus studio',
	},
];

let warnedAboutMultipleLockfiles = false;

export const getPackageManager = ({
	picusRoot,
	packageManager,
	dirUp,
	logLevel,
}: {
	picusRoot: string;
	packageManager: string | undefined;
	dirUp: number;
	logLevel: LogLevel;
}): LockfilePath | 'unknown' => {
	if (packageManager) {
		const manager = lockFilePaths.find((p) => p.manager === packageManager);

		if (!manager) {
			throw new Error(
				`The package manager ${packageManager} is not supported. Supported package managers are ${lockFilePaths
					.map((p) => p.manager)
					.join(', ')}`,
			);
		}

		return manager;
	}

	const existingPkgManagers = lockFilePaths.filter((p) =>
		fs.existsSync(
			path.join(picusRoot, ...new Array(dirUp).fill('..'), p.path),
		),
	);

	if (existingPkgManagers.length === 0 && dirUp >= 2) {
		return 'unknown';
	}

	if (existingPkgManagers.length === 0) {
		return getPackageManager({
			picusRoot,
			packageManager,
			dirUp: dirUp + 1,
			logLevel,
		});
	}

	if (existingPkgManagers.length > 1 && !warnedAboutMultipleLockfiles) {
		warnedAboutMultipleLockfiles = true;
		RenderInternals.Log.warn(
			{indent: false, logLevel},
			'⚠️  Multiple lockfiles detected:',
		);
		for (const pkgManager of existingPkgManagers) {
			RenderInternals.Log.warn(
				{indent: false, logLevel},
				`  - ${pkgManager.path}`,
			);
		}

		RenderInternals.Log.warn({indent: false, logLevel}, '');
		RenderInternals.Log.warn(
			{indent: false, logLevel},
			'This can lead to bugs, delete all but one of these files.',
		);
	}

	return existingPkgManagers[0];
};
