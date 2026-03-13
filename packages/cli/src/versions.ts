import fs from 'node:fs';
import path from 'node:path';
import type {LogLevel, LogOptions} from '@picus/renderer';
import {RenderInternals} from '@picus/renderer';
import {chalk} from './chalk';
import {EXTRA_PACKAGES, EXTRA_PACKAGES_DOCS} from './extra-packages';
import {listOfPicusPackages} from './list-of-picus-packages';
import {Log} from './log';
import {parseCommandLine} from './parse-command-line';
import {resolveFrom} from './resolve-from';

export type VersionAndPath = {version: string; path: string};

const getVersion = async (
	picusRoot: string,
	p: string,
): Promise<VersionAndPath | null> => {
	try {
		const picusPkgJson = resolveFrom(picusRoot, `${p}/package.json`);
		const file = await fs.promises.readFile(picusPkgJson, 'utf-8');
		const packageJson = JSON.parse(file);
		return {version: packageJson.version, path: picusPkgJson};
	} catch {
		return null;
	}
};

type Val = {
	pkg: string;
	versionAndPath: VersionAndPath;
};

const groupBy = (vals: [string, VersionAndPath][]) => {
	const groups: {[key: string]: Val[]} = {};
	for (const [pkg, version] of vals) {
		if (!groups[version.version]) {
			groups[version.version] = [];
		}

		(groups[version.version] as Val[]).push({
			pkg,
			versionAndPath: version,
		});
	}

	return groups;
};

const getAllVersions = async (
	picusRoot: string,
): Promise<[string, VersionAndPath][]> => {
	return (
		await Promise.all(
			listOfPicusPackages.map(
				async (p) =>
					[p, await getVersion(picusRoot, p)] as [string, VersionAndPath],
			),
		)
	).filter(([, version]) => version);
};

type ExtraPackageStatus = {
	pkg: string;
	requiredVersion: string;
	installedVersion: string | null;
	path: string | null;
	isCorrect: boolean;
};

const getExtraPackagesStatus = async (
	picusRoot: string,
): Promise<ExtraPackageStatus[]> => {
	const results: ExtraPackageStatus[] = [];

	for (const [pkg, requiredVersion] of Object.entries(EXTRA_PACKAGES)) {
		const versionAndPath = await getVersion(picusRoot, pkg);

		if (versionAndPath) {
			results.push({
				pkg,
				requiredVersion,
				installedVersion: versionAndPath.version,
				path: versionAndPath.path,
				isCorrect: versionAndPath.version === requiredVersion,
			});
		} else {
			results.push({
				pkg,
				requiredVersion,
				installedVersion: null,
				path: null,
				isCorrect: true, // Not installed is fine - only validate if installed
			});
		}
	}

	return results;
};

export const VERSIONS_COMMAND = 'versions';

export const validateVersionsBeforeCommand = async (
	picusRoot: string,
	logLevel: LogLevel,
) => {
	const versions = await getAllVersions(picusRoot);

	const grouped = groupBy(versions);

	const installedVersions = Object.keys(grouped);

	const hasPicusMismatch =
		installedVersions.length > 1 && installedVersions.length !== 0;

	// Check extra packages
	const extraPackagesStatus = await getExtraPackagesStatus(picusRoot);
	const incorrectExtraPackages = extraPackagesStatus.filter(
		(status) => !status.isCorrect,
	);

	if (!hasPicusMismatch && incorrectExtraPackages.length === 0) {
		return;
	}

	// Could be a global install of @picus/cli.
	// If you render a bundle with a different version, it will give a warning accordingly.
	if (installedVersions.length === 0 && incorrectExtraPackages.length === 0) {
		return;
	}

	const logOptions: LogOptions = {indent: false, logLevel};
	Log.warn(logOptions, '-------------');
	Log.warn(logOptions, 'Version mismatch:');

	if (hasPicusMismatch) {
		for (const version of installedVersions) {
			Log.warn(logOptions, `- On version: ${version}`);
			for (const pkg of grouped[version] ?? []) {
				Log.warn(
					logOptions,
					`  - ${pkg.pkg} ${chalk.gray(path.relative(picusRoot, pkg.versionAndPath.path))}`,
				);
			}

			Log.info({indent: false, logLevel});
		}
	}

	if (incorrectExtraPackages.length > 0) {
		Log.warn(logOptions, 'Extra packages with wrong versions:');
		for (const status of incorrectExtraPackages) {
			const docLink = EXTRA_PACKAGES_DOCS[status.pkg];
			Log.warn(
				logOptions,
				`  - ${status.pkg}: installed ${status.installedVersion}, required ${status.requiredVersion}`,
			);
			if (docLink) {
				Log.warn(logOptions, `    See: ${docLink}`);
			}
		}

		Log.info({indent: false, logLevel});
	}

	Log.warn(logOptions, 'You may experience breakages such as:');
	Log.warn(logOptions, '- React context and hooks not working');
	Log.warn(logOptions, '- Type errors and feature incompatibilities');
	Log.warn(logOptions, '- Failed renders and unclear errors');
	Log.warn(logOptions);
	Log.warn(logOptions, 'To resolve:');
	Log.warn(
		logOptions,
		'- Make sure your package.json has all Picus packages pointing to the same version.',
	);
	Log.warn(
		logOptions,
		'- Remove the `^` character in front of a version to pin a package.',
	);
	for (const incorrectPkg of incorrectExtraPackages) {
		Log.warn(
			logOptions,
			`- For ${incorrectPkg.pkg}, install exact version ${incorrectPkg.requiredVersion} (run: npx picus add ${incorrectPkg.pkg}).`,
		);
	}

	if (!RenderInternals.isEqualOrBelowLogLevel(logLevel, 'verbose')) {
		Log.warn(
			logOptions,
			'- Run `npx picus versions --log=verbose` to see the path of the modules resolved.',
		);
	}

	Log.warn(logOptions, '-------------');
	Log.info({indent: false, logLevel});
};

