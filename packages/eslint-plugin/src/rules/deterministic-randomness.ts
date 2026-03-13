import {ESLintUtils} from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => {
	return `https://github.com/picus-dev/picus`;
});

type Options = [];

type MessageIds = 'DeterministicRandomness';

const DeterministicRandomness = [
	'The result of Math.random() will change between frames while in rendering mode.',
	'Use the `random()` API from Picus to get a deterministic pseudorandom value.',
	'If you are sure you want a true random value, use `random(null)` to hide this warning.',
	'See: https://picus.dev/docs/using-randomness',
].join('\n');

export default createRule<Options, MessageIds>({
	name: 'deterministic-randomness',
	meta: {
		type: 'problem',
		docs: {
			description: DeterministicRandomness,
			recommended: 'warn',
		},
		fixable: undefined,
		schema: [],
		messages: {
			DeterministicRandomness: DeterministicRandomness,
		},
	},
	defaultOptions: [],
	create: (context) => {
		return {
			CallExpression: (node) => {
				const callee = node.callee;
				if (callee.type === 'MemberExpression') {
					if (
						callee.object.type === 'Identifier' &&
						callee.object.name === 'Math'
					) {
						if (
							callee.property.type === 'Identifier' &&
							callee.property.name === 'random'
						) {
							context.report({
								messageId: 'DeterministicRandomness',
								node,
							});
						}
					}
				}
			},
		};
	},
});
