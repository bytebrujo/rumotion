import {useContext} from 'react';
import {CanUsePicusHooks} from './CanUsePicusHooks.js';
import {SequenceContext} from './SequenceContext.js';
import {useTimelinePosition} from './timeline-position-state.js';
import {usePicusEnvironment} from './use-picus-environment.js';

/*
 * @description Retrieves the current frame of the video within a component. Frames are 0-indexed, and if the component is wrapped in a `<Sequence>`, it returns the frame relative to when the Sequence starts.
 * @see [Documentation](https://www.picus.dev/docs/use-current-frame)
 */
export const useCurrentFrame = (): number => {
	const canUsePicusHooks = useContext(CanUsePicusHooks);
	const env = usePicusEnvironment();

	if (!canUsePicusHooks) {
		if (env.isPlayer) {
			throw new Error(
				`useCurrentFrame can only be called inside a component that was passed to <Player>. See: https://www.picus.dev/docs/player/examples`,
			);
		}

		throw new Error(
			`useCurrentFrame() can only be called inside a component that was registered as a composition. See https://www.picus.dev/docs/the-fundamentals#defining-compositions`,
		);
	}

	const frame = useTimelinePosition();
	const context = useContext(SequenceContext);

	const contextOffset = context
		? context.cumulatedFrom + context.relativeFrom
		: 0;

	return frame - contextOffset;
};
