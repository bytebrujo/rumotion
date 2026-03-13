import {execSync} from 'child_process';

const where = process.platform === 'win32' ? 'where' : 'which';

const hasPython = () => {
	try {
		execSync(`${where} python`);
		return true;
	} catch (err) {
		return false;
	}
};

if (!hasPython()) {
	console.log('Environment has no Python. Skipping...');
	process.exit(0);
}

const commands = [
	'python -m venv picus-env-lint',
	'. ./picus-env-lint/bin/activate',
	"pip install boto3 pylint mypy 'boto3-stubs[essential]'",
	'pylint ./picus_lambda',
	'mypy ./picus_lambda',
	'deactivate',
	'rm -rf picus-env-lint',
];

execSync(commands.join(' && '), {
	stdio: 'inherit',
});

console.log('Linted python lint!');
