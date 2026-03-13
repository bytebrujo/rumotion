// See all configuration options: https://picus.dev/docs/config
// Each option also is available as a CLI flag: https://picus.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@picus/cli/config";
import { enableTailwind } from "@picus/tailwind-v4";

Config.setVideoImageFormat("jpeg");
Config.overrideWebpackConfig(enableTailwind);
