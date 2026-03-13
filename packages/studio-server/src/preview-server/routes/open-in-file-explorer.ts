import type {OpenInFileExplorerRequest} from '@picus/studio-shared';
import {openDirectoryInFinder} from '../../open-directory-in-finder';
import type {ApiHandler} from '../api-types';

export const handleOpenInFileExplorer: ApiHandler<
	OpenInFileExplorerRequest,
	void
> = ({input: {directory}, picusRoot}) => {
	return openDirectoryInFinder(directory, picusRoot);
};
