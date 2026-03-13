import type {WriterInterface} from '@picus/media-parser';
import {createContent} from './buffer-implementation/writer';

export const bufferWriter: WriterInterface = {
	createContent,
};
