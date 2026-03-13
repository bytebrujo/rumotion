import {VERSION} from 'picus/version';

export const serviceVersionString = () => {
	return VERSION.replace(/\./g, '-').replace(/\+/g, '-');
};
