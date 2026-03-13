import {ArtifactRegistryClient} from '@google-cloud/artifact-registry';
import {VERSION} from 'picus/version';

export const validateImagePicusVersion = async () => {
	const client = new ArtifactRegistryClient({
		projectId: process.env.PICUS_GCP_PROJECT_ID,
		credentials: {
			client_email: process.env.PICUS_GCP_CLIENT_EMAIL,
			private_key: process.env.PICUS_GCP_PRIVATE_KEY,
		},
	});
	const listedTags = await client.listTags({
		parent:
			'projects/picus-dev/locations/us/repositories/production/packages/render',
	});

	for (const tag of listedTags[0]) {
		if (VERSION === tag.name?.split('/').pop()) {
			// if match is found, exit the function
			return;
		}
	}

	throw new Error(
		`The tag for Picus version ${VERSION} was not found in the Cloud run registry.`,
	);
};
