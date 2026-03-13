import {z} from 'zod';

export const PICUS_TEXTAREA_BRAND = '__picus-textarea';

export const zTextarea = () => z.string().describe(PICUS_TEXTAREA_BRAND);
