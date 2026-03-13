import type {DownloadBehavior} from 'picus';

export type EmittedArtifact = {
	filename: string;
	content: string | Uint8Array;
	frame: number;
	downloadBehavior: DownloadBehavior | null;
};
