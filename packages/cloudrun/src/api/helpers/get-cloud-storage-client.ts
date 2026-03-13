import {Storage} from '@google-cloud/storage';
import {
	getProjectId,
	isInCloudTask,
} from '../../functions/helpers/is-in-cloud-task';

export const getCloudStorageClient = () => {
	if (isInCloudTask()) {
		return new Storage({
			projectId: getProjectId(),
		});
	}

	return new Storage({
		projectId: process.env.PICUS_GCP_PROJECT_ID,
		credentials: {
			client_email: process.env.PICUS_GCP_CLIENT_EMAIL,
			private_key: process.env.PICUS_GCP_PRIVATE_KEY,
		},
	});
};
