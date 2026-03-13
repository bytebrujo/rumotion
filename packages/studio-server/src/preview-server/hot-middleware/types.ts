import type {webpack} from '@picus/bundler';

export type WebpackStats = ReturnType<webpack.Stats['toJson']>;
