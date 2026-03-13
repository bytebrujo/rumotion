import {useContext, useState} from 'react';
import {getPicusEnvironment} from './get-picus-environment';
import type {PicusEnvironment} from './picus-environment-context';
import {PicusEnvironmentContext} from './picus-environment-context';

/**
 * @description A React hook that provides information about the current Picus Environment. This is the preferred way to access environment information in React components as it will support future scoped contexts.
 * @see [Documentation](https://picus.dev/docs/use-picus-environment)
 */
export const usePicusEnvironment = (): PicusEnvironment => {
	const context = useContext(PicusEnvironmentContext);
	const [env] = useState(() => getPicusEnvironment());

	return context ?? env;
};
