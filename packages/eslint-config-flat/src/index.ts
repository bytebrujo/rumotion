import eslint from '@eslint/js';
import picusPlugin from '@picus/eslint-plugin';
import type {Linter} from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export const makeConfig = ({
	picusDir,
}: {
	picusDir: string | undefined;
}): Linter.Config[] =>
	tseslint.config(
		{
			ignores: [
				'**/build/**',
				'**/dist/**',
				'**/out/**',
				'eslint.config.mjs',
				'picus.config.ts',
				'picus.config.js',
			],
		},
		eslint.configs.recommended,
		tseslint.configs.eslintRecommended,
		tseslint.configs.recommended,
		{
			plugins: {
				react: reactPlugin,
				'react-hooks': hooksPlugin,
			},
			languageOptions: {
				...reactPlugin.configs.flat.recommended.languageOptions,
				parser: tseslint.parser,
				parserOptions: {
					projectService: false,
				},
			},
			rules: {
				// wrong types 🙈
				...(reactPlugin.configs.flat
					.rules as unknown as typeof reactPlugin.configs.flat.rules.rules),
				...hooksPlugin.configs.recommended.rules,
				// Turning off rules that are too strict or don't apply to Picus
				'no-console': 'off',
				'react/jsx-key': 'off',
				'react/jsx-no-target-blank': 'off',
				// In Root.tsx we encourage using fragment for just a single composition
				// since we intend to add more compositions later and you should then use a fragment.
				'react/jsx-no-useless-fragment': 'off',
				// This is generally okay because on every frame, there will be a full rerender anyway!
				'react/no-array-index-key': 'off',
			},
			settings: {
				react: {
					version: 'detect',
				},
			},
		},
		{
			plugins: {
				'@picus': picusPlugin,
			},
			rules: picusPlugin.configs.recommended.rules,
			...(picusDir ? {files: [picusDir]} : {}),
		},
	) as Linter.Config[];

export const config: Linter.Config[] = makeConfig({
	picusDir: undefined,
});
