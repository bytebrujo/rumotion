import {expect, test} from 'bun:test';
import {PICUS_PRO_ORIGIN, TEST_FAST} from '~/lib/config';

test('Should not have convert fast enabled', () => {
	expect(TEST_FAST).toBe(false);
});

test('Should point to production picus.pro', () => {
	expect(PICUS_PRO_ORIGIN).toBe('https://www.picus.pro');
});
