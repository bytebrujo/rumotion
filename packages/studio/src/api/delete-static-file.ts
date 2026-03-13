import type {DeleteStaticFileResponse} from '@picus/studio-shared';
import {getPicusEnvironment} from 'picus';
import {callApi} from '../components/call-api';

export const deleteStaticFile = async (
	relativePath: string,
): Promise<DeleteStaticFileResponse> => {
	if (!getPicusEnvironment().isStudio) {
		throw new Error('deleteStaticFile() is only available in the Studio');
	}

	if (window.picus_isReadOnlyStudio) {
		throw new Error('deleteStaticFile() is not available in Read-Only Studio');
	}

	if (relativePath.startsWith(window.picus_staticBase)) {
		relativePath = relativePath.substring(
			window.picus_staticBase.length + 1,
		);
	}

	const res = await callApi('/api/delete-static-file', {relativePath});
	return res;
};

export {DeleteStaticFileResponse};
