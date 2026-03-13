import {spawn} from 'node:child_process';
import fs from 'node:fs';
import {RenderInternals, type LogLevel} from '@picus/renderer';
import {StudioServerInternals} from '@picus/studio-server';
import {chalk} from './chalk';
import {EXTRA_PACKAGES} from './extra-packages';
import {listOfPicusPackages} from './list-of-picus-packages';
import {Log} from './log';
import {resolveFrom} from './resolve-from';

const getInstalledVersion = (
	picusRoot: string,
	pkg: string,
): string | null => {
	try {
		const pkgJsonPath = resolveFrom(picusRoot, `${pkg}/package.json`);
		const file = fs.readFileSync(pkgJsonPath, 'utf-8');
		const packageJson = JSON.parse(file);
		return packageJson.version;
	} catch {
		return null;
	}
};

export const addCommand = async ({
	picusRoot,
	packageManager,
	packageNames,
	logLevel,
	args,
}: {
	picusRoot: string;
	packageManager: string | undefined;
	packageNames: string[];
	logLevel: LogLevel;
	args: string[];
}) => {
	// Validate that all package names are Picus packages
	const invalidPackages = packageNames.filter(
		(pkg) => !listOfPicusPackages.includes(pkg) && !EXTRA_PACKAGES[pkg],
	);
	if (invalidPackages.length > 0) {
		throw new Error(
			`The following packages are not Picus packages: ${invalidPackages.join(', ')}. Must be one of the Picus packages or one of the supported extra packages: ${Object.keys(EXTRA_PACKAGES).join(', ')}.`,
		);
	}

	const {
		dependencies,
		devDependencies,
		optionalDependencies,
		peerDependencies,
	} = StudioServerInternals.getInstalledDependencies(picusRoot);

	// Check if packages are already installed
	const allDeps = [
		...dependencies,
		...devDependencies,
		...optionalDependencies,
		...peerDependencies,
	];

	const alreadyInstalled: string[] = [];
	const toInstall: string[] = [];
	const toUpgrade: {pkg: string; from: string; to: string}[] = [];

	for (const pkg of packageNames) {
		const isInstalled = allDeps.includes(pkg);
		const requiredVersion = EXTRA_PACKAGES[pkg];

		if (!isInstalled) {
			toInstall.push(pkg);
		} else if (requiredVersion) {
			// For extra packages, check if the version is correct
			const installedVersion = getInstalledVersion(picusRoot, pkg);
			if (installedVersion !== requiredVersion) {
				toUpgrade.push({
					pkg,
					from: installedVersion ?? 'unknown',
					to: requiredVersion,
				});
				toInstall.push(pkg);
			} else {
				alreadyInstalled.push(pkg);
			}
		} else {
			alreadyInstalled.push(pkg);
		}
	}

	// Log already installed packages
	for (const pkg of alreadyInstalled) {
		Log.info(
			{indent: false, logLevel},
			`○ ${pkg} ${chalk.gray('(already installed)')}`,
		);
	}

	// Log packages that will be upgraded
	for (const {pkg, from, to} of toUpgrade) {
		Log.info(
			{indent: false, logLevel},
			`↑ ${pkg} ${chalk.yellow(`${from} → ${to}`)}`,
		);
	}

	// If nothing to install, return early
	if (toInstall.length === 0) {
		return;
	}

	const installedPicusPackages = listOfPicusPackages.filter((pkg) =>
		allDeps.includes(pkg),
	);

	// Get the version from the first installed Picus package
	const packageJsonPath = `${picusRoot}/node_modules/${installedPicusPackages[0]}/package.json`;
	let targetVersion: string | null = null;

	if (installedPicusPackages.length > 0) {
		try {
			const packageJson = require(packageJsonPath);
			targetVersion = packageJson.version;
			const packageList =
				toInstall.length === 1
					? toInstall[0]
					: `${toInstall.length} packages (${toInstall.join(', ')})`;
			Log.info({indent: false, logLevel}, `Installing ${packageList}`);
		} catch (err) {
			throw new Error(
				`Could not determine version of installed Picus packages: ${(err as Error).message}`,
			);
		}
	} else {
		// If no Picus packages are installed, we can only install extra packages
		const notExtraPackages = toInstall.filter((pkg) => !EXTRA_PACKAGES[pkg]);
		if (notExtraPackages.length > 0) {
			throw new Error(
				'No Picus packages found in your project. Install Picus first.',
			);
		}
	}

	const manager = StudioServerInternals.getPackageManager({
		picusRoot,
		packageManager,
		dirUp: 0,
		logLevel,
	});

	if (manager === 'unknown') {
		throw new Error(
			`No lockfile was found in your project (one of ${StudioServerInternals.lockFilePaths
				.map((p) => p.path)
				.join(', ')}). Install dependencies using your favorite manager!`,
		);
	}

	const packagesWithVersions = toInstall.map((pkg) => {
		if (EXTRA_PACKAGES[pkg]) {
			return `${pkg}@${EXTRA_PACKAGES[pkg]}`;
		}

		return `${pkg}@${targetVersion}`;
	});

	const command = StudioServerInternals.getInstallCommand({
		manager: manager.manager,
		packages: packagesWithVersions,
		version: '',
		additionalArgs: args,
	});

	Log.info(
		{indent: false, logLevel},
		chalk.gray(`$ ${manager.manager} ${command.join(' ')}`),
	);

	const task = spawn(manager.manager, command, {
		env: {
			...process.env,
			ADBLOCK: '1',
			DISABLE_OPENCOLLECTIVE: '1',
			npm_config_loglevel: 'error',
		},
		stdio: RenderInternals.isEqualOrBelowLogLevel(logLevel, 'info')
			? 'inherit'
			: 'ignore',
	});

	await new Promise<void>((resolve) => {
		task.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else if (RenderInternals.isEqualOrBelowLogLevel(logLevel, 'info')) {
				throw new Error(`Failed to install packages, see logs above`);
			} else {
				throw new Error(
					`Failed to install packages, run with --log=info to see logs`,
				);
			}
		});
	});

	const upgradedPkgs = new Set(toUpgrade.map((u) => u.pkg));

	for (const pkg of toInstall) {
		if (upgradedPkgs.has(pkg)) {
			// Already logged as upgrade
			continue;
		}

		if (EXTRA_PACKAGES[pkg]) {
			Log.info({indent: false, logLevel}, `+ ${pkg}@${EXTRA_PACKAGES[pkg]}`);
		} else {
			Log.info({indent: false, logLevel}, `+ ${pkg}@${targetVersion}`);
		}
	}
};
