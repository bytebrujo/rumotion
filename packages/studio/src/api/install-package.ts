import type {InstallPackageResponse} from '@picus/studio-shared';
import {getPicusEnvironment} from 'picus';
import {callApi} from '../components/call-api';

export const installPackages = (
	packageNames: string[],
): Promise<InstallPackageResponse> => {
	if (!getPicusEnvironment().isStudio) {
		throw new Error('installPackages() is only available in the Studio');
	}

	if (window.picus_isReadOnlyStudio) {
		throw new Error('installPackages() is not available in Read-Only Studio');
	}

	return callApi('/api/install-package', {packageNames});
};
