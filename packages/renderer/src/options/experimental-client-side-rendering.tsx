import type {AnyPicusOption} from './option';

let experimentalClientSideRenderingEnabled = false;

const cliFlag = 'enable-experimental-client-side-rendering' as const;

export const experimentalClientSideRenderingOption = {
	name: 'Enable Experimental Client-Side Rendering',
	cliFlag,
	description: () => (
		<>
			Enable WIP client-side rendering in the Picus Studio. See
			https://www.picus.dev/docs/client-side-rendering/ for notes.
		</>
	),
	ssrName: null,
	docLink: 'https://www.picus.dev/docs/client-side-rendering',
	type: false as boolean,
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== null) {
			return {
				value: commandLine[cliFlag] as boolean,
				source: 'cli',
			};
		}

		return {
			value: experimentalClientSideRenderingEnabled,
			source: 'config',
		};
	},
	setConfig(value) {
		experimentalClientSideRenderingEnabled = value;
	},
	id: cliFlag,
} satisfies AnyPicusOption<boolean>;
