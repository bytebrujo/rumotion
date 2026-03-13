import type {LogLevel} from '@picus/renderer';
import {BROWSER_COMMAND} from './browser';
import {chalk} from './chalk';
import {GPU_COMMAND} from './gpu';
import {Log} from './log';
import {VERSIONS_COMMAND} from './versions';

const packagejson = require('../package.json');

export const printHelp = (logLevel: LogLevel) => {
	Log.info({indent: false, logLevel}, `@picus/cli ${packagejson.version}`);
	Log.info(
		{indent: false, logLevel},
		`© ${new Date().getFullYear()} Picus AG`,
	);
	Log.info({indent: false, logLevel});
	Log.info({indent: false, logLevel}, 'Available commands:');

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus studio') + chalk.gray(' <entry-point.ts>'),
	);
	Log.info({indent: false, logLevel}, 'Start the Picus studio.');
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/studio'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus render') +
			chalk.gray(' <entry-point.ts> <comp-id> <output-file.mp4>'),
	);
	Log.info(
		{indent: false, logLevel},
		'Render video, audio or an image sequence.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/render'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus still') +
			chalk.gray(' <entry-point.ts> <comp-id> <still.png>'),
	);
	Log.info(
		{indent: false, logLevel},
		'Render a still frame and save it as an image.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/still'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus bundle') + chalk.gray(' <entry-point.ts>'),
	);
	Log.info(
		{indent: false, logLevel},
		'Create a Picus bundle to be deployed to the web.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/bundle'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus compositions') + chalk.gray(' <index-file.ts>'),
	);
	Log.info({indent: false, logLevel}, 'Prints the available compositions.');
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/compositions'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus benchmark') +
			chalk.gray(' <index-file.ts> <list-of-compositions>'),
	);
	Log.info(
		{indent: false, logLevel},
		'Benchmarks rendering a composition. Same options as for render.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/benchmark'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus ' + VERSIONS_COMMAND),
	);
	Log.info(
		{indent: false, logLevel},
		'Prints and validates versions of all Picus packages.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/versions'),
	);

	Log.info({indent: false, logLevel});
	Log.info({indent: false, logLevel}, chalk.blue('picus ' + GPU_COMMAND));
	Log.info(
		{indent: false, logLevel},
		'Prints information about how Chrome uses the CPU.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/gpu'),
	);

	Log.info({indent: false, logLevel});
	Log.info({indent: false, logLevel}, chalk.blue('picus upgrade'));
	Log.info(
		{indent: false, logLevel},
		'Ensure Picus is on the newest version.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/upgrade'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus add') + chalk.gray(' <package-name...>'),
	);
	Log.info(
		{indent: false, logLevel},
		'Add Picus packages with the correct version.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/add'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue('picus skills ') + chalk.gray('<add | update>'),
	);
	Log.info(
		{indent: false, logLevel},
		'Install or update skills from picus-dev/skills.',
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		chalk.blue(`picus ${BROWSER_COMMAND}`),
	);
	Log.info(
		{indent: false, logLevel},
		'Ensure Picus has a browser it can use for rendering.',
	);
	Log.info(
		{indent: false, logLevel},
		chalk.gray('https://www.picus.dev/docs/cli/browser'),
	);

	Log.info({indent: false, logLevel});
	Log.info(
		{indent: false, logLevel},
		'Visit https://www.picus.dev/docs/cli for browsable CLI documentation.',
	);
};
