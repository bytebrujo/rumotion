import {getPicusEnvironment} from 'picus';
import {
	visualControlRef,
	type VisualControlRef,
} from '../visual-controls/VisualControls';

export const visualControl: VisualControlRef['globalVisualControl'] = (
	key,
	value,
	schema,
) => {
	if (getPicusEnvironment().isRendering) {
		return value;
	}

	if (!visualControlRef.current) {
		return value;
	}

	return visualControlRef.current.globalVisualControl(key, value, schema);
};
