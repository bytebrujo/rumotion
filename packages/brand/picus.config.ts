/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://picus.dev/docs/config
 */

import {Config} from '@picus/cli/config';
import {enableTailwind} from '@picus/tailwind-v4';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);
