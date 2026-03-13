import {useColorMode} from '@docusaurus/theme-common';
import '@picus/promo-pages/dist/Homepage.css';
import {NewLanding} from '@picus/promo-pages/dist/Homepage.js';
import '@picus/promo-pages/dist/tailwind.css';
import Layout from '@theme/Layout';
import React from 'react';

if (
	typeof window !== 'undefined' &&
	window.location?.origin?.includes('convert.picus.dev')
) {
	window.location.href = 'https://picus.dev/convert';
}

const Inner: React.FC = () => {
	const {colorMode, setColorMode} = useColorMode();

	return <NewLanding colorMode={colorMode} setColorMode={setColorMode} />;
};

const Homepage: React.FC = () => {
	return (
		<Layout>
			<Inner />
		</Layout>
	);
};

export default Homepage;
