import {
	AbsoluteFill,
	Img,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'picus';
import {z} from 'zod';

export const logoCollabSchema = z.object({
	partnerLogoUrl: z.string(),
	theme: z.enum(['light', 'dark']),
	partnerLogoScale: z.number().min(0.1).max(3).default(1),
	picusLogoScale: z.number().min(0.1).max(3).default(1),
	partnerLogoX: z.number().min(-500).max(500).default(0),
	picusLogoX: z.number().min(-500).max(500).default(0),
});

type LogoCollabProps = z.infer<typeof logoCollabSchema>;

const COLORS = {
	brand: '#0B84F3',
	light: {bg: '#FFFFFF', text: '#000000'},
	dark: {bg: '#2E2E2E', text: '#FFFFFF'},
};

const PICUS_LOGO = {
	light: staticFile('logo/picus/withtitle.png'),
	dark: staticFile('logo/picus/withtitle-dark.png'),
};

export const LogoCollab: React.FC<LogoCollabProps> = ({
	partnerLogoUrl,
	theme,
	partnerLogoScale,
	picusLogoScale,
	partnerLogoX,
	picusLogoX,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const themeColors = COLORS[theme];

	const partnerDelay = 0;
	const plusDelay = 15;
	const picusDelay = 25;

	const partnerProgress = spring({
		frame: frame - partnerDelay,
		fps,
		config: {damping: 200},
	});

	const plusProgress = spring({
		frame: frame - plusDelay,
		fps,
		config: {damping: 200},
	});

	const picusProgress = spring({
		frame: frame - picusDelay,
		fps,
		config: {damping: 200},
	});

	const logoHeight = 80;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: themeColors.bg,
				fontFamily: 'GTPlanar, sans-serif',
				fontFeatureSettings: "'ss03' 1",
			}}
		>
			<span
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontSize: 48,
					fontWeight: 500,
					color: COLORS.brand,
					opacity: plusProgress,
					lineHeight: 1,
				}}
			>
				+
			</span>

			<Img
				src={partnerLogoUrl}
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(calc(-100% - 50px + ${partnerLogoX}px), -50%) scale(${(0.9 + partnerProgress * 0.1) * partnerLogoScale})`,
					transformOrigin: 'right center',
					opacity: partnerProgress,
					height: logoHeight,
					objectFit: 'contain',
				}}
			/>

			<Img
				src={PICUS_LOGO[theme]}
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(calc(50px + ${picusLogoX}px), -50%) scale(${(0.9 + picusProgress * 0.1) * picusLogoScale})`,
					transformOrigin: 'left center',
					opacity: picusProgress,
					height: logoHeight,
					objectFit: 'contain',
				}}
			/>
		</AbsoluteFill>
	);
};
