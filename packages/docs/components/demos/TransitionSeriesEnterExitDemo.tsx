import {linearTiming, TransitionSeries} from '@picus/transitions';
import {fade} from '@picus/transitions/fade';
import {slide} from '@picus/transitions/slide';
import {wipe} from '@picus/transitions/wipe';
import React from 'react';
import {AbsoluteFill} from 'picus';

const Scene: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#0b84f3',
				fontFamily: 'sans-serif',
				fontWeight: 900,
				color: 'white',
				fontSize: 100,
			}}
		>
			A
		</AbsoluteFill>
	);
};

const presentations = {
	fade: () => fade(),
	slide: () => slide(),
	wipe: () => wipe(),
};

export const TransitionSeriesEnterExitDemoComp: React.FC<{
	readonly presentation: string;
}> = ({presentation}) => {
	const getPresentation =
		presentations[presentation as keyof typeof presentations] ??
		presentations.slide;

	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={40}>
				<Scene />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={linearTiming({durationInFrames: 20})}
				presentation={getPresentation()}
			/>
		</TransitionSeries>
	);
};
