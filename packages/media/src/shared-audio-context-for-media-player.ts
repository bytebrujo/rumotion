import type {ScheduleAudioNodeOptions, ScheduleAudioNodeResult} from 'picus';

export type SharedAudioContextForMediaPlayer = {
	audioContext: AudioContext;
	audioSyncAnchor: {value: number};
	scheduleAudioNode: (
		options: ScheduleAudioNodeOptions,
	) => ScheduleAudioNodeResult;
};
