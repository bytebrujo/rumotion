import {ESLintUtils} from '@typescript-eslint/utils';
import rule from '../rules/staticfile-no-remote';

const ruleTester = new ESLintUtils.RuleTester({
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
});

ruleTester.run('staticfile-no-remote', rule, {
	valid: [
		`
import {Img, staticFile} from 'picus';

export const Re = () => {
  return (
    <Img src={staticFile("image.png")} />
  );
}
          `,
	],
	invalid: [
		{
			code: `
import {staticFile} from 'picus';

staticFile("http://relative.png")
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

staticFile("https://relative.png")
      `,
			errors: [
				{
					messageId: 'RelativePathStaticFile',
				},
			],
		},
	],
});
