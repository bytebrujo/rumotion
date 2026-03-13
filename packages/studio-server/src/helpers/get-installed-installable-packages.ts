import {extraPackages, installableMap} from '@picus/studio-shared';
import {getInstalledDependencies} from './get-installed-dependencies';

export const getInstalledInstallablePackages = (
	picusRoot: string,
): string[] => {
	const {dependencies, devDependencies, optionalDependencies} =
		getInstalledDependencies(picusRoot);
	const installablePackages = [
		...dependencies,
		...devDependencies,
		...optionalDependencies,
	];

	const picusPackages = Object.entries(installableMap)
		.filter(([, _installable]) => _installable)
		.map(([pkg]) => (pkg === 'core' ? 'picus' : `@picus/${pkg}`))
		.filter((pkg) => installablePackages.includes(pkg));

	const installedExtraPackages = extraPackages
		.map((pkg) => pkg.name)
		.filter((pkg) => installablePackages.includes(pkg));

	return [...picusPackages, ...installedExtraPackages];
};
