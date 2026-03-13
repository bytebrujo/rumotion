import Head from '@docusaurus/Head';
import {DesignPage} from '@picus/promo-pages/dist/design.js';
import Layout from '@theme/Layout';
import React from 'react';

export default () => {
	return (
		<Layout>
			<Head>
				<title>Picus | Design</title>
				<meta
					name="description"
					content="Example usage for @picus/design components."
				/>
			</Head>
			<DesignPage />
		</Layout>
	);
};
