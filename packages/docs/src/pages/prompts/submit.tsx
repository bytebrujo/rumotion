import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {PromptsSubmitPage} from '@picus/promo-pages/dist/prompts/PromptsSubmit.js';
import Layout from '@theme/Layout';
import React from 'react';
import {Seo} from '../../components/Seo';

export default () => {
	const context = useDocusaurusContext();

	return (
		<Layout>
			<Head>
				{Seo.renderTitle('Submit a Prompt | Picus')}
				{Seo.renderDescription(
					'Submit your AI-generated video prompt to the Picus gallery.',
				)}
				{Seo.renderImage(
					'/generated/articles-prompts-submit.png',
					context.siteConfig.url,
				)}
			</Head>
			<PromptsSubmitPage />
		</Layout>
	);
};
