import type {UnsubscribeFromFileExistenceRequest} from '@picus/studio-shared';
import type {ApiHandler} from '../api-types';
import {unsubscribeFromFileExistenceWatchers} from '../file-existence-watchers';

export const unsubscribeFromFileExistence: ApiHandler<
	UnsubscribeFromFileExistenceRequest,
	undefined
> = ({input, picusRoot}) => {
	unsubscribeFromFileExistenceWatchers({
		file: input.file,
		clientId: input.clientId,
		picusRoot,
	});
	return Promise.resolve(undefined);
};
