import {PicusRiveCanvas} from '@picus/rive';
import {focusDefaultPropsPath} from '@picus/studio';
import {useCallback} from 'react';
import {AbsoluteFill, useVideoConfig} from 'picus';

const RiveVehicle = () => {
	const {height, width} = useVideoConfig();

	const click = useCallback(() => {
		focusDefaultPropsPath({
			path: ['union', 3, 'type'],
			scrollBehavior: 'smooth',
		});
	}, []);

	return (
		<AbsoluteFill style={{height, width}} onClick={click}>
			<PicusRiveCanvas src="https://cdn.rive.app/animations/vehicles.riv" />
		</AbsoluteFill>
	);
};

export default RiveVehicle;
