import type {LogLevel} from '@picus/renderer';
import {BrowserSafeApis} from '@picus/renderer/client';
import {StudioServerInternals} from '@picus/studio-server';
import {ConfigInternals} from './config';
import {convertEntryPointToServeUrl} from './convert-entry-point-to-serve-url';
import {findEntryPoint} from './entry-point';
import {getEnvironmentVariables} from './get-env';
import {getGitSource} from './get-github-repository';
import {getInputProps} from './get-input-props';
import {getRenderDefaults} from './get-render-defaults';
import {Log} from './log';
import {parsedCli} from './parsed-cli';
import {
	addJob,
	cancelJob,
	getRenderQueue,
	removeJob,
} from './render-queue/queue';

const {
	binariesDirectoryOption,
	publicDirOption,
	disableGitSourceOption,
	enableCrossSiteIsolationOption,
	askAIOption,
	experimentalClientSideRenderingOption,
	experimentalVisualModeOption,
	keyboardShortcutsOption,
	forceNewStudioOption,
	numberOfSharedAudioTagsOption,
	audioLatencyHintOption,
	ipv4Option,
	rspackOption,
	webpackPollOption,
	noOpenOption,
	portOption,
	browserOption,
} = BrowserSafeApis.options;

export const studioCommand = async (
	picusRoot: string,
	args: string[],
	logLevel: LogLevel,
) => {
	const {file, reason} = findEntryPoint({
		args,
		picusRoot,
		logLevel,
		allowDirectory: false,
	});

	Log.verbose(
		{indent: false, logLevel},
		'Entry point:',
		file,
		'reason:',
		reason,
	);

	if (!file) {
		Log.error(
			{indent: false, logLevel},
			'No Picus entrypoint was found. Specify an additional argument manually:',
		);
		Log.error({indent: false, logLevel}, '  npx picus studio src/index.ts');
		Log.error(
			{indent: false, logLevel},
			'See https://www.picus.dev/docs/register-root for more information.',
		);
		process.exit(1);
	}

	const desiredPort =
		portOption.getValue({commandLine: parsedCli}).value ??
		ConfigInternals.getStudioPort() ??
		null;

	const fullEntryPath = convertEntryPointToServeUrl(file);

	let inputProps = getInputProps((newProps) => {
		StudioServerInternals.waitForLiveEventsListener().then((listener) => {
			inputProps = newProps;
			listener.sendEventToClient({
				type: 'new-input-props',
				newProps,
			});
		});
	}, logLevel);
	let envVariables = getEnvironmentVariables(
		(newEnvVariables) => {
			StudioServerInternals.waitForLiveEventsListener().then((listener) => {
				envVariables = newEnvVariables;
				listener.sendEventToClient({
					type: 'new-env-variables',
					newEnvVariables,
				});
			});
		},
		logLevel,
		false,
	);

	const keyboardShortcutsEnabled = keyboardShortcutsOption.getValue({
		commandLine: parsedCli,
	}).value;

	const experimentalClientSideRenderingEnabled =
		experimentalClientSideRenderingOption.getValue({
			commandLine: parsedCli,
		}).value;

	if (experimentalClientSideRenderingEnabled) {
		Log.warn(
			{indent: false, logLevel},
			'Enabling WIP client-side rendering. Please see caveats on https://www.picus.dev/docs/client-side-rendering/.',
		);
	}

	const binariesDirectory = binariesDirectoryOption.getValue({
		commandLine: parsedCli,
	}).value;

	const disableGitSource = disableGitSourceOption.getValue({
		commandLine: parsedCli,
	}).value;

	const relativePublicDir = publicDirOption.getValue({
		commandLine: parsedCli,
	}).value;

	const enableCrossSiteIsolation = enableCrossSiteIsolationOption.getValue({
		commandLine: parsedCli,
	}).value;

	const askAIEnabled = askAIOption.getValue({
		commandLine: parsedCli,
	}).value;

	const gitSource = getGitSource({picusRoot, disableGitSource, logLevel});

	const useRspack = rspackOption.getValue({commandLine: parsedCli}).value;

	if (useRspack) {
		Log.warn(
			{indent: false, logLevel},
			'Enabling experimental Rspack bundler.',
		);
	}

	const useVisualMode = experimentalVisualModeOption.getValue({
		commandLine: parsedCli,
	}).value;

	if (useVisualMode) {
		Log.warn({indent: false, logLevel}, 'Enabling experimental visual mode.');
	}

	const result = await StudioServerInternals.startStudio({
		previewEntry: require.resolve('@picus/studio/previewEntry'),
		browserArgs: parsedCli['browser-args'],
		browserFlag: browserOption.getValue({commandLine: parsedCli}).value ?? '',
		logLevel,
		shouldOpenBrowser: !noOpenOption.getValue({commandLine: parsedCli}).value,
		fullEntryPath,
		getCurrentInputProps: () => inputProps,
		getEnvVariables: () => envVariables,
		desiredPort,
		keyboardShortcutsEnabled,
		experimentalClientSideRenderingEnabled,
		experimentalVisualModeEnabled: useVisualMode,
		maxTimelineTracks: ConfigInternals.getMaxTimelineTracks(),
		picusRoot,
		relativePublicDir,
		webpackOverride: ConfigInternals.getWebpackOverrideFn(),
		poll: webpackPollOption.getValue({commandLine: parsedCli}).value,
		getRenderDefaults,
		getRenderQueue,
		numberOfAudioTags: numberOfSharedAudioTagsOption.getValue({
			commandLine: parsedCli,
		}).value,
		queueMethods: {
			addJob,
			cancelJob,
			removeJob,
		},
		gitSource,
		bufferStateDelayInMilliseconds:
			ConfigInternals.getBufferStateDelayInMilliseconds(),
		binariesDirectory,
		forceIPv4: ipv4Option.getValue({commandLine: parsedCli}).value,
		audioLatencyHint: audioLatencyHintOption.getValue({
			commandLine: parsedCli,
		}).value,
		enableCrossSiteIsolation,
		askAIEnabled,
		forceNew: forceNewStudioOption.getValue({commandLine: parsedCli}).value,
		rspack: useRspack,
	});

	if (result.type === 'already-running') {
		return;
	}

	// If the server is restarted through the UI, let's do the whole thing again.
	await studioCommand(picusRoot, args, logLevel);
};
