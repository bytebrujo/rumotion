import {Internals} from 'picus';

export const reevaluateComposition = () => {
	Internals.resolveCompositionsRef.current?.reloadCurrentlySelectedComposition();
};
