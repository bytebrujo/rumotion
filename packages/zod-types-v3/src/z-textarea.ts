import {ZodZypesInternals} from '@picus/zod-types';
import {z} from 'zod';

const {PICUS_TEXTAREA_BRAND} = ZodZypesInternals;

export const zTextarea = () => z.string().describe(PICUS_TEXTAREA_BRAND);
