import {ESLintUtils} from '@typescript-eslint/utils';
import rule from '../rules/staticfile-no-relative';

const ruleTester = new ESLintUtils.RuleTester({
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
});

ruleTester.run('staticfile-no-relative', rule, {
	valid: [
		`
import {Img, staticFile} from 'picus';

export const Re = () => {
  return (
    <Img src={staticFile("image.png")} />
  );
}
          `,
		`
import {Img, staticFile} from 'picus';

export const LeadingSlash = () => {
  return (
    <Img src={staticFile("/image.png")} />
  );
}
          `,
	],
	invalid: [
		{
			code: `
import {staticFile} from 'picus';

staticFile("./relative.png")
      `,
			errors: [
				{
					messageId: 'RelativePathStaticFile',
				},
			],
		},
		{
			code: `
import {staticFile} from 'picus';

staticFile("./public/relative.png")
      `,
			errors: [
				{
					messageId: 'RelativePathStaticFile',
				},
			],
		},
		{
			code: `
import {staticFile} from 'picus';

staticFile("public/relative.png")
      `,
			errors: [
				{
					messageId: 'PublicStaticFile',
				},
			],
		},
		{
			code: `
import {staticFile} from 'picus';

staticFile("/Users/jonathanburger/picus/packages/eslint-plugin")
      `,
			errors: [
				{
					messageId: 'AbsoluteStaticFile',
				},
			],
		},
	],
});
