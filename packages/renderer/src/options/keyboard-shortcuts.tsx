import type {AnyPicusOption} from './option';

let keyboardShortcutsEnabled = true;

const cliFlag = 'disable-keyboard-shortcuts' as const;

export const keyboardShortcutsOption = {
	name: 'Disable or Enable keyboard shortcuts',
	cliFlag,
	description: () => (
		<>Enable or disable keyboard shortcuts in the Picus Studio.</>
	),
	ssrName: null,
	docLink: 'https://www.picus.dev/docs/config#setkeyboardshortcutsenabled',
	type: false as boolean,
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			keyboardShortcutsEnabled = commandLine[cliFlag] === false;
			return {
				value: keyboardShortcutsEnabled,
				source: 'cli',
			};
		}

		return {
			value: keyboardShortcutsEnabled,
			source: 'config',
		};
	},
	setConfig(value) {
		keyboardShortcutsEnabled = value;
	},
	id: cliFlag,
} satisfies AnyPicusOption<boolean>;
