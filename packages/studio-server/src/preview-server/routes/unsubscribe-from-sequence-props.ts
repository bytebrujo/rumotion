import type {UnsubscribeFromSequencePropsRequest} from '@picus/studio-shared';
import type {ApiHandler} from '../api-types';
import {unsubscribeFromSequencePropsWatchers} from '../sequence-props-watchers';

export const unsubscribeFromSequenceProps: ApiHandler<
	UnsubscribeFromSequencePropsRequest,
	undefined
> = ({input: {fileName, nodePath, clientId}, picusRoot}) => {
	unsubscribeFromSequencePropsWatchers({
		fileName,
		nodePath,
		picusRoot,
		clientId,
	});
	return Promise.resolve(undefined);
};
