import assert from 'assert';
import {Gif} from '@picus/gif';
import {Trail} from '@picus/motion-blur';
import {Player} from '@picus/player';
import {enableSkia} from '@picus/skia/enable';
import {ThreeCanvas} from '@picus/three';
import {TransitionSeries} from '@picus/transitions';
import {interpolate} from 'picus';
import {VERSION} from 'picus/version';

const val = interpolate(1, [0, 1], [0, 100]);

assert(val === 100);
assert(Boolean(Player));
assert(typeof VERSION === 'string');
assert(Boolean(enableSkia));
assert(Boolean(Gif));
assert(Boolean(ThreeCanvas));
assert(Boolean(Trail));
assert(Boolean(TransitionSeries));

console.log('ESM works!');
