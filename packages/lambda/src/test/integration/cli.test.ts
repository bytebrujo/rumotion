import {afterEach, beforeEach, expect, test} from 'bun:test';
// eslint-disable-next-line no-restricted-imports
import {CliInternals} from '@picus/cli';
import {LambdaClientInternals} from '@picus/lambda-client';
import {
	DEFAULT_EPHEMERAL_STORAGE_IN_MB,
	DEFAULT_MEMORY_SIZE,
	DEFAULT_TIMEOUT,
} from '@picus/lambda-client/constants';
import {LambdaInternals} from '../../internals';
import {mockFullClientSpecifics} from '../mock-implementation';
import {mockImplementation} from '../mocks/mock-implementation';
import {doAfter, doBefore, getProcessWriteOutput} from './console-hooks';

const picusRoot = process.cwd();

beforeEach(() => {
	doBefore();
});

afterEach(() => {
	doAfter();
});

test('Deploy function', async () => {
	await LambdaInternals.executeCommand(
		['functions', 'deploy'],
		picusRoot,
		'verbose',
		mockImplementation,
		mockFullClientSpecifics,
	);
	expect(getProcessWriteOutput()).toContain(
		`Deployed as picus-render-${LambdaClientInternals.LAMBDA_VERSION_STRING}-mem${DEFAULT_MEMORY_SIZE}mb-disk${DEFAULT_EPHEMERAL_STORAGE_IN_MB}mb-${DEFAULT_TIMEOUT}sec\n`,
	);
});

test('Deploy function and list it', async () => {
	await LambdaInternals.executeCommand(
		['functions', 'deploy'],
		picusRoot,
		'info',
		mockImplementation,
		mockFullClientSpecifics,
	);
	await LambdaInternals.executeCommand(
		['functions', 'ls'],
		picusRoot,
		'info',
		mockImplementation,
		mockFullClientSpecifics,
	);
	expect(getProcessWriteOutput()).toContain('Getting functions...');
	expect(getProcessWriteOutput()).toContain('Memory (MB)');
	expect(getProcessWriteOutput()).toMatch(/picus-render-(.*)\s+2048\s+120/g);
});

test('Deploy function and it already exists should fail', async () => {
	await LambdaInternals.executeCommand(
		['functions', 'deploy'],
		picusRoot,
		'info',
		mockImplementation,
		mockFullClientSpecifics,
	);
	await LambdaInternals.executeCommand(
		['functions', 'deploy'],
		picusRoot,
		'info',
		mockImplementation,
		mockFullClientSpecifics,
	);

	expect(getProcessWriteOutput()).toMatch(/Already exists as picus-render/);
});

test('If no functions are there and is quiet, should return "()"', async () => {
	CliInternals.parsedCli.q = true;
	await LambdaInternals.executeCommand(
		['functions', 'ls'],
		picusRoot,
		'info',
		mockImplementation,
		mockFullClientSpecifics,
	);
	expect(getProcessWriteOutput()).toBe('()');
});

test('Should handle functions rm called with no functions', async () => {
	await LambdaInternals.executeCommand(
		['functions', 'rm', '()'],
		picusRoot,
		'info',
		mockImplementation,
		mockFullClientSpecifics,
	);
	expect(getProcessWriteOutput()).toBe('No functions to remove.');
});
