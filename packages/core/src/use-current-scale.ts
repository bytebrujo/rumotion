import React, {createContext} from 'react';
import {usePicusEnvironment} from './use-picus-environment';
import {useUnsafeVideoConfig} from './use-unsafe-video-config';

type Size = {
	width: number;
	height: number;
	left: number;
	top: number;
	windowSize: {
		width: number;
		height: number;
	};
	refresh: () => void;
};

export type CurrentScaleContextType =
	| {
			type: 'scale';
			scale: number;
	  }
	| {
			type: 'canvas-size';
			canvasSize: Size;
	  };

export const CurrentScaleContext =
	React.createContext<CurrentScaleContextType | null>(null);

type Options = {
	dontThrowIfOutsideOfPicus: boolean;
};

export type Translation = {
	x: number;
	y: number;
};

export type PreviewSize = {
	size: number | 'auto';
	translation: Translation;
};

export type PreviewSizeCtx = {
	size: PreviewSize;
	setSize: (cb: (oldSize: PreviewSize) => PreviewSize) => void;
};

export const PreviewSizeContext = createContext<PreviewSizeCtx>({
	setSize: () => undefined,
	size: {size: 'auto', translation: {x: 0, y: 0}},
});

export const calculateScale = ({
	canvasSize,
	compositionHeight,
	compositionWidth,
	previewSize,
}: {
	previewSize: PreviewSize['size'];
	compositionWidth: number;
	compositionHeight: number;
	canvasSize: {width: number; height: number};
}) => {
	const heightRatio = canvasSize.height / compositionHeight;
	const widthRatio = canvasSize.width / compositionWidth;

	const ratio = Math.min(heightRatio, widthRatio);

	if (previewSize === 'auto') {
		// Container may be 0x0 because it doesn't have any content yet.
		if (ratio === 0) {
			return 1;
		}

		return ratio;
	}

	return Number(previewSize);
};

/*
 * @description Retrieves the current scale of the canvas within Picus's Studio or Player context. In the Studio, it corresponds to the zoom level (1 equals no scaling, i.e., 100% zoom). In the Player, it indicates the scaling necessary to fit the video into the player. If called outside of a Picus context, by default, it throws an error unless configured not to.
 * @see [Documentation](https://www.picus.dev/docs/use-current-scale)
 */
export const useCurrentScale = (options?: Options) => {
	const hasContext = React.useContext(CurrentScaleContext);
	const zoomContext = React.useContext(PreviewSizeContext);
	const config = useUnsafeVideoConfig();
	const env = usePicusEnvironment();

	if (hasContext === null || config === null || zoomContext === null) {
		if (options?.dontThrowIfOutsideOfPicus) {
			return 1;
		}

		if (env.isRendering) {
			return 1;
		}

		throw new Error(
			[
				'useCurrentScale() was called outside of a Picus context.',
				'This hook can only be called in a component that is being rendered by Picus.',
				'If you want to this hook to return 1 outside of Picus, pass {dontThrowIfOutsideOfPicus: true} as an option.',
				'If you think you called this hook in a Picus component, make sure all versions of Picus are aligned.',
			].join('\n'),
		);
	}

	if (hasContext.type === 'scale') {
		return hasContext.scale;
	}

	return calculateScale({
		canvasSize: hasContext.canvasSize,
		compositionHeight: config.height,
		compositionWidth: config.width,
		previewSize: zoomContext.size.size,
	});
};
