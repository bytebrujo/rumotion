import type {NoReactInternals} from 'picus/no-react';

export type RequiredInputPropsInV5 =
	typeof NoReactInternals.ENABLE_V5_BREAKING_CHANGES extends true
		? {
				inputProps: Record<string, unknown>;
			}
		: {
				inputProps?: Record<string, unknown>;
			};
