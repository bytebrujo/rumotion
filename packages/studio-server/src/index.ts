import {formatBytes} from '@picus/studio-shared';
export {
	ApiRoutes,
	CopyStillToClipboardRequest,
	getDefaultOutLocation,
	OpenInFileExplorerRequest,
} from '@picus/studio-shared';
export type {
	AggregateRenderProgress,
	BundlingState,
	CopyingState,
	DownloadProgress,
	HotMiddlewareOptions,
	JobProgressCallback,
	ModuleMap,
	PackageManager,
	ProjectInfo,
	RenderingProgressInput,
	RenderJob,
	RenderJobWithCleanup,
	RequiredChromiumOptions,
	StitchingProgressInput,
	UiOpenGlOptions,
} from '@picus/studio-shared';

import {AnsiDiff} from './ansi-diff';
import {
	addCompletedClientRender,
	getCompletedClientRenders,
	removeCompletedClientRender,
} from './client-render-queue';
import {parseAndApplyCodemod} from './codemods/duplicate-composition';
import {installFileWatcher} from './file-watcher';
import {getLatestPicusVersion} from './get-latest-picus-version';
import {
	getInstalledDependencies,
	getInstalledDependenciesWithVersions,
} from './helpers/get-installed-dependencies';
import {getInstallCommand} from './helpers/install-command';
import {
	getMaxTimelineTracks,
	setMaxTimelineTracks,
} from './max-timeline-tracks';
import {
	getPackageManager,
	lockFilePaths,
} from './preview-server/get-package-manager';
import {waitForLiveEventsListener} from './preview-server/live-events';
import {getPicusVersion} from './preview-server/update-available';
import {startStudio} from './start-studio';

export const StudioServerInternals = {
	startStudio,
	getPicusVersion,
	waitForLiveEventsListener,
	lockFilePaths,
	getPackageManager,
	getMaxTimelineTracks,
	setMaxTimelineTracks,
	getLatestPicusVersion,
	installFileWatcher,
	AnsiDiff,
	formatBytes,
	parseAndApplyCodemod,
	getInstalledDependencies,
	getInstalledDependenciesWithVersions,
	getInstallCommand,
	addCompletedClientRender,
	getCompletedClientRenders,
	removeCompletedClientRender,
};
