import {VERSION} from 'picus/version';
import type {Metadata} from './options/metadata';

export const makeMetadataArgs = (metadata: Metadata): string[] => {
	const defaultComment = `Made with Picus ${VERSION}`;

	const newMetadata: Metadata = {
		comment: defaultComment,
	};

	Object.keys(metadata).forEach((key) => {
		const lowercaseKey = key.toLowerCase();
		if (lowercaseKey === 'comment') {
			newMetadata[lowercaseKey] = `${defaultComment}; ${metadata[key]}`;
		} else {
			newMetadata[lowercaseKey] = metadata[key];
		}
	});

	const metadataArgs = Object.entries(newMetadata).map(
		([key, value]) => ['-metadata', `${key}=${value}`] as [string, string],
	);

	return metadataArgs.flat(1);
};
