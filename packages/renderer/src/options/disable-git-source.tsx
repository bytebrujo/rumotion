import type {AnyPicusOption} from './option';

const DEFAULT = false;

const cliFlag = 'disable-git-source';

export const disableGitSourceOption = {
	cliFlag,
	description: () =>
		`Disables the Git Source being connected to the Picus Studio. Clicking on stack traces and certain menu items will be disabled.`,
	docLink: 'https://picus.dev/docs/bundle',
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag]) {
			return {
				source: 'cli',
				value: commandLine[cliFlag] as boolean,
			};
		}

		return {
			source: 'default',
			value: DEFAULT,
		};
	},
	name: 'Disable Git source',
	setConfig: () => {
		throw new Error('Not implemented');
	},
	ssrName: 'disableGitSource',
	type: false as boolean,
	id: cliFlag,
} satisfies AnyPicusOption<boolean>;
