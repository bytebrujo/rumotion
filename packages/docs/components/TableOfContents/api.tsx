import React from 'react';
import {TableOfContents as AnimatedEmojiTableOfContents} from '../../docs/animated-emoji/TableOfContents';
import {TableOfContents as AnimationUtilsTableOfContents} from '../../docs/animation-utils/table-of-contents';
import {TableOfContents as BundlerTableOfContents} from '../../docs/bundler/table-of-contents';
import {TableOfContents as CaptionsTableOfContents} from '../../docs/captions/TableOfContents';
import {TableOfContents as CloudrunTableOfContents} from '../../docs/cloudrun/table-of-contents';
import {TableOfContents as EnableScssTableOfContents} from '../../docs/enable-scss/TableOfContents';
import {TableOfContents as FontsTableOfContents} from '../../docs/fonts-api/TableOfContents';
import {TableOfContents as GifTableOfContents} from '../../docs/gif/table-of-contents';
import {TableOfContents as GoogleFontsTableOfContents} from '../../docs/google-fonts/TableOfContents';
import {TableOfContents as InstallWhisperCppTableOfContents} from '../../docs/install-whisper-cpp/install-whisper-cpp';
import {TableOfContents as LambdaTableOfContents} from '../../docs/lambda/table-of-contents';
import {TableOfContents as LayoutUtilsTableOfContents} from '../../docs/layout-utils/table-of-contents';
import {TableOfContents as LicensingTableOfContents} from '../../docs/licensing/TableOfContents';
import {TableOfContents as LightLeaksTableOfContents} from '../../docs/light-leaks/table-of-contents';
import {TableOfContents as LottieTableOfContents} from '../../docs/lottie/table-of-contents';
import {TableOfContents as MediaParserTableOfContents} from '../../docs/media-parser/TableOfContents';
import {TableOfContents as MediaUtilsTableOfContents} from '../../docs/media-utils/table-of-contents';
import {TableOfContents as NewVideoTableOfContents} from '../../docs/media/table-of-contents';
import {TableOfContents as MotionBlurTableOfContents} from '../../docs/motion-blur/table-of-contents';
import {TableOfContents as NoiseTableOfContents} from '../../docs/noise/table-of-contents';
import {TableOfContents as OpenAiWhisperTableOfContents} from '../../docs/openai-whisper/TableOfContents';
import {TableOfContents as PathsTableOfContents} from '../../docs/paths/table-of-contents';
import {PlayerTableOfContents} from '../../docs/player/TableOfContents';
import {TableOfContents as PreloadTableOfContents} from '../../docs/preload/table-of-contents';
import {TableOfContents as PicusTableOfContents} from '../../docs/picus/table-of-contents';
import {TableOfContents as RendererTableOfContents} from '../../docs/renderer/TableOfContents';
import {TableOfContents as RiveTableOfContents} from '../../docs/rive/table-of-contents';
import {TableOfContents as SfxTableOfContents} from '../../docs/sfx/table-of-contents';
import {TableOfContents as ShapesTableOfContents} from '../../docs/shapes/table-of-contents';
import {TableOfContents as SkiaTableOfContents} from '../../docs/skia/TableOfContents';
import {TableOfContents as StarburstTableOfContents} from '../../docs/starburst/table-of-contents';
import {TableOfContents as StudioTableOfContents} from '../../docs/studio/TableOfContents';
import {TableOfContents as TailwindV4TableOfContents} from '../../docs/tailwind-v4/TableOfContents';
import {TableOfContents as TailwindTableOfContents} from '../../docs/tailwind/TableOfContents';
import {TableOfContents as ThreeTableOfContents} from '../../docs/three/TableOfContents';
import {TableOfContents as TransitionsTableOfContents} from '../../docs/transitions/table-of-contents';
import {TableOfContents as VercelTableOfContents} from '../../docs/vercel/table-of-contents';
import {TableOfContents as WebcodecsTableOfContents} from '../../docs/webcodecs/TableOfContents';
import {ZodTypesTableOfContents} from '../../docs/zod-types/TableOfContents';
import {Grid} from './Grid';
import {TOCItem} from './TOCItem';

