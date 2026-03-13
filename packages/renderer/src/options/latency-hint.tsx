import type {AnyPicusOption} from './option';

const cliFlag = 'audio-latency-hint' as const;

let value: AudioContextLatencyCategory | null = null;

export const audioLatencyHintOption = {
	name: 'Audio Latency Hint',
	cliFlag,
	description: () => (
		<>
			Sets the{' '}
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext">
				audio latency
			</a>{' '}
			hint for the global <code>AudioContext</code> context that Picus uses
			to play audio.
			<br />
			Possible values: <code>interactive</code>, <code>balanced</code>,{' '}
			<code>playback</code>
		</>
	),
	ssrName: 'audioLatencyHint' as const,
	docLink: 'https://www.picus.dev/docs/renderer/render-media',
	type: 'interactive' as AudioContextLatencyCategory,
	getValue: ({commandLine}) => {
		const val = commandLine[cliFlag];
		if (typeof val !== 'undefined') {
			return {value: val as AudioContextLatencyCategory, source: 'cli'};
		}

		if (value !== null) {
			return {value, source: 'config'};
		}

		return {value: null, source: 'default'};
	},
	setConfig: (profile: AudioContextLatencyCategory | null) => {
		value = profile;
	},
	id: cliFlag,
} satisfies AnyPicusOption<AudioContextLatencyCategory | null>;