export const versionsCommand = async (
	picusRoot: string,
	logLevel: LogLevel,
) => {
	parseCommandLine();
	const versions = await getAllVersions(picusRoot);

	const grouped = groupBy(versions);

	const installedVersions = Object.keys(grouped);

	Log.info(
		{indent: false, logLevel},
		`Node.JS = ${process.version}, OS = ${process.platform}`,
	);
	Log.info({indent: false, logLevel});
	for (const version of installedVersions) {
		Log.info({indent: false, logLevel}, `On version: ${version}`);
		for (const pkg of grouped[version] ?? []) {
			Log.info({indent: false, logLevel}, `- ${pkg.pkg}`);
			Log.verbose(
				{indent: false, logLevel},
				`  ${resolveFrom(picusRoot, `${pkg.pkg}/package.json`)}`,
			);
		}

		Log.info({indent: false, logLevel});
	}

	// Check extra packages
	const extraPackagesStatus = await getExtraPackagesStatus(picusRoot);
	const installedExtraPackages = extraPackagesStatus.filter(
		(status) => status.installedVersion !== null,
	);

	if (installedExtraPackages.length > 0) {
		Log.info({indent: false, logLevel}, 'Extra packages:');
		for (const status of installedExtraPackages) {
			const versionStatus = status.isCorrect
				? chalk.green(`${status.installedVersion}`)
				: chalk.red(
						`${status.installedVersion} (required: ${status.requiredVersion})`,
					);
			Log.info({indent: false, logLevel}, `- ${status.pkg}@${versionStatus}`);
			if (status.path) {
				Log.verbose({indent: false, logLevel}, `  ${status.path}`);
			}
		}

		Log.info({indent: false, logLevel});
	}

	if (installedVersions.length === 0) {
		Log.info({indent: false, logLevel}, 'No Picus packages found.');
		Log.info(
			{indent: false, logLevel},
			'Maybe @picus/cli is installed globally.',
		);

		Log.info(
			{indent: false, logLevel},
			'If you try to render a video that was bundled with a different version, you will get a warning.',
		);
		process.exit(1);
	}

	const incorrectExtraPackages = extraPackagesStatus.filter(
		(status) => !status.isCorrect,
	);

	if (installedVersions.length === 1 && incorrectExtraPackages.length === 0) {
		Log.info(
			{indent: false, logLevel},
			`All packages have the correct version.`,
		);
	} else {
		if (installedVersions.length !== 1) {
			Log.error(
				{indent: false, logLevel},
				'Version mismatch: Not all Picus packages have the same version.',
			);
			Log.info(
				{indent: false, logLevel},
				'- Make sure your package.json has all Picus packages pointing to the same version.',
			);
			Log.info(
				{indent: false, logLevel},
				'- Remove the `^` character in front of a version to pin a package.',
			);
		}

		if (incorrectExtraPackages.length > 0) {
			Log.error(
				{indent: false, logLevel},
				'Extra packages have incorrect versions:',
			);
			for (const status of incorrectExtraPackages) {
				const docLink = EXTRA_PACKAGES_DOCS[status.pkg];
				Log.info(
					{indent: false, logLevel},
					`- ${status.pkg}: installed ${status.installedVersion}, required ${status.requiredVersion}`,
				);
				if (docLink) {
					Log.info({indent: false, logLevel}, `  See: ${docLink}`);
				}
			}

			Log.info(
				{indent: false, logLevel},
				`To fix, run: npx picus add ${incorrectExtraPackages.map((s) => s.pkg).join(' ')}`,
			);
		}

		if (!RenderInternals.isEqualOrBelowLogLevel(logLevel, 'verbose')) {
			Log.info(
				{indent: false, logLevel},
				'- Rerun this command with --log=verbose to see the path of the modules resolved.',
			);
		}

		process.exit(1);
	}
};
