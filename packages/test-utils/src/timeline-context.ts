import type {TimelineContextValue} from 'picus';
import {ID} from './id.js';

export const makeTimelineContext = (frame: number): TimelineContextValue => {
	return {
		rootId: '',
		frame: {
			[ID]: frame,
		},
		playing: false,
		imperativePlaying: {
			current: false,
		},
		playbackRate: 1,
		setPlaybackRate: () => {
			throw new Error('playback rate');
		},
		audioAndVideoTags: {current: []},
	};
};
