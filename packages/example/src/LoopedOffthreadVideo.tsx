import {mediaParserController, parseMedia} from '@picus/media-parser';
import React, {useEffect, useState} from 'react';
import {
	cancelRender,
	continueRender,
	delayRender,
	Html5Video,
	Loop,
	OffthreadVideo,
	PicusOffthreadVideoProps,
	usePicusEnvironment,
	useVideoConfig,
} from 'picus';

const LoopedOffthreadVideo: React.FC<PicusOffthreadVideoProps> = (props) => {
	const [duration, setDuration] = useState<number | null>(null);
	const [handle] = useState(() => delayRender());
	const {fps} = useVideoConfig();

	useEffect(() => {
		const controller = mediaParserController();

		parseMedia({
			src: props.src,
			acknowledgePicusLicense: true,
			controller,
			fields: {
				slowDurationInSeconds: true,
			},
		})
			.then(({slowDurationInSeconds}) => {
				setDuration(slowDurationInSeconds);
				continueRender(handle);
			})
			.catch((err) => {
				cancelRender(err);
			});

		return () => {
			continueRender(handle);
			controller.abort();
		};
	}, [handle, props.src]);

	if (duration === null) {
		return null;
	}

	return (
		<Loop durationInFrames={Math.floor(duration * fps)}>
			<OffthreadVideo {...props} />;
		</Loop>
	);
};

export const LoopableOffthreadVideo: React.FC<
	PicusOffthreadVideoProps & {
		loop?: boolean;
	}
> = ({loop, ...props}) => {
	const env = usePicusEnvironment();
	if (env.isRendering) {
		if (loop) {
			return <LoopedOffthreadVideo {...props} />;
		}

		return <OffthreadVideo {...props} />;
	}

	return <Html5Video loop={loop} {...props}></Html5Video>;
};
