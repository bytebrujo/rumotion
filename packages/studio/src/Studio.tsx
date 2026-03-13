import React, {useLayoutEffect} from 'react';
import {createPortal} from 'react-dom';
import {Internals} from 'picus';
import {Editor} from './components/Editor';
import {EditorContexts} from './components/EditorContexts';
import {ServerDisconnected} from './components/Notifications/ServerDisconnected';
import {StaticFilesProvider} from './components/use-static-files';
import {FastRefreshProvider} from './FastRefreshProvider';
import {injectCSS} from './helpers/inject-css';
import {ResolveCompositionConfigInStudio} from './ResolveCompositionConfigInStudio';

const getServerDisconnectedDomElement = () => {
	return document.getElementById('server-disconnected-overlay');
};

const StudioInner: React.FC<{
	readonly rootComponent: React.FC;
	readonly readOnly: boolean;
	readonly visualModeEnabled: boolean;
}> = ({rootComponent, readOnly, visualModeEnabled}) => {
	return (
		<Internals.CompositionManagerProvider
			onlyRenderComposition={null}
			currentCompositionMetadata={null}
			initialCompositions={[]}
			initialCanvasContent={null}
		>
			<Internals.PicusRootContexts
				visualModeEnabled={visualModeEnabled}
				frameState={null}
				audioEnabled={window.picus_audioEnabled}
				videoEnabled={window.picus_videoEnabled}
				logLevel={window.picus_logLevel}
				numberOfAudioTags={window.picus_numberOfAudioTags}
				audioLatencyHint={window.picus_audioLatencyHint ?? 'interactive'}
			>
				<StaticFilesProvider>
					<ResolveCompositionConfigInStudio>
						<EditorContexts readOnlyStudio={readOnly}>
							<Editor readOnlyStudio={readOnly} Root={rootComponent} />
							{readOnly
								? null
								: createPortal(
										<ServerDisconnected />,
										getServerDisconnectedDomElement() as HTMLElement,
									)}
						</EditorContexts>
					</ResolveCompositionConfigInStudio>
				</StaticFilesProvider>
			</Internals.PicusRootContexts>
		</Internals.CompositionManagerProvider>
	);
};

export const Studio: React.FC<{
	readonly rootComponent: React.FC;
	readonly readOnly: boolean;
	readonly visualModeEnabled: boolean;
}> = ({rootComponent, readOnly, visualModeEnabled}) => {
	useLayoutEffect(() => {
		injectCSS();
	}, []);

	return (
		<FastRefreshProvider>
			<StudioInner
				rootComponent={rootComponent}
				readOnly={readOnly}
				visualModeEnabled={visualModeEnabled}
			/>
		</FastRefreshProvider>
	);
};
