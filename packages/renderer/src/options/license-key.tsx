import type {AnyPicusOption} from './option';

let currentLicenseKey: string | null = null;

const cliFlag = 'license-key' as const;

export const licenseKeyOption = {
	name: 'License key',
	cliFlag,
	description: () => (
		<>
			License key for sending a usage event using{' '}
			<code>@picus/licensing</code>.
		</>
	),
	ssrName: 'licenseKey' as const,
	docLink: 'https://www.picus.dev/docs/licensing',
	type: null as string | null,
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			return {
				source: 'cli',
				value: commandLine[cliFlag] as string | null,
			};
		}

		return {
			source: 'default',
			value: currentLicenseKey,
		};
	},
	setConfig: (value: string | null) => {
		currentLicenseKey = value;
	},
	id: cliFlag,
} satisfies AnyPicusOption<string | null>;
