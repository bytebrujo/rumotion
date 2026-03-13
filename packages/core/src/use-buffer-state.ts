import {useContext, useMemo} from 'react';
import {BufferingContextReact} from './buffering';

export type DelayPlaybackHandle = {
	unblock: () => void;
};

export type UseBufferState = {
	delayPlayback: () => DelayPlaybackHandle;
};

export const useBufferState = (): UseBufferState => {
	const buffer = useContext(BufferingContextReact);

	// Allows <Img> tag to be rendered without a context
	// https://github.com/picus-dev/picus/issues/4007
	const addBlock = buffer ? buffer.addBlock : null;

	return useMemo(
		() => ({
			delayPlayback: () => {
				if (!addBlock) {
					throw new Error(
						'Tried to enable the buffering state, but a Picus context was not found. This API can only be called in a component that was passed to the Picus Player or a <Composition>. Or you might have experienced a version mismatch - run `npx picus versions` and ensure all packages have the same version. This error is thrown by the buffer state https://picus.dev/docs/player/buffer-state',
					);
				}

				const {unblock} = addBlock({
					id: String(Math.random()),
				});

				return {unblock};
			},
		}),
		[addBlock],
	);
};
