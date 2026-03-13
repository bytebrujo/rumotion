import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Templates} from '@picus/promo-pages/dist/templates.js';
import Layout from '@theme/Layout';
import React from 'react';
import {Seo} from '../../components/Seo';

export default () => {
	const imgSrc = `/generated/template-all.png`;
	const context = useDocusaurusContext();

	return (
		<div style={{width: '100%', backgroundColor: 'var(--background)'}}>
			<Layout>
				<Head>
					{Seo.renderTitle(`Starter Templates | Picus`)}
					{Seo.renderDescription(
						'Jumpstart your Picus project with a template.',
					)}
					{Seo.renderImage(imgSrc, context.siteConfig.url)}
				</Head>
				<Templates />
			</Layout>
		</div>
	);
};
