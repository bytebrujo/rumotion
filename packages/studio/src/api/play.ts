import type {SyntheticEvent} from 'react';
import {Internals} from 'picus';

/*
 * @description Play the current composition.
 * @see [Documentation](https://www.picus.dev/docs/studio/play)
 */
export const play = (e?: SyntheticEvent | PointerEvent) => {
	Internals.timeValueRef.current?.play(e);
};
