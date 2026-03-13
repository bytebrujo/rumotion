import fs from 'fs';
import path from 'path';

const PICUS_PRO_ORIGIN = 'https://www.picus.pro';

type PromptResponse = {
	items: unknown[];
	totalPages: number;
};

const fetchAllPromptSubmissions = async () => {
	const allPromptSubmissions: unknown[] = [];
	let page = 1;
	let totalPages = 1;

	do {
		const url = `${PICUS_PRO_ORIGIN}/api/prompts?page=${page}`;
		const res = await fetch(url);
		const data: PromptResponse = await res.json();

		allPromptSubmissions.push(...data.items);
		totalPages = data.totalPages;
		page++;
	} while (page <= totalPages);

	return allPromptSubmissions;
};

fetchAllPromptSubmissions().then((promptSubmissions) => {
	fs.writeFileSync(
		path.join(process.cwd(), 'static', '_raw', 'prompt-submissions.json'),
		JSON.stringify(promptSubmissions, null, '\t'),
	);

	console.log(`Fetched ${promptSubmissions.length} prompt submissions`);
});
