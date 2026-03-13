export const getPicusVersionFromIndexHtml = (
	indexHtmlContent: string,
): string | null => {
	const match = indexHtmlContent.match(
		/window\.picus_version\s*=\s*'([^']+)'/,
	);
	return match ? match[1] : null;
};
