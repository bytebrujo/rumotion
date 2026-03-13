import { enableTailwind } from "@picus/tailwind-v4";

/**
 *  @param {import('webpack').Configuration} currentConfig
 */
export const webpackOverride = (currentConfig) => {
  return enableTailwind(currentConfig);
};
