import {RenderInternals} from '@picus/renderer';
import type {AggregateRenderProgress} from '@picus/studio-shared';
import type {LogLevel} from 'picus';

export const addLogToAggregateProgress = ({
	logs,
	logLogLevel,
	logLevel,
	previewString,
	tag,
}: {
	logs: AggregateRenderProgress['logs'];
	logLogLevel: LogLevel;
	logLevel: LogLevel;
	previewString: string;
	tag: string | null;
}) => {
	if (RenderInternals.isEqualOrBelowLogLevel(logLevel, logLogLevel)) {
		logs.push({logLevel: logLogLevel, previewString, tag});
		if (logs.length > 3) {
			logs.shift();
		}
	}
};
