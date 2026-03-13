import {GlobalRegistrator} from '@happy-dom/global-registrator';

GlobalRegistrator.register();
window.origin = 'http://localhost:3000';
// @ts-expect-error
window.picus_staticBase = '/static-abcdef';
