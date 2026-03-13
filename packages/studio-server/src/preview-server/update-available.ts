import type {LogLevel} from '@picus/renderer';
import type {UpdateAvailableResponse} from '@picus/studio-shared';
import semver from 'semver';
import {getLatestPicusVersion} from '../get-latest-picus-version';
import {getPackageManager} from './get-package-manager';

const isUpdateAvailable = async ({
	picusRoot,
	currentVersion,
	logLevel,
}: {
	picusRoot: string;
	currentVersion: string;
	logLevel: LogLevel;
}): Promise<UpdateAvailableResponse> => {
	const latest = await getLatestPicusVersion();

	const pkgManager = getPackageManager({
		picusRoot,
		packageManager: undefined,
		dirUp: 0,
		logLevel,
	});

	return {
		updateAvailable: semver.lt(currentVersion, latest),
		currentVersion,
		latestVersion: latest,
		timedOut: false,
		packageManager: pkgManager === 'unknown' ? 'unknown' : pkgManager.manager,
	};
};

export const getPicusVersion = () => {
	// careful when refactoring this file, path must be adjusted
	const packageJson = require('../../package.json');

	const {version} = packageJson;

	return version;
};

export const isUpdateAvailableWithTimeout = (
	picusRoot: string,
	logLevel: LogLevel,
) => {
	const version = getPicusVersion();
	const threeSecTimeout = new Promise<UpdateAvailableResponse>((resolve) => {
		const pkgManager = getPackageManager({
			picusRoot,
			packageManager: undefined,
			dirUp: 0,
			logLevel,
		});
		setTimeout(() => {
			resolve({
				currentVersion: version,
				latestVersion: version,
				updateAvailable: false,
				timedOut: true,
				packageManager:
					pkgManager === 'unknown' ? 'unknown' : pkgManager.manager,
			});
		}, 3000);
	});
	return Promise.race([
		threeSecTimeout,
		isUpdateAvailable({picusRoot, currentVersion: version, logLevel}),
	]);
};
