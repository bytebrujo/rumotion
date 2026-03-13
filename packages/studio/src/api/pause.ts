import {Internals} from 'picus';

/*
 * @description Pause the current composition.
 * @see [Documentation](https://www.picus.dev/docs/studio/pause)
 */
export const pause = () => {
	Internals.timeValueRef.current?.pause();
};
