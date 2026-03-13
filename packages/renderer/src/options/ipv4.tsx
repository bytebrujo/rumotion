import type {AnyPicusOption} from './option';

let forceIPv4 = false;

const cliFlag = 'ipv4' as const;

export const ipv4Option = {
	name: 'IPv4',
	cliFlag,
	description: () => (
		<>Forces Picus to bind to an IPv4 interface for the Studio server.</>
	),
	ssrName: null,
	docLink: 'https://www.picus.dev/docs/cli/studio',
	type: false as boolean,
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			return {
				value: commandLine[cliFlag] as boolean,
				source: 'cli',
			};
		}

		return {
			value: forceIPv4,
			source: 'config',
		};
	},
	setConfig(value: boolean) {
		forceIPv4 = value;
	},
	id: cliFlag,
} satisfies AnyPicusOption<boolean>;
