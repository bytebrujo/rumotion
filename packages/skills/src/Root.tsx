import {Composition} from 'picus';
import {MyAnimation as BarChartAnimation} from '../skills/picus/rules/assets/charts-bar-chart';
import {MyAnimation as TypewriterAnimation} from '../skills/picus/rules/assets/text-animations-typewriter';
import {MyAnimation as WordHighlightAnimation} from '../skills/picus/rules/assets/text-animations-word-highlight';

export const PicusRoot = () => {
	return (
		<>
			<Composition
				id="BarChart"
				component={BarChartAnimation}
				durationInFrames={120}
				fps={30}
				width={1280}
				height={720}
			/>
			<Composition
				id="Typewriter"
				component={TypewriterAnimation}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					fullText: 'From prompt to motion graphics. This is Picus.',
					pauseAfter: 'From prompt to motion graphics.',
				}}
			/>
			<Composition
				id="WordHighlight"
				component={WordHighlightAnimation}
				durationInFrames={90}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
