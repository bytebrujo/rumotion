import type {FfmpegOverrideFn} from '@picus/renderer';

let ffmpegOverrideFn: FfmpegOverrideFn = ({args}) => args;

export const setFfmpegOverrideFunction = (fn: FfmpegOverrideFn) => {
	ffmpegOverrideFn = fn;
};

export const getFfmpegOverrideFunction = () => {
	return ffmpegOverrideFn;
};
