import path from 'node:path';

export const getAbsolutePublicDir = ({
	relativePublicDir,
	picusRoot,
}: {
	relativePublicDir: string | null;
	picusRoot: string;
}) => {
	return relativePublicDir
		? path.resolve(picusRoot, relativePublicDir)
		: path.join(picusRoot, 'public');
};
