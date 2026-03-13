import {GoogleAuth} from 'google-auth-library';
import {
	getProjectId,
	isInCloudTask,
} from '../../functions/helpers/is-in-cloud-task';

export const getAuthClientForUrl = async (url: string) => {
	let auth = new GoogleAuth();
	if (isInCloudTask()) {
		auth = new GoogleAuth({
			projectId: getProjectId(),
		});
	} else {
		auth = new GoogleAuth({
			projectId: process.env.PICUS_GCP_PROJECT_ID,
			credentials: {
				client_email: process.env.PICUS_GCP_CLIENT_EMAIL,
				private_key: process.env.PICUS_GCP_PRIVATE_KEY,
			},
		});
	}

	const client = await auth.getIdTokenClient(url);
	return client;
};
