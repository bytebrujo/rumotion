export type PicusAnimatedImageLoopBehavior =
	| 'loop'
	| 'pause-after-finish'
	| 'clear-after-finish';

export type PicusAnimatedImageProps = {
	src: string;
	width?: number;
	height?: number;
	onError?: (error: Error) => void;
	fit?: AnimatedImageFillMode;
	playbackRate?: number;
	style?: React.CSSProperties;
	loopBehavior?: PicusAnimatedImageLoopBehavior;
	id?: string;
	className?: string;
};

export type AnimatedImageFillMode = 'contain' | 'cover' | 'fill';
