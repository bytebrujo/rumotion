const assert = require('assert');
const {interpolate} = require('picus');
const {Player} = require('@picus/player');
const {VERSION} = require('picus/version');
const {enableSkia} = require('@picus/skia/enable');
const {Gif} = require('@picus/gif');
const {CameraMotionBlur} = require('@picus/motion-blur');
const {ThreeCanvas} = require('@picus/three');

const val = interpolate(1, [0, 1], [0, 100]);

assert(val === 100);
assert(Boolean(Player));
assert(typeof VERSION === 'string');
assert(Boolean(enableSkia));
assert(Boolean(Gif));
assert(Boolean(CameraMotionBlur));
assert(Boolean(ThreeCanvas));

console.log('ESM Wallaby works!');
