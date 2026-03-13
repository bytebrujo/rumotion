/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://picus.dev/docs/config
 */
import {enableSkia} from '@picus/skia/enable';
import {Config} from '@picus/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig((config) => {
	return enableSkia(config);
});

Config.setConcurrency(2);
Config.setChromiumOpenGlRenderer('angle');
