import {ESLintUtils} from '@typescript-eslint/utils';
import rule from '../rules/v4-import';

const ruleTester = new ESLintUtils.RuleTester({
	parser: '@typescript-eslint/parser',
});

ruleTester.run('v4-import', rule, {
	valid: [
		'import {interpolate} from "picus"',
		'import {Config} from "@picus/cli/config"',
	],
	invalid: [
		{
			code: 'import {Config} from "picus"',
			errors: [
				{
					messageId: 'ImportConfig',
				},
			],
		},
		{
			code: 'import {Config, interpolate} from "picus"',
			errors: [
				{
					messageId: 'ImportConfig',
				},
			],
		},
	],
});
