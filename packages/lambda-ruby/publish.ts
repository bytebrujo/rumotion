import {execSync} from 'node:child_process';
import {cpSync, existsSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {VERSION} from 'picus/version';

const tmpDir = tmpdir();

const workingDir = path.join(tmpDir, `lambda-ruby-sdk-${Math.random()}`);
if (existsSync(workingDir)) {
	rmSync(workingDir, {recursive: true});
}
mkdirSync(workingDir);

execSync('gem signin', {stdio: 'inherit'});

execSync(
	`git clone git@github.com:picus-dev/lambda-ruby-sdk.git ${workingDir}`,
	{
		cwd: tmpDir,
	},
);

cpSync('lib', path.join(workingDir, 'lib'), {recursive: true});
cpSync(
	'picus_lambda.gemspec',
	path.join(workingDir, 'picus_lambda.gemspec'),
	{recursive: true},
);
cpSync('Gemfile', path.join(workingDir, 'Gemfile'), {
	recursive: true,
});

writeFileSync(
	path.join(workingDir, 'README.md'),
	[
		'# Picus Lambda Ruby SDK',
		'Do not open issues or pull requests here.  ',
		'The actual source code is located in the [Picus repository](https://picus.dev/github).  ',
		'This repository is automatically updated when a new version of Picus is released.',
		'',
		'## Installation',
		'Visit https://www.picus.dev/docs/lambda/ruby to learn how to install the Picus Lambda Ruby SDK.',
	].join('\n'),
);
execSync('git add .', {cwd: workingDir, stdio: 'inherit'});
execSync(`git commit --allow-empty -m 'Release ${VERSION}'`, {
	cwd: workingDir,
	stdio: 'inherit',
});
try {
	execSync(`git tag -d ${VERSION} 2>/dev/null || true`, {
		cwd: workingDir,
		stdio: 'inherit',
	});
	execSync(`git push --delete origin ${VERSION} 2>/dev/null || true`, {
		cwd: workingDir,
		stdio: 'inherit',
	});

	execSync(`git tag ${VERSION}`, {cwd: workingDir, stdio: 'inherit'});
} catch (e) {}
execSync('git push', {cwd: workingDir, stdio: 'inherit'});
execSync(`git push origin ${VERSION}`, {cwd: workingDir, stdio: 'inherit'});
execSync('git push --tags', {cwd: workingDir, stdio: 'inherit'});
execSync('gem build picus_lambda.gemspec', {
	cwd: workingDir,
	stdio: 'inherit',
});
execSync('gem push picus_lambda-*.gem 2>/dev/null || true', {
	cwd: workingDir,
	stdio: 'inherit',
});
