import {expect, test} from 'bun:test';
import path from 'node:path';
import {
	getGifRef,
	getGitConfig,
	getGitRemoteOrigin,
	getGitSource,
	normalizeGitRemoteUrl,
} from '../get-github-repository';

test('Get GitHub repo', () => {
	const gitConfig = getGitConfig(__dirname);
	const origin = getGitRemoteOrigin(gitConfig as string);
	expect(origin?.remote).toEqual('origin');
	expect(
		origin?.url === 'https://github.com/picus-dev/picus.git' ||
			origin?.url === 'https://github.com/picus-dev/picus',
	).toEqual(true);
});

test('Should normalize SSH URLs', () => {
	expect(
		normalizeGitRemoteUrl('git@github.com:JonnyBurger/website-scroller.git'),
	).toEqual({
		type: 'github',
		org: 'JonnyBurger',
		name: 'website-scroller',
	});
});

test('Should normalize HTTPS URLs', () => {
	expect(
		normalizeGitRemoteUrl('https://github.com/picus-dev/picus.git'),
	).toEqual({
		type: 'github',
		org: 'picus-dev',
		name: 'picus',
	});
});

test('Should normalize HTTPS URLs without .git', () => {
	expect(
		normalizeGitRemoteUrl('https://github.com/picus-dev/picus'),
	).toEqual({
		type: 'github',
		org: 'picus-dev',
		name: 'picus',
	});
});

test('Should get Gif Ref', () => {
	expect(typeof getGifRef('info') === 'string').toBe(true);
});

test('Should get Git Source', () => {
	const git = getGitSource({
		picusRoot: process.cwd(),
		disableGitSource: false,
		logLevel: 'info',
	});
	expect(git).not.toBeNull();
	expect(git?.relativeFromGitRoot).toBe(`packages${path.sep}cli`);
});

test('Should recognize VERCEL', () => {
	process.env.VERCEL_GIT_COMMIT_SHA = '123';
	process.env.VERCEL_GIT_PROVIDER = 'github';
	process.env.VERCEL_GIT_REPO_SLUG = 'picus';
	process.env.VERCEL_GIT_REPO_OWNER = 'picus-dev';

	const source = getGitSource({
		picusRoot: process.cwd(),
		disableGitSource: false,
		logLevel: 'info',
	});
	expect(source).not.toBeNull();
	expect(source?.name).toBe('picus');
	expect(source?.org).toBe('picus-dev');
	expect(source?.ref).toBe('123');
	expect(source?.type).toBe('github');
	expect(source?.relativeFromGitRoot).toBe(`packages${path.sep}cli`);

	delete process.env.VERCEL_GIT_COMMIT_SHA;
	delete process.env.VERCEL_GIT_PROVIDER;
	delete process.env.VERCEL_GIT_REPO_SLUG;
	delete process.env.VERCEL_GIT_REPO_OWNER;
});
