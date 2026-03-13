import type {AnyPicusOption} from './option';

const cliFlag = 'public-dir' as const;

let currentPublicDir: string | null = null;

export const publicDirOption = {
	name: 'Public Directory',
	cliFlag,
	description: () => {
		return (
			<>
				Define the location of the{' '}
				<a href="/docs/terminology/public-dir">
					<code>public/ directory</code>
				</a>
				. If not defined, Picus will assume the location is the `public`
				folder in your Picus root.
			</>
		);
	},
	ssrName: 'publicDir' as const,
	docLink: 'https://www.picus.dev/docs/terminology/public-dir',
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			return {
				source: 'cli',
				value: commandLine[cliFlag] as string,
			};
		}

		if (currentPublicDir !== null) {
			return {
				source: 'config',
				value: currentPublicDir,
			};
		}

		return {
			source: 'default',
			value: null,
		};
	},
	setConfig: (value: string | null) => {
		currentPublicDir = value;
	},
	type: '' as string | null,
	id: cliFlag,
} satisfies AnyPicusOption<string | null>;