export const TableOfContents: React.FC = () => {
	return (
		<div>
			<Grid>
				<TOCItem link="/docs/cli">
					<strong>Command line</strong>
					<div>
						Reference for the <code>npx picus</code> commands
					</div>
				</TOCItem>
				<TOCItem link="/docs/config">
					<strong>Configuration file</strong>
					<div>
						Reference for the <code>picus.config.ts</code> file
					</div>
				</TOCItem>
			</Grid>
			<h2>picus</h2>
			<p>
				Core APIs: <code>useCurrentFrame()</code>, <code>interpolate()</code>,
				etc.
			</p>
			<PicusTableOfContents />
			<h2>@picus/media</h2>
			<p>
				An experimental <code>&lt;NewVideo /&gt;</code> tag for embedding
				videos.
			</p>
			<NewVideoTableOfContents />
			<h2>@picus/bundler</h2>
			<p>Create a Webpack bundle from Node.JS </p>
			<BundlerTableOfContents />
			<h2>@picus/player</h2>
			<p>Play a Picus video in the browser.</p>
			<PlayerTableOfContents />
			<h2>@picus/lambda</h2>
			<p>Render videos and stills on AWS Lambda</p>
			<LambdaTableOfContents />
			<h2>@picus/cloudrun</h2>
			<p>Render videos and stills on GCP Cloud Run</p>
			<CloudrunTableOfContents />
			<h2>@picus/captions</h2>
			<p>Common operations for subtitles.</p>
			<CaptionsTableOfContents />
			<h2>@picus/gif</h2>
			<p>Include a GIF in your video.</p>
			<GifTableOfContents />
			<h2>@picus/media-utils</h2>
			<p>Obtain info about video and audio.</p>
			<MediaUtilsTableOfContents />
			<h2>@picus/animation-utils</h2>
			<p>Obtain info about video and audio.</p>
			<AnimationUtilsTableOfContents />
			<h2>@picus/tailwind</h2>
			<p>Webpack override for using TailwindCSS v3</p>
			<TailwindTableOfContents />
			<h2>@picus/tailwind-v4</h2>
			<p>Webpack override for using TailwindCSS v4</p>
			<TailwindV4TableOfContents />
			<h2>@picus/enable-scss</h2>
			<p>Webpack override for enabling SASS/SCSS</p>
			<EnableScssTableOfContents />
			<h2>@picus/three</h2>
			<p>Create 3D videos using React Three Fiber</p>
			<ThreeTableOfContents />
			<h2>@picus/skia</h2>
			<p>Low-level graphics using React Native Skia</p>
			<SkiaTableOfContents />
			<h2>@picus/lottie</h2>
			<p>Include a Lottie animation in your video</p>
			<LottieTableOfContents apisOnly />
			<h2>@picus/preload</h2>
			<p>Preload media for the Player</p>
			<PreloadTableOfContents />
			<h2>@picus/renderer</h2>
			<p>Render video, audio and stills from Node.JS or Bun</p>
			<RendererTableOfContents />
			<h2>@picus/paths</h2>
			<p>Manipulate and obtain info about SVG paths</p>
			<PathsTableOfContents />
			<h2>@picus/noise</h2>
			<p>Generate noise effects</p>
			<NoiseTableOfContents />
			<h2>@picus/shapes</h2>
			<p>Generate SVG shapes</p>
			<ShapesTableOfContents />
			<h2>@picus/studio</h2>
			<p>APIs for controlling thePicus Studio</p>
			<StudioTableOfContents />
			<h2>@picus/transitions</h2>
			<p>Transition between scenes</p>
			<TransitionsTableOfContents apisOnly />
			<h2>@picus/layout-utils</h2>
			<p>Layout helpers</p>
			<LayoutUtilsTableOfContents />
			<h2>@picus/install-whisper-cpp</h2>
			<p>Whisper.cpp installation and transcription</p>
			<InstallWhisperCppTableOfContents />
			<h2>@picus/openai-whisper</h2>
			<p>Work with transcriptions from OpenAI Whisper</p>
			<OpenAiWhisperTableOfContents />
			<h2>@picus/animated-emoji</h2>
			<p>Google Fonts Animated Emojis as Picus Components</p>
			<AnimatedEmojiTableOfContents />
			<h2>@picus/google-fonts</h2>
			<p>Load Google Fonts onto a page.</p>
			<GoogleFontsTableOfContents />
			<h2>@picus/rive</h2>
			<p>Embed Rive animations in Picus</p>
			<RiveTableOfContents />
			<h2>@picus/zod-types</h2>
			<p>Zod types enabling Picus Studio UI</p>
			<ZodTypesTableOfContents />
			<h2>@picus/sfx</h2>
			<p>Sound effects library</p>
			<SfxTableOfContents />
			<h2>@picus/light-leaks</h2>
			<p>Light Leak effects</p>
			<LightLeaksTableOfContents />
			<h2>@picus/starburst</h2>
			<p>Starburst Effect</p>
			<StarburstTableOfContents />
			<h2>@picus/vercel</h2>
			<p>Render videos on Vercel Sandbox</p>
			<VercelTableOfContents />
			<h2>@picus/motion-blur</h2>
			<p>Apply motion blur effects to components</p>
			<MotionBlurTableOfContents />
			<h2>@picus/fonts</h2>
			<p>Load font files onto a page.</p>
			<FontsTableOfContents />
			<h2>@picus/media-parser</h2>
			<p>A pure JavaScript library for parsing video files</p>
			<MediaParserTableOfContents />
			<h2>@picus/webcodecs</h2>
			<p>Converting media using WebCodecs</p>
			<WebcodecsTableOfContents />
			<h2>@picus/licensing</h2>
			<p>Report and query company license usage</p>
			<LicensingTableOfContents />
		</div>
	);
};
