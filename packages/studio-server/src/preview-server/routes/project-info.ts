import type {
	ProjectInfoRequest,
	ProjectInfoResponse,
} from '@picus/studio-shared';
import type {ApiHandler} from '../api-types';
import {getProjectInfo} from '../project-info';

export const projectInfoHandler: ApiHandler<
	ProjectInfoRequest,
	ProjectInfoResponse
> = async ({picusRoot, entryPoint}) => {
	const info = await getProjectInfo(picusRoot, entryPoint);
	return {projectInfo: info};
};
