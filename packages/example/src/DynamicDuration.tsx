import React from 'react';
import {AbsoluteFill} from 'picus';
import {z} from 'zod';

export const dynamicDurationSchema = z.object({
	duration: z.number().min(1).max(1000).default(100),
});

export const DynamicDuration: React.FC<
	z.infer<typeof dynamicDurationSchema>
> = () => {
	return (
		<AbsoluteFill>
			<svg>
				<path style={{scale: 2}}>hi</path>
			</svg>
		</AbsoluteFill>
	);
};
