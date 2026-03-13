import Head from '@docusaurus/Head';
import {TeamPage} from '@picus/promo-pages/dist/team.js';
import Layout from '@theme/Layout';
import React from 'react';

export default () => {
	return (
		<Layout>
			<Head>
				<title>Picus | About</title>
				<meta name="description" content="Picus's story." />
			</Head>
			<TeamPage />
		</Layout>
	);
};
