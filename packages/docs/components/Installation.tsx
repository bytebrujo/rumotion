// @ts-expect-error
import CodeBlock from '@theme/CodeBlock';
// @ts-expect-error
import TabItem from '@theme/TabItem';
// @ts-expect-error
import Tabs from '@theme/Tabs';
import React from 'react';
import {VERSION} from 'picus';

const VersionWarning: React.FC<{
	readonly packages: string;
}> = ({packages}) => {
	if (!packages.includes('picus')) {
		return null;
	}

	return (
		<>
			This assumes you are currently using v{VERSION} of Picus.
			<br />
			Also update <code>picus</code> and all <code>`@picus/*`</code>{' '}
			packages to the same version.
			<br />
			Remove all <code>^</code> character in front of the version numbers of it
			as it can lead to a version conflict.
		</>
	);
};

const LightAndDark: React.FC<{
	readonly text: string;
}> = ({text}) => {
	return (
		<CodeBlock
			className="shiki github-dark"
			language="bash"
			style={{
				backgroundColor: 'rgb(13, 17, 23)',
				color: 'rgb(201, 209, 217)',
			}}
		>
			<div className="code-container">
				<div className="line">{text}</div>
			</div>
		</CodeBlock>
	);
};

export const Installation: React.FC<{
	readonly pkg: string;
}> = ({pkg}) => {
	if (pkg === undefined) {
		throw new Error('pkg is undefined');
	}

	const pkgList = pkg.split(' ');

	const allPicusOnly = pkgList.every(
		(p) => p.startsWith('@picus/') || p === 'picus',
	);
	const showPicusCli =
		allPicusOnly &&
		!pkgList.includes('picus') &&
		!pkgList.includes('@picus/cli');

	const packages = pkgList
		.map((p) => {
			if (p.startsWith('@picus') || p === 'picus') {
				return `${p}@${VERSION}`;
			}

			return p;
		})
		.join(' ');

	const picusCliPackages = pkgList.join(' ');

	const tabs = [
		...(showPicusCli
			? [{label: 'Picus CLI', value: 'picus-cli'}]
			: []),
		{label: 'npm', value: 'npm'},
		{label: 'bun', value: 'bun'},
		{label: 'pnpm', value: 'pnpm'},
		{label: 'yarn', value: 'yarn'},
	];

	return (
		<div>
			<Tabs
				defaultValue={showPicusCli ? 'picus-cli' : 'npm'}
				values={tabs}
			>
				{showPicusCli ? (
					<TabItem value="picus-cli">
						<LightAndDark text={`npx picus add ${picusCliPackages}`} />
					</TabItem>
				) : null}
				<TabItem value="npm">
					<LightAndDark text={`npm i --save-exact ${packages}`} />
					<VersionWarning packages={packages} />
				</TabItem>
				<TabItem value="pnpm">
					<LightAndDark text={`pnpm i ${packages}`} />
					<VersionWarning packages={packages} />
				</TabItem>
				<TabItem value="bun">
					<LightAndDark text={`bun i ${packages}`} />
					<VersionWarning packages={packages} />
				</TabItem>
				<TabItem value="yarn">
					<LightAndDark text={`yarn --exact add ${packages}`} />
					<VersionWarning packages={packages} />
				</TabItem>
			</Tabs>
		</div>
	);
};
