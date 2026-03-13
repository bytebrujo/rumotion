import {Internals} from 'picus';

/*
 * @description Jump to a different time in the timeline.
 * @see [Documentation](https://www.picus.dev/docs/studio/seek)
 */
export const seek = (frame: number) => {
	Internals.timeValueRef.current?.seek(Math.max(0, frame));
};
