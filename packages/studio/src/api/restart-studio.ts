/**
 * @description Restarts the Picus Studio.
 * @see [Documentation](https://www.picus.dev/docs/studio/restart-studio)
 */

import type {RestartStudioResponse} from '@picus/studio-shared';
import {getPicusEnvironment} from 'picus';
import {callApi} from '../components/call-api';

export const restartStudio = (): Promise<RestartStudioResponse> => {
	if (!getPicusEnvironment().isStudio) {
		throw new Error('restartStudio() is only available in the Studio');
	}

	if (window.picus_isReadOnlyStudio) {
		throw new Error('restartStudio() is not available in read-only Studio');
	}

	return callApi('/api/restart-studio', {});
};
