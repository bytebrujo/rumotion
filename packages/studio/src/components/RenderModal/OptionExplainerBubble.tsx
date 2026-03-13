import type {AnyPicusOption} from '@picus/renderer';
import type {AvailableOptions} from '@picus/renderer/client';
import {BrowserSafeApis} from '@picus/renderer/client';
import {InfoBubble} from './InfoBubble';
import {OptionExplainer} from './OptionExplainer';

export const OptionExplainerBubble: React.FC<{
	id: AvailableOptions;
}> = ({id}) => {
	const option = BrowserSafeApis.options[id] as AnyPicusOption<unknown>;

	return (
		<InfoBubble title="Learn more about this option">
			<OptionExplainer option={option} />
		</InfoBubble>
	);
};
