import type {
	SubscribeToSequencePropsRequest,
	SubscribeToSequencePropsResponse,
} from '@picus/studio-shared';
import type {ApiHandler} from '../api-types';
import {subscribeToSequencePropsWatchers} from '../sequence-props-watchers';

export const subscribeToSequenceProps: ApiHandler<
	SubscribeToSequencePropsRequest,
	SubscribeToSequencePropsResponse
> = ({input: {fileName, line, keys, clientId}, picusRoot}) => {
	const result = subscribeToSequencePropsWatchers({
		fileName,
		line,
		keys,
		picusRoot,
		clientId,
	});

	return Promise.resolve(result);
};
