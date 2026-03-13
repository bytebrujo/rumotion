import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {ExpertsPageContent} from '@picus/promo-pages/dist/experts.js';
import Layout from '@theme/Layout';
import React from 'react';
import {Seo} from '../../components/Seo';

const Experts: React.FC = () => {
	const context = useDocusaurusContext();

	return (
		<Layout>
			<Head>
				{Seo.renderTitle('Picus Experts | Hire Picus freelancers')}
				{Seo.renderDescription(
					'Find Picus freelancers and hire them to create, progress or unblock your Picus project.',
				)}
				{Seo.renderImage(
					'/img/picus-experts-og-image.png',
					context.siteConfig.url,
				)}
			</Head>
			<ExpertsPageContent Link={Link} />
		</Layout>
	);
};

export default Experts;
