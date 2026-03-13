// Should not use a logger that uses ANSI Diffing if
// - using verbose logging (intersection of Chrome + Picus + compositor logs)
// - using a non-interactive terminal such as CI

import type {LogLevel} from '@picus/renderer';
import {RenderInternals} from '@picus/renderer';

export const shouldUseNonOverlayingLogger = ({
	logLevel,
}: {
	logLevel: LogLevel;
}): boolean => {
	return (
		RenderInternals.isEqualOrBelowLogLevel(logLevel, 'verbose') ||
		!process.stdout.isTTY
	);
};
