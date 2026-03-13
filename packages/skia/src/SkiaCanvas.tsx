import type {CanvasProps} from '@shopify/react-native-skia';
import {Canvas} from '@shopify/react-native-skia';
import type {ReactNode} from 'react';
import React, {useMemo} from 'react';
import type {ViewProps} from 'react-native';
import {Internals} from 'picus';

type PicusCanvasProps = CanvasProps & {
	readonly children: ReactNode;
	readonly width: number;
	readonly height: number;
};

/**
 * @description A React Native Skia <Canvas /> component that wraps Picus contexts.
 * @see [Documentation](https://www.picus.dev/docs/skia/skia-canvas)
 */
export const SkiaCanvas = ({
	children,
	height,
	width,
	style,
	...otherProps
}: PicusCanvasProps) => {
	const contexts = Internals.usePicusContexts();

	const mergedStyles: React.CSSProperties = useMemo(() => {
		return {
			width,
			height,
			...((style as React.CSSProperties) ?? {}),
		};
	}, [height, style, width]);

	const props: Omit<CanvasProps, 'children'> = useMemo(() => {
		return {
			style: mergedStyles as ViewProps['style'],
			...otherProps,
		};
	}, [mergedStyles, otherProps]);

	return (
		<Canvas {...props}>
			<Internals.PicusContextProvider contexts={contexts}>
				{children}
			</Internals.PicusContextProvider>
		</Canvas>
	);
};
