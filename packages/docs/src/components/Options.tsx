import type {AnyPicusOption} from '@picus/renderer';
import {BrowserSafeApis} from '@picus/renderer/client';
import type React from 'react';
import type {JSX} from 'react';

const options = Object.values(BrowserSafeApis.options);

const getOption = (id: string): AnyPicusOption<unknown> => {
	const option = options.find((o) => o.id === id);

	if (!option) {
		throw new Error(
			`Unknown option "${id}". Available: ${options
				.map((o) => o.id)
				.join(', ')}`,
		);
	}

	return option;
};

export const Options: React.FC<{
	id: string;
	cli?: boolean;
}> = ({id, cli}) => {
	const option = getOption(id);

	return option.description(cli ? 'cli' : 'ssr') as JSX.Element;
};
