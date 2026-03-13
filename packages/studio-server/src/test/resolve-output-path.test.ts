import {expect, test} from 'bun:test';
import path from 'node:path';
import {resolveOutputPath} from '../helpers/resolve-output-path';

const picusRoot = '/home/user/my-project';

test('Should resolve path within out/ directory', () => {
	const result = resolveOutputPath(picusRoot, 'out/HelloWorld.mp4');
	expect(result).toBe(path.join(picusRoot, 'out/HelloWorld.mp4'));
});

test('Should resolve path with custom directory', () => {
	const result = resolveOutputPath(picusRoot, 'renders/my-video.mp4');
	expect(result).toBe(path.join(picusRoot, 'renders/my-video.mp4'));
});

test('Should resolve path without directory prefix', () => {
	const result = resolveOutputPath(picusRoot, 'video.mp4');
	expect(result).toBe(path.join(picusRoot, 'video.mp4'));
});

test('Should resolve nested directory paths', () => {
	const result = resolveOutputPath(picusRoot, 'out/nested/deep/video.mp4');
	expect(result).toBe(path.join(picusRoot, 'out/nested/deep/video.mp4'));
});

test('Should reject paths that escape the project root', () => {
	expect(() => resolveOutputPath(picusRoot, '../outside.mp4')).toThrow(
		/Not allowed to write/,
	);
});

test('Should reject paths with complex traversal', () => {
	expect(() =>
		resolveOutputPath(picusRoot, 'out/../../outside.mp4'),
	).toThrow(/Not allowed to write/);
});

test('Should allow compositionDefaultOutName-style paths inside out/', () => {
	const result = resolveOutputPath(picusRoot, 'out/custom-comp-name.mp4');
	expect(result).toBe(path.join(picusRoot, 'out/custom-comp-name.mp4'));
});
