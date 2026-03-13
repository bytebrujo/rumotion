import React from 'react';

export type PicusEnvironment = {
	isStudio: boolean;
	isRendering: boolean;
	isClientSideRendering: boolean;
	isPlayer: boolean;
	isReadOnlyStudio: boolean;
};

export const PicusEnvironmentContext =
	React.createContext<PicusEnvironment | null>(null);
