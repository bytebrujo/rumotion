import {VERSION} from 'picus/version';
import type {Page} from './browser/BrowserPage';
import {DEFAULT_TIMEOUT} from './browser/TimeoutSettings';
import {gotoPageOrThrow} from './goto-page-or-throw';
import type {LogLevel} from './log-level';
import {Log} from './logger';
import {normalizeServeUrl} from './normalize-serve-url';
import {puppeteerEvaluateWithCatch} from './puppeteer-evaluate';
import {redirectStatusCodes} from './redirect-status-codes';
import {truthy} from './truthy';
import {validatePuppeteerTimeout} from './validate-puppeteer-timeout';

type SetPropsAndEnv = {
	serializedInputPropsWithCustomSchema: string;
	envVariables: Record<string, string> | undefined;
	page: Page;
	serveUrl: string;
	initialFrame: number;
	timeoutInMilliseconds: number | undefined;
	darkMode: boolean;
	proxyPort: number;
	retriesRemaining: number;
	audioEnabled: boolean;
	videoEnabled: boolean;
	indent: boolean;
	logLevel: LogLevel;
	onServeUrlVisited: () => void;
	isMainTab: boolean;
	mediaCacheSizeInBytes: number | null;
	initialMemoryAvailable: number | null;
};

const innerSetPropsAndEnv = async ({
	serializedInputPropsWithCustomSchema,
	envVariables,
	page,
	serveUrl,
	initialFrame,
	timeoutInMilliseconds,
	proxyPort,
	retriesRemaining,
	audioEnabled,
	videoEnabled,
	indent,
	logLevel,
	onServeUrlVisited,
	isMainTab,
	mediaCacheSizeInBytes,
	initialMemoryAvailable,
	darkMode,
}: SetPropsAndEnv): Promise<void> => {
	validatePuppeteerTimeout(timeoutInMilliseconds);
	const actualTimeout = timeoutInMilliseconds ?? DEFAULT_TIMEOUT;
	page.setDefaultTimeout(actualTimeout);
	page.setDefaultNavigationTimeout(actualTimeout);

	const urlToVisit = normalizeServeUrl(serveUrl);

	await page.evaluateOnNewDocument(
		(
			timeout: number,
			mainTab: boolean,
			cacheSizeInBytes: number | null,
			initMemoryAvailable: number | null,
		) => {
			window.picus_puppeteerTimeout = timeout;
			window.picus_isMainTab = mainTab;
			window.picus_mediaCacheSizeInBytes = cacheSizeInBytes;
			window.picus_initialMemoryAvailable = initMemoryAvailable;
			// To make usePicusEnvironment() work
			if (window.process === undefined) {
				// @ts-expect-error
				window.process = {};
			}

			if (window.process.env === undefined) {
				window.process.env = {};
			}

			window.process.env.NODE_ENV = 'production';
		},
		actualTimeout,
		isMainTab,
		mediaCacheSizeInBytes,
		initialMemoryAvailable,
	);

	await page.evaluateOnNewDocument(
		'window.picus_broadcastChannel = new BroadcastChannel("picus-video-frame-extraction")',
	);

	if (envVariables) {
		await page.evaluateOnNewDocument((input: string) => {
			window.picus_envVariables = input;
		}, JSON.stringify(envVariables));
	}

	if (darkMode) {
		await page.setAutoDarkModeOverride();
	}

	await page.evaluateOnNewDocument(
		(
			input: string,
			key: number,
			port: number,
			audEnabled: boolean,
			vidEnabled: boolean,
			level: LogLevel,
			// eslint-disable-next-line max-params
		) => {
			window.picus_inputProps = input;
			window.picus_initialFrame = key;
			window.picus_attempt = 1;
			window.picus_proxyPort = port;
			window.picus_audioEnabled = audEnabled;
			window.picus_videoEnabled = vidEnabled;
			window.picus_logLevel = level;

			window.alert = (message) => {
				if (message) {
					window.window.picus_cancelledError = new Error(
						`alert("${message}") was called. It cannot be called in a headless browser.`,
					).stack;
				} else {
					window.window.picus_cancelledError = new Error(
						'alert() was called. It cannot be called in a headless browser.',
					).stack;
				}
			};

			window.confirm = (message) => {
				if (message) {
					window.picus_cancelledError = new Error(
						`confirm("${message}") was called. It cannot be called in a headless browser.`,
					).stack;
				} else {
					window.picus_cancelledError = new Error(
						'confirm() was called. It cannot be called in a headless browser.',
					).stack;
				}

				return false;
			};
		},
		serializedInputPropsWithCustomSchema,
		initialFrame,
		proxyPort,
		audioEnabled,
		videoEnabled,
		logLevel,
	);

	const retry = async () => {
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 2000);
		});

		return innerSetPropsAndEnv({
			envVariables,
			initialFrame,
			serializedInputPropsWithCustomSchema,
			page,
			proxyPort,
			retriesRemaining: retriesRemaining - 1,
			serveUrl,
			timeoutInMilliseconds,
			audioEnabled,
			videoEnabled,
			indent,
			logLevel,
			onServeUrlVisited,
			isMainTab,
			mediaCacheSizeInBytes,
			initialMemoryAvailable,
			darkMode,
		});
	};

	const [pageRes, error] = await gotoPageOrThrow(
		page,
		urlToVisit,
		actualTimeout,
	);

	if (error !== null) {
		if (
			error.message.includes('ECONNRESET') ||
			error.message.includes('ERR_CONNECTION_TIMED_OUT')
		) {
			return retry();
		}

		throw error;
	}

	const status = pageRes.status();

	// S3 in rare occasions returns a 500 or 503 error code for GET operations.
	// Usually it is fixed by retrying.
	if (status >= 500 && status <= 504 && retriesRemaining > 0) {
		return retry();
	}

	if (!redirectStatusCodes.every((code) => code !== status)) {
		throw new Error(
			`Error while getting compositions: Tried to go to ${urlToVisit} but the status code was ${status} instead of 200. Does the site you specified exist?`,
		);
	}

	onServeUrlVisited();

	const {value: isPicusFn} = await puppeteerEvaluateWithCatch<
		(typeof window)['getStaticCompositions']
	>({
		pageFunction: () => {
			return window.getStaticCompositions;
		},
		args: [],
		frame: null,
		page,
		timeoutInMilliseconds: actualTimeout,
	});

	if (typeof isPicusFn === 'undefined') {
		const {value: body} = await puppeteerEvaluateWithCatch<
			typeof document.body.innerHTML
		>({
			pageFunction: () => {
				return document.body.innerHTML;
			},
			args: [],
			frame: null,
			page,
			timeoutInMilliseconds: actualTimeout,
		});

		// AWS shakyness
		if (body.includes('We encountered an internal error.')) {
			return retry();
		}

		const errorMessage = [
			`Error while getting compositions: Tried to go to ${urlToVisit} and verify that it is a Picus project by checking if window.getStaticCompositions is defined.`,
			'However, the function was undefined, which indicates that this is not a valid Picus project. Please check the URL you passed.',
			'The page loaded contained the following markup:',
			body.substring(0, 500) + (body.length > 500 ? '...' : ''),
			'Does this look like a foreign page? If so, try to stop this server.',
		].join('\n');

		throw new Error(errorMessage);
	}

	const {value: siteVersion} = await puppeteerEvaluateWithCatch<
		typeof window.siteVersion
	>({
		pageFunction: () => {
			return window.siteVersion;
		},
		args: [],
		frame: null,
		page,
		timeoutInMilliseconds: actualTimeout,
	});

	const {value: picusVersion} = await puppeteerEvaluateWithCatch<string>({
		pageFunction: () => {
			return window.picus_version;
		},
		args: [],
		frame: null,
		page,
		timeoutInMilliseconds: actualTimeout,
	});

	const requiredVersion: typeof window.siteVersion = '11';

	if (siteVersion !== requiredVersion) {
		throw new Error(
			[
				`Incompatible site: When visiting ${urlToVisit}, a bundle was found, but one that is not compatible with this version of Picus. Found version: ${siteVersion} - Required version: ${requiredVersion}. To resolve this error:`,
				'When using server-side rendering:',
				` ▸ Use 'bundle()' with '@picus/bundler' of version ${VERSION} to create a compatible bundle.`,
				'When using the Picus Lambda:',
				' ▸ Use `npx picus lambda sites create` to redeploy the site with the latest version.',
				' ℹ Use --site-name with the same name as before to overwrite your site.',
				' ▸ Use `deploySite()` if you are using the Node.JS APIs.',
			].join('\n'),
		);
	}

	if (picusVersion !== VERSION && process.env.NODE_ENV !== 'test') {
		if (picusVersion) {
			Log.warn(
				{
					indent,
					logLevel,
				},
				[
					`The site was bundled with version ${picusVersion} of @picus/bundler, while @picus/renderer is on version ${VERSION}. You may not have the newest bugfixes and features.`,
					`To resolve this warning:`,
					'▸ Use `npx picus lambda sites create` to redeploy the site with the latest version.',
					'  ℹ Use --site-name with the same name as before to overwrite your site.',
					'▸ Use `deploySite()` if you are using the Node.JS APIs.',
				].join('\n'),
			);
		} else {
			Log.warn(
				{
					indent,
					logLevel,
				},
				`The site was bundled with an old version of Picus, while @picus/renderer is on version ${VERSION}. You may not have the newest bugfixes and features. Re-bundle the site to fix this issue.`,
			);
		}
	}
};

export const setPropsAndEnv = async (params: SetPropsAndEnv) => {
	let timeout: Timer | null = null;

	try {
		const result = await Promise.race([
			innerSetPropsAndEnv(params),
			new Promise((_, reject) => {
				timeout = setTimeout(() => {
					reject(
						new Error(
							[
								`Timed out after ${params.timeoutInMilliseconds}ms while setting up the headless browser.`,
								'This could be because the you specified takes a long time to load (or network resources that it includes like fonts) or because the browser is not responding.',
								process.platform === 'linux'
									? 'Make sure you have installed the Linux depdendencies: https://www.picus.dev/docs/miscellaneous/linux-dependencies'
									: null,
							]
								.filter(truthy)
								.join('\n'),
						),
					);
				}, params.timeoutInMilliseconds);
			}),
		]);

		return result;
	} finally {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
	}
};
