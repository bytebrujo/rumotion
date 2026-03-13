import {$} from 'bun';
import {bugs} from './api/[v]';

const buggyRelease: string[] = [];

for (const bug of bugs) {
	buggyRelease.push(...bug.versions);
}

const uniqueVersions = [...new Set(buggyRelease)];
console.log(uniqueVersions);

for (const version of uniqueVersions) {
	await $`npm deprecate picus@${version} "This version contains bugs: https://bugs.picus.dev/${version}"`;
	console.log(`Deprecated version ${version}`);
}
