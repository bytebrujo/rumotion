import type {SyntheticEvent} from 'react';
import {Internals} from 'picus';

/*
 * @description Toggle playback of the current composition.
 * @see [Documentation](https://www.picus.dev/docs/studio/toggle)
 */
export const toggle = (e?: SyntheticEvent | PointerEvent) => {
	Internals.timeValueRef.current?.toggle(e);
};
