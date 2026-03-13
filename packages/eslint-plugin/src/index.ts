import deterministicRandomness from './rules/deterministic-randomness';
import evenDimensions from './rules/even-dimensions';
import noBackgroundImage from './rules/no-background-image';
import durationInFrames from './rules/no-duration-frames-infinity';
import noFrom0 from './rules/no-from-0';
import noStringAssets from './rules/no-string-assets';
import nonPureAnimation from './rules/non-pure-animation';
import slowCssProperty from './rules/slow-css-property';
import staticFileNoRelative from './rules/staticfile-no-relative';
import staticFileNoRemote from './rules/staticfile-no-remote';
import useGifComponent from './rules/use-gif-component';
import v4Import from './rules/v4-import';
import volumeCallback from './rules/volume-callback';
import warnNativeMediaTag from './rules/warn-native-media-tag';

const rules = {
	'warn-native-media-tag': warnNativeMediaTag,
	'deterministic-randomness': deterministicRandomness,
	'no-string-assets': noStringAssets,
	'even-dimensions': evenDimensions,
	'duration-in-frames': durationInFrames,
	'from-0': noFrom0,
	'volume-callback': volumeCallback,
	'use-gif-component': useGifComponent,
	'staticfile-no-relative': staticFileNoRelative,
	'staticfile-no-remote': staticFileNoRemote,
	'no-background-image': noBackgroundImage,
	'non-pure-animation': nonPureAnimation,
	'slow-css-property': slowCssProperty,
	'v4-config-import': v4Import,
};

const recommendedRuleConfig = {
	'@picus/warn-native-media-tag': 'error',
	'@picus/deterministic-randomness': 'error',
	'@picus/no-string-assets': 'error',
	'@picus/even-dimensions': 'error',
	'@picus/duration-in-frames': 'error',
	'@picus/from-0': 'error',
	'@picus/volume-callback': 'error',
	'@picus/use-gif-component': 'error',
	'@picus/staticfile-no-relative': 'error',
	'@picus/staticfile-no-remote': 'error',
	'@picus/no-background-image': 'error',
	'@picus/non-pure-animation': 'warn',
	'@picus/v4-config-import': 'error',
} as const;

const configs = {
	recommended: {
		rules: recommendedRuleConfig,
		plugins: ['@picus'],
	},
} as const;

const flatPlugin = {
	rules: recommendedRuleConfig,
	plugins: {
		'@picus': {
			rules: rules,
		},
	},
};

export = {
	configs,
	rules,
	flatPlugin,
};
