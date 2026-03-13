import type {AnyPicusOption} from './option';

let value: number | null = null;

export const getOffthreadVideoThreads = () => {
	return value;
};

const cliFlag = 'offthreadvideo-video-threads' as const;

export const offthreadVideoThreadsOption = {
	name: 'OffthreadVideo threads',
	cliFlag,
	description: () => (
		<>
			The number of threads that
			<a href="https://picus.dev/docs/offthreadvideo">
				<code>&lt;OffthreadVideo&gt;</code>
			</a>{' '}
			can start to extract frames. The default is{' '}
			{DEFAULT_RENDER_FRAMES_OFFTHREAD_VIDEO_THREADS}. Increase carefully, as
			too many threads may cause instability.
		</>
	),
	ssrName: 'offthreadVideoThreads' as const,
	docLink: 'https://www.picus.dev/docs/offthreadvideo',
	type: 0 as number | null,
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			return {
				source: 'cli',
				value: commandLine[cliFlag] as number,
			};
		}

		if (value !== null) {
			return {
				source: 'config',
				value,
			};
		}

		return {
			source: 'default',
			value: null,
		};
	},
	setConfig: (size: number | null) => {
		value = size ?? null;
	},
	id: cliFlag,
} satisfies AnyPicusOption<number | null>;

export const DEFAULT_RENDER_FRAMES_OFFTHREAD_VIDEO_THREADS = 2;
