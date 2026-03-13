import {execSync} from 'node:child_process';
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readdirSync,
	rmSync,
	writeFileSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {VERSION} from 'picus/version';

const tmpDir = tmpdir();

const workingDir = path.join(tmpDir, `lambda_go_sdk_${Math.random()}`);
if (existsSync(workingDir)) {
	rmSync(workingDir, {recursive: true});
}
mkdirSync(workingDir);
console.log(tmpDir);

execSync(
	`git clone git@github.com:picus-dev/lambda_go_sdk.git ${workingDir}`,
	{
		cwd: tmpDir,
	},
);

const filesInWorkingDir = readdirSync(workingDir);
for (const file of filesInWorkingDir) {
	if (file !== '.git') {
		rmSync(path.join(workingDir, file), {recursive: true});
	}
}

const dir = readdirSync('.');
for (const file of dir) {
	if (file.endsWith('.go') && !file.endsWith('_test.go')) {
		copyFileSync(file, path.join(workingDir, file));
	}
}

copyFileSync('go.mod', path.join(workingDir, 'go.mod'));
copyFileSync('go.sum', path.join(workingDir, 'go.sum'));

writeFileSync(
	path.join(workingDir, 'README.md'),
	[
		'# Picus Lambda Go SDK',
		'This repository exists because the Go SDK must be in a separate repository.',
		'The actual source code is located in the [Picus repository](https://picus.dev/github).',
		'This repository is automatically updated when a new version of Picus is released.',
		'Do not open issues or pull requests here.',
		'',
		'## Installation',
		'Visit https://www.picus.dev/docs/lambda/go to learn how to install the Picus Lambda Go SDK.',
	].join('\n'),
);
execSync('git add .', {cwd: workingDir, stdio: 'inherit'});
execSync(`git commit --allow-empty -m 'Release ${VERSION}'`, {
	cwd: workingDir,
	stdio: 'inherit',
});
execSync(`git tag -d ${VERSION} 2>/dev/null || true`, {
	cwd: workingDir,
	stdio: 'inherit',
});
execSync(`git push --delete origin ${VERSION} 2>/dev/null || true`, {
	cwd: workingDir,
	stdio: 'inherit',
});
execSync(`git tag ${VERSION}`, {cwd: workingDir, stdio: 'inherit'});
execSync('git push', {cwd: workingDir, stdio: 'inherit'});
execSync(`git push origin ${VERSION}`, {cwd: workingDir, stdio: 'inherit'});
execSync('git push --tags', {cwd: workingDir, stdio: 'inherit'});
