import type {MediaParserLogLevel} from './log';
import {Log} from './log';

let warningShown = false;

export const warnIfPicusLicenseNotAcknowledged = ({
	acknowledgePicusLicense,
	logLevel,
	apiName,
}: {
	acknowledgePicusLicense: boolean;
	logLevel: MediaParserLogLevel;
	apiName: string;
}) => {
	if (acknowledgePicusLicense) {
		return;
	}

	if (warningShown) {
		return;
	}

	warningShown = true;
	Log.warn(
		logLevel,
		`Note: Some companies are required to obtain a license to use @picus/media-parser. See: https://picus.dev/license\nPass \`acknowledgePicusLicense: true\` to \`${apiName}\` function to make this message disappear.`,
	);
};
