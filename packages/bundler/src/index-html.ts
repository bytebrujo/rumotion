import type {
	GitSource,
	PackageManager,
	RenderDefaults,
} from '@picus/studio-shared';
import type {LogLevel, StaticFile} from 'picus';
import {Internals, VERSION} from 'picus';

export const indexHtml = ({
	publicPath,
	editorName,
	inputProps,
	envVariables,
	staticHash,
	picusRoot,
	studioServerCommand,
	renderQueue,
	completedClientRenders,
	numberOfAudioTags,
	publicFiles,
	includeFavicon,
	title,
	renderDefaults,
	publicFolderExists,
	gitSource,
	projectName,
	installedDependencies,
	packageManager,
	audioLatencyHint,
	logLevel,
	mode,
}: {
	staticHash: string;
	publicPath: string;
	editorName: string | null;
	inputProps: object | null;
	envVariables?: Record<string, string>;
	picusRoot: string;
	studioServerCommand: string | null;
	renderQueue: unknown | null;
	completedClientRenders?: unknown | null;
	numberOfAudioTags: number;
	audioLatencyHint: AudioContextLatencyCategory;
	publicFiles: StaticFile[];
	publicFolderExists: string | null;
	includeFavicon: boolean;
	title: string;
	renderDefaults: RenderDefaults | undefined;
	gitSource: GitSource | null;
	projectName: string;
	installedDependencies: string[] | null;
	packageManager: PackageManager | 'unknown';
	logLevel: LogLevel;
	mode: 'dev' | 'bundle';
}) =>
	// Must setup picus_editorName and picus.picus_projectName before bundle.js is loaded
	`
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		${
			includeFavicon
				? `<link id="__picus_favicon" rel="icon" type="image/png" href="${publicPath}favicon.ico" />`
				: ''
		}
		<title>${title}</title>
	</head>
	<body>
		<script>window.picus_numberOfAudioTags = ${numberOfAudioTags};</script>
		<script>window.picus_audioLatencyHint = "${audioLatencyHint}";</script>
		${mode === 'dev' ? `<script>window.picus_logLevel = "${logLevel}";</script>` : ''}
		<script>window.picus_staticBase = "${staticHash}";</script>
		${
			editorName
				? `<script>window.picus_editorName = "${editorName}";</script>`
				: '<script>window.picus_editorName = null;</script>'
		}
		<script>window.picus_projectName = ${JSON.stringify(projectName)};</script>
		<script>window.picus_publicPath = ${JSON.stringify(publicPath)};</script>
		<script>window.picus_audioEnabled = true;</script>
		<script>window.picus_videoEnabled = true;</script>
		<script>window.picus_renderDefaults = ${JSON.stringify(
			renderDefaults,
		)};</script>
		<script>window.picus_cwd = ${JSON.stringify(picusRoot)};</script>
		<script>window.picus_studioServerCommand = ${
			studioServerCommand ? JSON.stringify(studioServerCommand) : 'null'
		};</script>
		${
			inputProps
				? `<script>window.picus_inputProps = ${JSON.stringify(
						JSON.stringify(inputProps),
					)};</script>`
				: ''
		}
		${
			renderQueue
				? `<script>window.picus_initialRenderQueue = ${JSON.stringify(
						renderQueue,
					)};</script>`
				: ''
		}
		${
			completedClientRenders
				? `<script>window.picus_initialClientRenders = ${JSON.stringify(
						completedClientRenders,
					)};</script>`
				: ''
		}
		${
			envVariables
				? `<script>window.process = {env: ${JSON.stringify(
						envVariables,
					)}};</script>`
				: ''
		}
		${
			gitSource
				? `<script>window.picus_gitSource = ${JSON.stringify(
						gitSource,
					)};</script>`
				: ''
		}
		${
			mode === 'dev'
				? `
		<script>window.picus_isStudio = true;</script>
		<script>window.picus_isReadOnlyStudio = false;</script>`.trimStart()
				: ''
		}
		<script>window.picus_staticFiles = ${JSON.stringify(publicFiles)}</script>
		<script>window.picus_installedPackages = ${JSON.stringify(installedDependencies)}</script>
		<script>window.picus_packageManager = ${JSON.stringify(packageManager)}</script>
		<script>window.picus_publicFolderExists = ${
			publicFolderExists ? `"${publicFolderExists}"` : 'null'
		};</script>
		<script>
				window.siteVersion = '11';
				window.picus_version = '${VERSION}';
		</script>
		
		<div id="video-container"></div>
		<div id="${Internals.PICUS_STUDIO_CONTAINER_ELEMENT}"></div>
		<div id="menuportal-0"></div>
		<div id="menuportal-1"></div>
		<div id="menuportal-2"></div>
		<div id="menuportal-3"></div>
		<div id="menuportal-4"></div>
		<div id="menuportal-5"></div>
		<div id="picus-error-overlay"></div>
		<div id="server-disconnected-overlay"></div>
		<script src="${publicPath}bundle.js"></script>
	</body>
</html>
`.trim();
