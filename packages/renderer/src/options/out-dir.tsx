import type {AnyPicusOption} from './option';

const cliFlag = 'out-dir' as const;

let currentOutDir: string | null = null;

export const outDirOption = {
	name: 'Output Directory',
	cliFlag,
	description: () => {
		return (
			<>
				Define the location of the resulting bundle. By default it is a folder
				called <code>build</code>, adjacent to the{' '}
				<a href="/docs/terminology/picus-root">Picus Root</a>.
			</>
		);
	},
	ssrName: 'outDir' as const,
	docLink: 'https://www.picus.dev/docs/cli/bundle#--out-dir',
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			return {
				source: 'cli',
				value: commandLine[cliFlag] as string,
			};
		}

		if (currentOutDir !== null) {
			return {
				source: 'config',
				value: currentOutDir,
			};
		}

		return {
			source: 'default',
			value: null,
		};
	},
	setConfig: (value: string | null) => {
		currentOutDir = value;
	},
	type: '' as string | null,
	id: cliFlag,
} satisfies AnyPicusOption<string | null>;
