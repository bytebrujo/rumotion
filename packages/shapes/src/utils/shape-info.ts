import type {Instruction} from '@picus/paths';

export type ShapeInfo = {
	path: string;
	width: number;
	height: number;
	transformOrigin: string;
	instructions: Instruction[];
};
