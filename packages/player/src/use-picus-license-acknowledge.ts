import {Internals, type LogLevel} from 'picus';

let warningShown = false;

export const acknowledgePicusLicenseMessage = (
	acknowledge: boolean,
	logLevel: LogLevel,
) => {
	if (acknowledge) {
		return;
	}

	if (warningShown) {
		return;
	}

	warningShown = true;
	Internals.Log.warn(
		{logLevel, tag: null},
		'Note: Some companies are required to obtain a license to use Picus. See: https://picus.dev/license\nPass the `acknowledgePicusLicense` prop to `<Player />` function to make this message disappear.',
	);
};
