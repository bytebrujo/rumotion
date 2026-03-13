import type {
	UpdateAvailableRequest,
	UpdateAvailableResponse,
} from '@picus/studio-shared';
import type {ApiHandler} from '../api-types';
import {isUpdateAvailableWithTimeout} from '../update-available';

export const handleUpdate: ApiHandler<
	UpdateAvailableRequest,
	UpdateAvailableResponse
> = async ({picusRoot, logLevel}) => {
	const data = await isUpdateAvailableWithTimeout(picusRoot, logLevel);

	return data;
};
