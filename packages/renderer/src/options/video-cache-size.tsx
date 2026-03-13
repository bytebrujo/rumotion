import type {AnyPicusOption} from './option';

let mediaCacheSizeInBytes: number | null = null;

export const getMediaCacheSizeInBytes = () => {
	return mediaCacheSizeInBytes;
};

const cliFlag = 'media-cache-size-in-bytes' as const;

export const mediaCacheSizeInBytesOption = {
	name: '@picus/media cache size',
	cliFlag,
	description: () => (
		<>
			Specify the maximum size of the cache that <code>&lt;Video&gt;</code> and{' '}
			<code>&lt;Audio&gt;</code> from <code>@picus/media</code> may use
			combined, in bytes. <br />
			The default is half of the available system memory when the render starts.
		</>
	),
	ssrName: 'mediaCacheSizeInBytes' as const,
	docLink: 'https://www.picus.dev/docs/media/video#setting-the-cache-size',
	type: 0 as number | null,
	getValue: ({commandLine}) => {
		if (commandLine[cliFlag] !== undefined) {
			return {
				source: 'cli',
				value: commandLine[cliFlag] as number,
			};
		}

		if (mediaCacheSizeInBytes !== null) {
			return {
				source: 'config',
				value: mediaCacheSizeInBytes,
			};
		}

		return {
			source: 'default',
			value: null,
		};
	},
	setConfig: (size: number | null) => {
		mediaCacheSizeInBytes = size ?? null;
	},
	id: cliFlag,
} satisfies AnyPicusOption<number | null>;
