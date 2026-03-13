import {expect, test} from 'bun:test';
import {execSync} from 'child_process';

test('Should be able to "import" frontend in node', async () => {
	execSync(
		`node --input-type=module -e "import {TransitionSeries} from '@picus/transitions'; console.log(TransitionSeries)"`,
	);
	execSync(
		`node --input-type=module -e "import {Player} from '@picus/player'; console.log(Player)"`,
	);
	execSync(
		`node --input-type=module -e "import {preloadAudio} from '@picus/preload'; console.log(preloadAudio)"`,
	);
	execSync(
		`node --input-type=module -e "import {Rect} from '@picus/shapes'; console.log(Rect)"`,
	);
	execSync(
		`node --input-type=module -e "import {zColor} from '@picus/zod-types'; console.log(zColor)"`,
	);
	execSync(
		`node --input-type=module -e "import {noise2D} from '@picus/noise'; console.log(noise2D)"`,
	);
	execSync(
		`node --input-type=module -e "import {CameraMotionBlur} from '@picus/motion-blur'; console.log(CameraMotionBlur)"`,
	);
	execSync(
		`node --input-type=module -e "import {getVideoMetadata} from '@picus/media-utils'; console.log(getVideoMetadata)"`,
	);

	execSync(
		`node --input-type=module -e "import {measureText} from '@picus/layout-utils'; console.log(measureText)"`,
	);
	execSync(
		`node --input-type=module -e "import {getRenderProgress} from '@picus/lambda/client'; console.log(getRenderProgress)"`,
	);
	execSync(
		`node --input-type=module -e "import {getRenderProgress} from '@picus/lambda'; console.log(getRenderProgress)"`,
	);
	execSync(
		`node --input-type=module -e "import {loadFont} from '@picus/google-fonts/Montserrat'; console.log(loadFont)"`,
	);

	expect(() =>
		execSync(
			`node --input-type=module -e "import {Misspell} from '@picus/shapes'; console.log(Rect)"`,
			{
				stdio: 'ignore',
			},
		),
	).toThrow();
});
