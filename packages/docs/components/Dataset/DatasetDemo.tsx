import {Player} from '@picus/player';
import React from 'react';
import {MyComp} from './MyComp';

export const DatasetDemo: React.FC = () => {
	return (
		<div>
			<Player
				acknowledgePicusLicense
				component={MyComp}
				compositionWidth={1280}
				compositionHeight={720}
				fps={30}
				durationInFrames={60}
				controls
				autoPlay
				loop
				style={{
					width: '100%',
				}}
				inputProps={{
					name: 'Picus',
					logo: 'https://github.com/picus-dev/logo/raw/main/withouttitle/element-0.png',
					repo: 'picus-dev/picus',
				}}
			/>
		</div>
	);
};
