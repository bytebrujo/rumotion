import {expect, test} from 'bun:test';
import {
	PICUS_HOSTED_LAYER_ARN,
	hostedLayers,
} from '../../shared/hosted-layers';

test('All hosted layers should match ARN', () => {
	Object.values(hostedLayers).forEach((h) => {
		h.forEach(({layerArn}) => {
			expect(layerArn).toMatch(
				new RegExp(PICUS_HOSTED_LAYER_ARN.replace(/\*/g, '(.*)')),
			);
		});
	});
});
