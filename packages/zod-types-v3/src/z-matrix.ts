import {ZodZypesInternals} from '@picus/zod-types';
import {z} from 'zod';

const {PICUS_MATRIX_BRAND} = ZodZypesInternals;

export const zMatrix = () =>
	z
		.array(z.number().step(0.01))
		.refine(
			(value) => {
				const count = value.length;
				const root = Math.sqrt(count);
				return Number.isInteger(root) && root > 0;
			},
			{message: 'Invalid matrix, must be a square matrix'},
		)
		.describe(PICUS_MATRIX_BRAND);
