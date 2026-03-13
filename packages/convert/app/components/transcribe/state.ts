import type {Caption} from '@picus/captions';
import type {DownloadWhisperModelProgress} from '@picus/whisper-web';

export type TranscriptionState =
	| {
			type: 'idle';
	  }
	| {
			type: 'initializing';
	  }
	| {
			type: 'downloading-model';
			progress: DownloadWhisperModelProgress;
	  }
	| {
			type: 'transcribing';
			result: Caption[];
			progress: number;
	  }
	| {type: 'done'; result: Caption[]}
	| {type: 'error'};
