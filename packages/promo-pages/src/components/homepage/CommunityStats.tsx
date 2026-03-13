import React from 'react';
import {
	Contributors,
	DiscordMembers,
	GitHubStars,
	InstallsPerMonth,
	PagesOfDocs,
	TemplatesAndExamples,
} from './CommunityStatsItems';
import {SectionTitle} from './VideoAppsTitle';

const SectionLink: React.FC<{
	readonly href: string;
	readonly children: React.ReactNode;
}> = ({href, children}) => (
	<a
		target="_blank"
		href={href}
		className={'no-underline text-inherit contents'}
	>
		{children}
	</a>
);

const CommunityStats: React.FC = () => (
	<div className={'m-auto max-w-[700px] text-center'}>
		<SectionTitle>Never build alone</SectionTitle>
		<div className={'fontbrand text-center mb-10 -mt-4'}>
			Join a thriving community of developers.
		</div>
		<div className={'flex flex-wrap justify-between gap-4 w-full items-center'}>
			<SectionLink href="https://www.npmjs.com/package/picus">
				<InstallsPerMonth />
			</SectionLink>
			<SectionLink href="https://www.picus.dev/docs/">
				<PagesOfDocs />
			</SectionLink>
			<SectionLink href="https://www.picus.dev/templates">
				<TemplatesAndExamples />
			</SectionLink>
			<SectionLink href="https://github.com/picus-dev/picus">
				<GitHubStars />
			</SectionLink>
			<SectionLink href="https://picus.dev/discord">
				<DiscordMembers />
			</SectionLink>
			<SectionLink href="https://github.com/picus-dev/picus/graphs/contributors">
				<Contributors />
			</SectionLink>
		</div>
	</div>
);

export default CommunityStats;
