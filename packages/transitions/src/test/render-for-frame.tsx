import {
	makeMockCompositionManagerContext,
	makeTimelineContext,
} from '@picus/test-utils';
import {renderToString} from 'react-dom/server';
import {Internals} from 'picus';

export const renderForFrame = (frame: number, markup: React.ReactNode) => {
	return renderToString(
		<Internals.PicusEnvironmentContext
			value={{
				isRendering: false,
				isClientSideRendering: false,
				isPlayer: true,
				isStudio: true,
				isReadOnlyStudio: false,
			}}
		>
			<Internals.CanUsePicusHooksProvider>
				<Internals.CompositionManager.Provider
					value={makeMockCompositionManagerContext()}
				>
					<Internals.TimelineContext.Provider
						value={makeTimelineContext(frame)}
					>
						{markup}
					</Internals.TimelineContext.Provider>
				</Internals.CompositionManager.Provider>
			</Internals.CanUsePicusHooksProvider>
		</Internals.PicusEnvironmentContext>,
	);
};
