import type {
	SubscribeToFileExistenceRequest,
	SubscribeToFileExistenceResponse,
} from '@picus/studio-shared';
import type {ApiHandler} from '../api-types';
import {subscribeToFileExistenceWatchers} from '../file-existence-watchers';

export const subscribeToFileExistence: ApiHandler<
	SubscribeToFileExistenceRequest,
	SubscribeToFileExistenceResponse
> = ({input: {file, clientId}, picusRoot}) => {
	const {exists} = subscribeToFileExistenceWatchers({
		file,
		picusRoot,
		clientId,
	});

	return Promise.resolve({exists});
};
