import type {
	CloudProvider,
	ProviderSpecifics,
	SerializedInputProps,
} from '@picus/serverless-client';
import {inputPropsKey, resolvedPropsKey} from '@picus/serverless-client';

export const cleanupSerializedInputProps = async <
	Provider extends CloudProvider,
>({
	serialized,
	region,
	providerSpecifics,
	forcePathStyle,
}: {
	serialized: SerializedInputProps;
	region: Provider['region'];
	providerSpecifics: ProviderSpecifics<Provider>;
	forcePathStyle: boolean;
}): Promise<number> => {
	if (serialized.type === 'payload') {
		return 0;
	}

	const time = Date.now();
	await providerSpecifics.deleteFile({
		bucketName: serialized.bucketName,
		key: inputPropsKey(serialized.hash),
		region,
		customCredentials: null,
		forcePathStyle,
		requestHandler: null,
	});

	return Date.now() - time;
};

export const cleanupSerializedResolvedProps = async <
	Provider extends CloudProvider,
>({
	serialized,
	region,
	providerSpecifics,
	forcePathStyle,
}: {
	serialized: SerializedInputProps;
	region: Provider['region'];
	providerSpecifics: ProviderSpecifics<Provider>;
	forcePathStyle: boolean;
}): Promise<number> => {
	if (serialized.type === 'payload') {
		return 0;
	}

	const time = Date.now();
	await providerSpecifics.deleteFile({
		bucketName: serialized.bucketName,
		key: resolvedPropsKey(serialized.hash),
		region,
		customCredentials: null,
		forcePathStyle,
		requestHandler: null,
	});

	return Date.now() - time;
};
