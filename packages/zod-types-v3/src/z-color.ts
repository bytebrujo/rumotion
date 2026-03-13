import {ZodZypesInternals} from '@picus/zod-types';
import {z} from 'zod';

const {parseColor, PICUS_COLOR_BRAND} = ZodZypesInternals;

export const zColor = () =>
	z
		.string()
		.refine(
			(value) => {
				try {
					parseColor(value);
					return true;
				} catch {
					return false;
				}
			},
			{message: 'Invalid color'},
		)
		.describe(PICUS_COLOR_BRAND);
