export const isInCloudTask = (): boolean => {
	if (process.env.PICUS_GCP_PROJECT_ID) return false;
	if (process.env.K_CONFIGURATION && process.env.GCLOUD_PROJECT) {
		return true;
	}

	return false;
};

export const getProjectId = (): string | undefined => {
	return isInCloudTask()
		? process.env.GCLOUD_PROJECT
		: process.env.PICUS_GCP_PROJECT_ID;
};
