import type {Sandbox} from '@vercel/sandbox';
import {VERSION} from 'picus/version';

export async function installJsDependencies({
	sandbox,
}: {
	sandbox: Sandbox;
}): Promise<void> {
	const installCmd = await sandbox.runCommand({
		cmd: 'pnpm',
		args: [
			'i',
			`@picus/renderer@${VERSION}`,
			`@picus/compositor-linux-x64-gnu@${VERSION}`,
			`@vercel/blob`,
		],
		detached: true,
	});

	for await (const _log of installCmd.logs()) {
		// consume logs
	}

	const installResult = await installCmd.wait();
	if (installResult.exitCode !== 0) {
		throw new Error(`pnpm install failed: ${await installResult.stderr()}`);
	}
}
